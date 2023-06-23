import React from "react";
import { NavLink } from "react-router-dom";
import "./nav.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { HiViewList } from "react-icons/hi";
import { HiOutlineXMark } from "react-icons/hi2";
import $ from "jquery";
const Navigation = () => {
  const handleOpenNav = () => {
    const navOverleyElement = $(".nav-overley")[0];
    const navMobileElement = $(".nav-mobile")[0];
    navMobileElement.style.display = "flex";
    navMobileElement.style.transform = "translateX(0%)";
  };
  const handleCloseNav = () => {
    
    const navMObileElement = document.querySelector(".nav-mobile");
    navMObileElement.style.transform = "translateX(-100%)";
    
  };
  return (
    <nav>
      <ul className="nav-pc">
        {" "}
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          Dashboard
        </NavLink>{" "}
        {/* <NavLink
            to="/customer"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Customer
          </NavLink>{" "} */}
        <NavLink
          to="/user"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          User
        </NavLink>
      </ul>
      <ul className="nav-mobile">
        <div className="closeNav">
          <HiOutlineXMark
            className="closeNav-icon"
            onClick={() => handleCloseNav()}
          />
        </div>
        {/* <NavLink
            to="/product"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Product
          </NavLink>{" "} */}
        <NavLink
          to="/dashboard"
          onClick={() => handleCloseNav()}
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          Dashboard
        </NavLink>{" "}
        <NavLink
          to="/user"
          onClick={() => handleCloseNav()}
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          User
        </NavLink>
      </ul>
      <div className="nav-overley"></div>
      <div className="listIcon-wrapper">
        <HiViewList className="listIcon" onClick={() => handleOpenNav()} />
      </div>
      <div className="profile">Admin</div>
    </nav>
  );
};
export default Navigation;
