import React from "react";
import "./pagination.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
  IoMdPersonAdd,
  IoMdSearch,
  IoIosCloseCircle,
  IoMdCreate,
  IoIosTrash,
} from "react-icons/io";

import { BsCheckLg } from "react-icons/bs";
import { GrStatusDisabled, GrUserExpert } from "react-icons/gr";
import { toast } from "react-toastify";
class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberUser: this.props.users.length,
      perPage: this.props.perPage,
      totalPage: Math.ceil(this.props.users.length / this.props.perPage),
      currentPage: 1,
      editUser: {},
      editting: {
        name: "",
        email: "",
        group: "",
        status: "",
      },
    };
  }
  pagination = () => {
    let numberUser_props = this.props.users.length;
    if (this.state.numberUser !== numberUser_props) {
      this.setState({
        numberUser: numberUser_props,
        totalPage: Math.ceil(this.props.users.length / this.props.perPage),
      });
    }
  };
  // handle edit user
  handleEditUser = (user) => {
    const isEmpty = Object.keys(this.state.editUser).length === 0;
    if (!isEmpty) {
       toast.error("You are editting another user.")
      }
    else {
      this.setState({
        editUser: user,
        editting: {
          name: user.name,
          email: user.email,
          group: user.group_role,
          status: user.is_active,
        },
      });
      let handleKeyDown = (event) => {
        switch(event.which) {
          case 27:
            this.setState({
              editUser: {},
            });
            break;
          default:
            // code block
        }
      };
      document.addEventListener("keydown", (event) => handleKeyDown(event));
      setTimeout(() => this.handleEditGroup_Status(user), 100);
    }
  };
  // handle edit group and status user
  handleEditGroup_Status = (user) => {
    // edit group select
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
    // edit status select
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
  handleUpdateUser = (user) => {
    let handle = new Promise((resole, reject) => {
      resole();
    });
    handle
      .then(() => {
        const resultConfirmUpdate = window.confirm(
          "Do you want to update this user?"
        );
        return resultConfirmUpdate;
      })
      .then(async (resultConfirmUpdate) => {
        if (resultConfirmUpdate) {
          axios({
            method: "put",
            url: `https://631c255e4fa7d3264ca7c5ca.mockapi.io/api/users/${user.id}`,
            data: {
              name: this.state.editting.name,
              email: this.state.editting.email,
              group_role: this.state.editting.group,
              is_active: this.state.editting.status,
            },
          })
            .then((response) => {
              toast.success("Updated succesfully!");
              this.props.handleEditUser(response.data);
            })
            .catch((error) => {
              console.log(error);
              toast.error("Failed to update!");
            });
          this.setState({
            editUser: {},
          });
        }
      });
  };
  handleChangeEditName = (event) => {
    this.setState((state) => ({
      editting: {
        ...state.editting,
        name: event.target.value,
      },
    }));
  };
  handleChangeEditEmail = (event) => {
    this.setState((state) => ({
      editting: {
        ...state.editting,
        email: event.target.value,
      },
    }));
  };
  // handle edit group select user
  handleEditGroup = (event) => {
    this.setState((state) => ({
      editting: {
        ...state.editting,
        group: event.target.value,
      },
    }));
  };
  handleEditStatus = (event) => {
    this.setState((state) => ({
      editting: {
        ...state.editting,
        status: event.target.value === "true",
      },
    }));
  };
  // handle change active user 
  handleChangeActiveUser = async (user) => {
     axios({
        method: 'put',
        url: `https://631c255e4fa7d3264ca7c5ca.mockapi.io/api/users/${user.id}`,
        data: {
            is_active: !user.is_active
        }
    })
    .then((response)=> {
      this.props.handleChangeActive(response.data);
      toast.success("Changed status succesfully!");
    })
    .catch((error)=> {
      console.log(error)
      toast.error("Can't change status of user")
    })
  }
  // render current user
  renderUser = (props) => {
    let currentUsers = props.currentUsers;
    let { editUser, editting } = this.state;
    let isEmpty = Object.keys(this.state.editUser).length === 0;
    return (
      <>
        {currentUsers &&
          currentUsers.length > 0 &&
          currentUsers.map((user, index) => {
            return (
              <tr key={user.id}>
                <td>{(this.state.currentPage - 1) * 5 + index + 1}</td>
                {!isEmpty && editUser.id === user.id ? (
                  <>
                    <td>
                      <input
                        value={editting.name}
                        onChange={(event) => this.handleChangeEditName(event)}
                      ></input>
                    </td>
                    <td>
                      <input
                        value={editting.email}
                        onChange={(event) => this.handleChangeEditEmail(event)}
                      ></input>
                    </td>
                    <td>
                      <select
                        name="group"
                        // id="edit-group-select"
                        id={`edit-group-select-` + user.id}
                        onChange={(event) => this.handleEditGroup(event)}
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
                        id={"edit-status-select-" + user.id}
                        onChange={(event) => this.handleEditStatus(event)}
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
                  {!isEmpty && editUser.id === user.id ? (
                    <BsCheckLg
                      className="checkEditIcon functionsIcon"
                      onClick={() => this.handleUpdateUser(user)}
                    />
                  ) : (
                    <IoMdCreate
                      className="editIcon functionsIcon"
                      onClick={() => this.handleEditUser(user)}
                    />
                  )}

                  <GrUserExpert className="activeIcon functionsIcon" 
                      onClick={() => this.handleChangeActiveUser(user)}
                  />
                  <IoIosTrash
                    className="deleteIcon functionsIcon"
                    onClick={() => this.props.handleDeleteUser(user.id)}
                  />
                </td>
              </tr>
            );
          })}
      </>
    );
  };
  // render pagination
  renderPagination = (props) => {
    if (props.totalPage) {
      let arrayNumberPage = [];
      for (let i = 1; i <= props.totalPage; i++) {
        arrayNumberPage.push(i);
      }
      return arrayNumberPage.map((item) => {
        return (
          <li
            className={this.state.currentPage === item ? "active" : ""}
            key={item}
            onClick={() => this.clickToActive(item)}
          >
            {item}
          </li>
        );
      });
    }
  };
  getCurrentUsers = () => {
    let from = (this.state.currentPage - 1) * this.state.perPage;
    let to = this.state.currentPage * this.state.perPage;
    let currentUsers = this.props.users.slice(from, to);
    return currentUsers;
  };
  clickToActive = (indexPage) => {
    this.setState({
      currentPage: indexPage,
    });
  };
  // handle next and prev page
  prevPage = () => {
    this.setState({
      currentPage:
        this.state.currentPage === 1 ? 1 : this.state.currentPage - 1,
    });
  };
  nextPage = () => {
    this.setState({
      currentPage:
        this.state.currentPage === this.state.totalPage
          ? this.state.currentPage
          : this.state.currentPage + 1,
    });
  };
  render() {
    this.pagination();
    return (
      <>
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
            <this.renderUser currentUsers={this.getCurrentUsers()} />
          </tbody>
        </table>
        <div className="pagination">
          <ul>
            <li onClick={() => this.prevPage()}>&laquo;</li>
            <this.renderPagination totalPage={this.state.totalPage} />
            <li onClick={() => this.nextPage()}>&raquo;</li>
          </ul>
        </div>
      </>
    );
  }
}
export default Pagination;
