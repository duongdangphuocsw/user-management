import React from "react";
import "./user.scss";
import Heading from "../../components/Heading/Heading";
import axios from "axios";
import {
  IoMdPersonAdd,
  IoMdSearch,
  IoIosCloseCircle,
  IoMdCreate,
  IoIosTrash,
} from "react-icons/io";
import { GrStatusDisabled, GrUserExpert } from "react-icons/gr";
import Pagination from "../../components/Pagination/Pagination";
import { toast } from "react-toastify";
import HandleUser from "./HandleUser";
class User extends React.Component {
  constructor() {
    super();
   
    this.state = {
      users: [],
      userFilter: undefined,
    };
  }
  handleDeleteUser = (id) => {
    const checkConfirmDelete = window.confirm(
      "Do you want to delete this user?"
    );
    if (checkConfirmDelete) {
      axios
        .delete(`https://631c255e4fa7d3264ca7c5ca.mockapi.io/api/users/${id}`)
        .then((response) => {
          let newListUsers = this.state.users;
          newListUsers = this.state.users.filter((user) => user.id !== id);
          this.setState({
            users: newListUsers,
          });
          toast.success("Delete successful");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Delete error");
        });
    }
  };
  handleEditUser = (user) => {
    let newListUsers = this.state.users;
    newListUsers = newListUsers.map((item) => {
      if (item.id === user.id) {
        return user;
      }
      return item;
    });
    this.setState({
      users: [...newListUsers],
    });
  };
  AddUser = (newUser) => {
    this.setState({
      users: [...this.state.users, newUser],
    });
  };
  async componentDidMount() {
    axios
      .get("https://631c255e4fa7d3264ca7c5ca.mockapi.io/api/users")
      .then((response) => {
        this.setState({
          users: response && response.data ? response.data : [],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleSearchUser = (dataFilter) => {
    this.setState({
      userFilter: dataFilter ? dataFilter : undefined,
    });
  };
  handleDeleteFind = () => {
    this.setState({
      userFilter: undefined,
    });
  };
  handleChangeActive = (user) => {
    const newListUsers = this.state.users;
    const indexUserChane = newListUsers.findIndex(item => item.id === user.id)
    newListUsers[indexUserChane].is_active = !newListUsers[indexUserChane].is_active;
    this.setState({
      users: [...newListUsers]
    })
  }
  render() {
    return (
      <>
        <Heading router_name={"User"} />
        <HandleUser
          AddUser={this.AddUser}
          users={this.state.users}
          SearchUser={this.handleSearchUser}
          handleDeleteFind={this.handleDeleteFind}
        />
        <Pagination
          users={
            this.state.userFilter !== undefined
              ? this.state.userFilter
              : this.state.users
          }
          perPage={5}
          handleDeleteUser={this.handleDeleteUser}
          handleEditUser={this.handleEditUser}
          handleChangeActive={this.handleChangeActive}
        />
      </>
    );
  }
}
export default User;
export {};
