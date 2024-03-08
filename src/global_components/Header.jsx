import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <NavLink to="/">
        <img
          style={{ height: "4rem" }}
          src="src/assets/Logo.png"
          alt="MealMaps"
        />
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
