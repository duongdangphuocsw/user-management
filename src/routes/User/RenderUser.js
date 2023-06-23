import { useDispatch, useSelector } from "react-redux";
import {
  IoMdPersonAdd,
  IoMdSearch,
  IoIosCloseCircle,
  IoMdCreate,
  IoIosTrash,
} from "react-icons/io";
import { useEffect, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { GrStatusDisabled, GrUserExpert } from "react-icons/gr";
import { toast } from "react-toastify";
import { updateUser, updateActiveUser, deleteUser } from "../../services/userApi";

const RenderUser = (props) => {
  const dispatch = useDispatch();
  const currentUsers = useSelector((state) => state.user.currentUsers);
  const currentPage = useSelector((state) => state.user.currentPage);
  const [editUser, setEditUser] = useState({});
  const [editting, setEditting] = useState({
    name: "",
    email: "",
    group: "",
    status: "",
  });
  // handle edit user
  const handleEditUser = (user) => {
    const isEditEmpty = Object.keys(editUser).length === 0;
    if (!isEditEmpty) {
      toast.error("You are editting another user.");
    } else {
      setEditUser(user);
      setEditting({
        name: user.name,
        email: user.email,
        group: user.group_role,
        status: user.is_active,
      });
      const handleKeyDown = (event) => {
        switch (event.which) {
          case 27:
            setEditUser({});
            break;
          default:
          // code block
        }
      };
      document.addEventListener("keydown", (event) => handleKeyDown(event));
      setTimeout(() => handleEdit_Group_Status(user), 100);
    }
  };
  // HANDLE UPDATE USER
  const handleUpdateUser = async (id) => {
    const resultConfirmUpdate = window.confirm(
      "Do you want to update this user?"
    );
    if (resultConfirmUpdate) {
      try {
        const response = await updateUser(editting, id);
        
        setEditUser({});
        // dispatch action
        dispatch({
          type: "UPDATE_USER",
          payload: response.data,
        });
        // notify
        toast.success("Updated successful!");
      } catch (error) {
        toast.error("Failed to update!");
      }
    }
    
  };
  // HANDLE CHANGE ACTIVE
  const handleUpdateActive = async (user) => {
    const isEditEmpty = Object.keys(editUser).length === 0;
    if (!isEditEmpty) {
      toast.error("You are editting.");
    } else {
      const confirmRequest = window.confirm(
        `Do you want to change active ${user.name}`
      );
      const handleKeyDown = (event) => {
        switch (event.which) {
          case 27:
            setEditUser({});
            break;
          default:
          // code block
        }
      };
      document.addEventListener("keydown", (event) => handleKeyDown(event));
      if (confirmRequest) {
        try {
          const response = await updateActiveUser(user);
          dispatch({
            type: "UPDATE_ACTIVE",
            payload: response.data,
          });
          toast.success("Changed status succesfully!");
        } catch (error) {
          toast.error("Can't change status of user");
        }
      }
    }
  };
  // HANDLE DELETE USER
  const handleDeleteUser = async (id) => {
    const checkConfirmDelete = window.confirm(
      "Do you want to delete this user?"
    );
    if (checkConfirmDelete) {
      try {
        const response = deleteUser(id);
        
        dispatch({
          type: "DELETE",
          payload: id,
        });
        toast.success("Delete successful");
      } catch (error) {
        
        toast.error("Delete error");
      }
    }
  };
  const handleEdit_Group_Status = (user) => {
    const groupEditSelect_element = document.getElementById(
      `edit-group-select-${user.id}`
    );
    const listOptionGroupEdit =
      groupEditSelect_element.getElementsByTagName("option");
    for (let i = 0; i < listOptionGroupEdit.length; i++) {
      if (listOptionGroupEdit[i].value === user.group_role) {
        listOptionGroupEdit[i].selected = true;
      }
    }
    const statusEditSelect_element = document.getElementById(
      `edit-status-select-${user.id}`
    );
    const listOptionsStatus =
      statusEditSelect_element.getElementsByTagName("option");
    for (let i = 0; i < listOptionsStatus.length; i++) {
      if (listOptionsStatus[i].value === user.is_active.toString()) {
        listOptionsStatus[i].selected = true;
      }
    }
  };
  // handle change edit name and email
  const handleChangeEditName = (event) => {
    setEditting({ ...editting, name: event.target.value });
  };
  const handleChangeEditEmail = (event) => {
    setEditting({ ...editting, email: event.target.value });
  };
  // handle edit group select user
  const handleEditGroup = (event) => {
    setEditting({ ...editting, group: event.target.value });
  };
  const handleEditStatus = (event) => {
    setEditting({ ...editting, status: event.target.value === "true" });
  };

  let isEditEmpty = Object.keys(editUser).length === 0;
  return (
    <table className="manager_user_table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Group</th>
          <th>Status</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {
        currentUsers &&
        currentUsers.length > 0 &&
        currentUsers.map((user, index) => {
            return (
              <tr key={user.id}>
                <td>{(currentPage - 1) * 5 + index + 1}</td>
                {!isEditEmpty && editUser.id === user.id ? (
                  <>
                    <td>
                      <input
                        value={editting.name}
                        onChange={(event) => handleChangeEditName(event)}
                        className="editting"
                      ></input>
                    </td>
                    <td>
                      <input
                        value={editting.email}
                        onChange={(event) => handleChangeEditEmail(event)}
                        className="editting"
                      ></input>
                    </td>
                    <td>
                      <select
                        name="group"
                        className="editting"
                        id={`edit-group-select-` + user.id}
                        onChange={(event) => handleEditGroup(event)}
                      >
                        <option value="">Please Choose Group</option>
                        <option value="Admin">Admin</option>
                        <option value="Reviewer">Reviewer</option>
                        <option value="Editor">Editor</option>
                      </select>
                    </td>
                    <td>
                      <select
                        name="status"
                        className="editting"
                        id={"edit-status-select-" + user.id}
                        onChange={(event) => handleEditStatus(event)}
                      >
                        <option value="">Please Choose Status</option>
                        <option value="true">Active</option>
                        <option value="false">Not active</option>
                      </select>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.group_role}</td>
                    <td
                      className={
                        user.is_active === true ? "active" : "non_active"
                      }
                    >
                      {user.is_active === true ? "Active" : "Non active"}
                    </td>
                  </>
                )}

                <td className="function-icon-container">
                  {!isEditEmpty && editUser.id === user.id ? (
                    <BsCheckLg
                      className="checkEditIcon functionsIcon"
                      onClick={() => handleUpdateUser(user.id)}
                    />
                  ) : (
                    <IoMdCreate
                      className="editIcon functionsIcon"
                      onClick={() => handleEditUser(user)}
                    />
                  )}

                  <GrUserExpert
                    className="activeIcon functionsIcon"
                    onClick={() => handleUpdateActive(user)}
                  />
                  <IoIosTrash
                    className="deleteIcon functionsIcon"
                    onClick={() => handleDeleteUser(user.id)}
                  />
                </td>
              </tr>
            );
   
          })}
      </tbody>
    </table>
  );
};
export default RenderUser;
