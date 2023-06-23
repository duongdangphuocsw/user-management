import React, { useState } from "react";
import { IoMdPersonAdd, IoMdSearch, IoIosCloseCircle } from "react-icons/io";
import "./handleUser.scss";
import { toast } from "react-toastify";
import { addUser } from "../../services/userApi";
import { useDispatch, useSelector } from "react-redux";

function HandleUser(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [group, setGroup] = useState("");
  const [status, setStatus] = useState("");
  const users = useSelector((state) => state.user.users )
  const dispatch = useDispatch();
  const handleChangeInputName = (event) => {
    setName(event.target.value);
  };

  const handleChangeInputEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeGroupSelect = (event) => {
    setGroup(event.target.value);
  };

  const handleChangeStatusSelect = (event) => {
    setStatus(event.target.value !== "" ? event.target.value === "true" : "");
  };

  const validate = () => {
    if (name === "" || email === "" || group === "" || status === "") {
      return false;
    }
    return true;
  };
  // SEARCH
  const handleSearchUser = () => {
    // const users = props.users;
    const dataFind = { name, email, group, status };
    //handle filter user
    const userFilter = users.filter((item) => {
      return (
        item.name.toLowerCase().includes(dataFind.name.toLowerCase()) &&
        (dataFind.email === "" ? true : dataFind.email === item.email) &&
        (dataFind.group === "" ? true : dataFind.group === item.group_role) &&
        (dataFind.status === "" ? true : dataFind.status === item.is_active)
      );
    });
    props.handleSearchUser(userFilter);
  };
  // ADD USER
  const handleAddUser = async () => {
    if (validate()) {
      const newUser = {
        name: name,
        email: email,
        group: group,
        status: status,
      };
      try {
        const response = await addUser(newUser);
        // handle add user
        dispatch({
          type: "ADD",
          payload: response.data,
        });
        // format input
        setName("");
        setEmail("");
        const listOptionGroupSelect =
          document.getElementById("group-select").options;
        const listOptionStatusSelect =
          document.getElementById("status-select").options;
        listOptionGroupSelect[0].selected = true;
        listOptionStatusSelect[0].selected = true;
        // nofify successful
        toast.success("Add successful");
      } catch (error) {
        console.log('error: ', error);
        toast.error("Can't add user");
      }
    } else {
      toast.error("Please fill all input");
    }
  };
  const handleDeleteFind = () => {
    props.handleDeleteFind();
    // format input
    setName("");
    setEmail("");
    const listOptionGroupSelect =
      document.getElementById("group-select").options;
    const listOptionStatusSelect =
      document.getElementById("status-select").options;
    listOptionGroupSelect[0].selected = true;
    listOptionStatusSelect[0].selected = true;
  };
  return (
    <>
      <div className="controller">
        <form>
          <div className="formGroup">
            <label>Name</label>
            <input
              type={"text"}
              placeholder={"Type name"}
              value={name}
              onChange={(event) => handleChangeInputName(event)}
            />
          </div>
          <div className="formGroup">
            <label>Email</label>
            <input
              type={"text"}
              placeholder={"Type email"}
              value={email}
              onChange={(event) => handleChangeInputEmail(event)}
            />
          </div>
          <div className="formGroup">
            <label>Group</label>
            <select
              name="group"
              id="group-select"
              onChange={(event) => handleChangeGroupSelect(event)}
            >
              <option value="">Please Choose Group</option>
              <option value="Admin">Admin</option>
              <option value="Reviewer">Reviewer</option>
              <option value="Editor">Editor</option>
            </select>
          </div>
          <div className="formGroup">
            <label>Status</label>
            <select
              name="status"
              id="status-select"
              onChange={(event) => handleChangeStatusSelect(event)}
            >
              <option value="">Please Choose Status</option>
              <option value="true">Active</option>
              <option value="false">Not active</option>
            </select>
          </div>
        </form>
        <div className="function">
          <button
            type="button"
            className="btnAdd"
            onClick={() => {
              handleAddUser();
            }}
          >
            <div className="iconBtn">
              <IoMdPersonAdd />
            </div>

            <span className="describe">Add new user</span>
          </button>
          <button
            type="button"
            className="btnFind"
            onClick={() => {
              handleSearchUser();
            }}
          >
            <div className="iconBtn">
              <IoMdSearch className="iconBtn" />
            </div>
            <span className="describe">Find</span>
          </button>
          <button
            type="button"
            className="btnDeleteFind"
            onClick={() => handleDeleteFind()}
          >
            <div className="iconBtn">
              <IoIosCloseCircle />
            </div>
            <span className="describe">Delete find</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default HandleUser;
