import React from "react";
import { NavLink } from "react-router-dom";
import "./nav.scss";
import { BrowserRouter as Router } from "react-router-dom";
class Navigation extends React.Component {
  render() {
    return (
      <nav>
        <ul>
          {/* <Router> */}
            {" "}
            <NavLink
              to="/product"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Product
            </NavLink>{" "}
            <NavLink
              to="/customer"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Customer
            </NavLink>{" "}
            <NavLink
              to="/user"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              User
            </NavLink>
          {/* </Router> */}
        </ul>
        <div className="profile">Admin</div>
      </nav>
    );
  }
}
export default Navigation;
