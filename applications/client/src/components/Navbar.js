import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/Home/logo192.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
import React, { useContext, useEffect } from "react";

const NavbarComp = () => {
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div>
      <Navbar
        collapseOnSelect
        bg="dark"
        variant="dark"
        sticky="top"
        expand="lg"
      >
        <Navbar.Brand href="/">
          <img src={logo} alt="logo1" width="50px" />
          Code Talkers
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="navbar-nav  col-md-10"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link
              to="/"
              className="navbar-text"
              style={{ textDecoration: "none" }}
            >
              {" "}
              Home{" "}
            </Link>
            <Link
              to="/feedback"
              className="navbar-text"
              style={{ textDecoration: "none" }}
            >
              {" "}
              Feedback{" "}
            </Link>
            <Link
              to="/about"
              className="navbar-text"
              style={{ textDecoration: "none" }}
            >
              {" "}
              About{" "}
            </Link>
            {!state && (
              <Link
                to="/login"
                className="navbar-text"
                style={{ textDecoration: "none" }}
              >
                {" "}
                Login{" "}
              </Link>
            )}
            {!state && (
              <Link
                to="/register"
                className="navbar-text"
                style={{ textDecoration: "none" }}
              >
                {" "}
                Register{" "}
              </Link>
            )}
            {state && (
              <Link
                to="/logout"
                className="navbar-text"
                style={{ textDecoration: "none" }}
              >
                {" "}
                Logout{" "}
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarComp;
