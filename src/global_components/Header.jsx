import React from "react";
import { NavLink } from "react-router-dom";
import AppLogo from "../assets/Logo.png";

const Header = () => {
  return (
    <header>
      <NavLink to="/">
        <img style={{ height: "57px" }} src={AppLogo} alt="MealMaps" />
      </NavLink>
      <nav id="navbar">
        <NavLink className="nav-links" to="/">
          Home
        </NavLink>
        <NavLink className="nav-links" to="/aboutus">
          About Us
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
