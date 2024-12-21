import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AppLogo from "../assets/Logo.png";
import Hamburger from "hamburger-react";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navMoboRef = useRef();
  document.body.style.overflow = isNavOpen ? "hidden" : "visible";

  // Hide Header on Scroll
  var oldScroll = window.scrollY;
  document.addEventListener("scroll", () => {
    var currentScroll = window.scrollY;
    if (currentScroll < oldScroll) {
      document.getElementById("header").style.top = "0";
    } else {
      document.getElementById("header").style.top = "-100px";
    }
    oldScroll = window.scrollY;
  });

  // Close Mobile Nav by Clicking anywhere outside the Nav
  useEffect(() => {
    if (isNavOpen) {
      const handler = (e) => {
        if (!navMoboRef.current.contains(e.target)) {
          setIsNavOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => {
        document.removeEventListener("mousedown", handler);
      };
    }
  });

  return (
    <header id="header">
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
