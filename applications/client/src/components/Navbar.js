import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/Home/logo192.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";

const NavbarComp = () => {
  const { state, dispatch } = useContext(UserContext);
  const [userType, setUserType] = useState("");

  const navigate = useNavigate();

  const fetchUserType = async () => {
    try {
      const res = await fetch("/api/auth/getUserType", {
        method: "GET",
        headers: {
          Accept: "appllication/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setUserType(data.userType);
      dispatch({ type: "USER", payload: true });

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };

  useEffect(() => {}, [state]);

  useEffect(() => {
    fetchUserType();
  }, []);

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
            {state && userType === "Professor" && (
              <Link
                to="/feedback"
                className="navbar-text"
                style={{ textDecoration: "none" }}
              >
                {" "}
                Feedback{" "}
              </Link>
            )}

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
