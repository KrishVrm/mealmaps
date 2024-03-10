import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AppLogo from "../assets/Logo.png";
import Hamburger from "hamburger-react";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navMoboRef = useRef();
  document.body.style.overflow = isNavOpen ? "hidden" : "scroll";

  useEffect(() => {
    const handler = (e) => {
      if (!navMoboRef.current.contains(e.target)) {
        setIsNavOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

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

      <Hamburger color="#d4d4d4" toggled={isNavOpen} toggle={setIsNavOpen} />

      {isNavOpen && (
        <nav className="mobo-navbar">
          <div className="mobo-navlinks" ref={navMoboRef}>
            <NavLink className="nav-links" to="/">
              Home
            </NavLink>
            <NavLink className="nav-links" to="/aboutus">
              About Us
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
