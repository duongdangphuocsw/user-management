import React from "react";
import { IoMdPersonAdd, IoMdSearch, IoIosCloseCircle } from "react-icons/io";
import "./handleUser.scss";
import { toast } from "react-toastify";
import axios from "axios";
class HandleUser extends React.Component {
  handleChange_inputName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  handleChange_inputEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handleChange_groupSelect = (event) => {
    this.setState({
      group: event.target.value,
    });
  };
  handleChange_statusSelect = (event) => {
    this.setState({
      status: event.target.value !== "" ? event.target.value === "true" : "",
    });
  };
  validate = () => {
    let { name, email, group, state } = this.state;
    if (name === "" || email === "" || group === "" || state === "")
      return false;
    return true;
  };
  handleAddUser = () => {
    if (this.validate()) {
      axios({
        method: "post",
        url: "https://631c255e4fa7d3264ca7c5ca.mockapi.io/api/users",
        data: {
          name: this.state.name,
          email: this.state.email,
          group_role: this.state.group,
          is_active: this.state.status,
        },
      })
        .then((response) => {
          this.setState({
            name: "",
            email: "",
          });
          const listOptionGroupSelect = document.getElementById("group-select").options;
          const listOptionStatusSelect = document.getElementById("status-select").options
          listOptionGroupSelect[0].selected = true
          listOptionStatusSelect[0].selected = true
          return response;
        })
        .then((response) => {
          this.props.AddUser(response.data);
          return "Add user succesfull!";
        })
        .then((message) => {
          toast.success(message);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Can't add user");
        });
    } else {
      toast.error("Please fill all input");
    }
  };
  handleSearchUser = () => {
    const users = this.props.users;
    const dataFind = this.state;
    //handle filter user
    const userFilter = users.filter((item) => {
      return (
        item.name.toLowerCase().includes(dataFind.name.toLowerCase()) &&
        (dataFind.email === "" ? true : dataFind.email === item.email) &&
        (dataFind.group === "" ? true : dataFind.group === item.group_role) &&
        (dataFind.status === "" ? true : dataFind.status === item.is_active)
      );
    });
    this.props.SearchUser(userFilter);
  };
  state = {
    name: "",
    email: "",
    group: "",
    status: "",
  };
  render() {
    let { name, email, group, status } = this.state;
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
                onChange={(event) => this.handleChange_inputName(event)}
              />
            </div>
            <div className="formGroup">
              <label>Email</label>
              <input
                type={"text"}
                placeholder={"Type email"}
                value={email}
                onChange={(event) => this.handleChange_inputEmail(event)}
              />
            </div>
            <div className="formGroup">
              <label>Group</label>
              <select
                name="group"
                id="group-select"
                onChange={(event) => this.handleChange_groupSelect(event)}
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
                onChange={(event) => this.handleChange_statusSelect(event)}
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
                this.handleAddUser();
              }}
            >
              <IoMdPersonAdd className="iconBtn" />
              Add new user
            </button>
            <button
              type="button"
              className="btnFind"
              onClick={() => {
                this.handleSearchUser();
              }}
            >
              <IoMdSearch className="iconBtn" />
              Find
            </button>
            <button type="button" className="btnDeleteFind"
             onClick={() => {
      
              console.log(">> check props: " , this.props.handleDeleteFind())
            }}
            >
              <IoIosCloseCircle
                className="iconBtn"              
              />
              Delete find
            </button>
          </div>
        </div>
      </>
    );
  }
}
export default HandleUser;
