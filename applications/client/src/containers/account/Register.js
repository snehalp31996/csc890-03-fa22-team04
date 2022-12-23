import { useState } from "react";
import React from "react";
import Image from "react-bootstrap/Image";
import accountImg from "../../assets/Account/account.svg";
import { Link, useNavigate } from "react-router-dom";
import "./account.css";
import { Form, Button } from "react-bootstrap";

const Register = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userType: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = ({ currentTarget: input }) => {
    setUser({ ...user, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, userType, password } = user;
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, userType, password }),
    });
    const data = await res.json();
    if (data.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      window.alert("Registration Successfull!");
      console.log("Registration Successfull!");
      navigate("/login", { replace: true });
    }
  };
  return (
    <div className="base-container" data-testid="testing">
      <span className="box square border border-dark">
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <Image src={accountImg} alt="Register" height="100%" width="100%" />
          </div>

          <div className="form-class">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleChange}
                  value={user.firstName}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="lastName">
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleChange}
                  value={user.lastName}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={user.email}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={user.password}
                  required
                />
              </Form.Group>

              <Form.Group className="mx-3" controlId="userType">
                <Form.Select
                  name="userType"
                  onChange={handleChange}
                  value={user.userType}
                  required
                  autoFocus
                >
                  <option value="">Select Role</option>
                  <option>Student</option>
                  <option>Professor</option>
                  <option>Employee</option>
                </Form.Select>
              </Form.Group>

              <br />
              <div className="mx-3">
                <Button type="submit" variant="primary" size="lg">
                  Register
                </Button>
              </div>
            </Form>
          </div>
        </div>
        <div className="footer">
          <p id="signUp">
            {" "}
            Already registered? <Link to="/Login"> Sign in </Link>
          </p>
        </div>
      </span>
    </div>
  );
};

export default Register;
