import { useState } from "react";
import React from "react";
import Image from "react-bootstrap/Image";
import accountImg from "../../assets/Account/account.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./account.css";
import { Form, Button } from "react-bootstrap";

const Register = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userType: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  return (
    <div className="base-container">
      <span className="box square border border-dark">
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <Image src={accountImg} alt="Register" height="100%" width="100%" />
          </div>

          <div className="form-class">
            <Form onSubmit={handleSubmit}>
              <Form.Group className='mb-3' controlId='firstName'>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleChange}
                  value={data.firstName}
                  required
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='lastName'>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleChange}
                  value={data.lastName}
                  required
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='email'>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={data.email}
                  required
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='password'>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={data.password}
                  required
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='userType'>
                <Form.Select
                  name="userType"
                  onChange={handleChange}
                  value={data.userType}
                  required
                  autoFocus
                >
                  <option value="">Select One</option>
                  <option>Student</option>
                  <option>Professor</option>
                  <option>Employee</option>
                </Form.Select>
              </Form.Group>

              <br />
              {error && <div className="error_message">{error}</div>}
              <Button type="submit" variant="primary" size="lg">
                Register
              </Button>

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
