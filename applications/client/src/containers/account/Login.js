import React, { useContext } from "react";
import Image from "react-bootstrap/Image";
import accountImg from "../../assets/Account/account.svg";
import { Link, useNavigate } from "react-router-dom";
import "./account.css";
import { useState } from "react";
import { UserContext } from "../../App";
import { Form, Button } from "react-bootstrap";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = res.json();

    if (res.status === 400 || !data) {
      window.alert("Invalid Credentials");
      console.log("Invalid Credentials");
    } else {
      dispatch({ type: "USER", payload: true });
      // window.alert("Login Successful!");
      console.log("Login Successfull!");
      navigate("/");
      // window.location = "/";
    }
  };
  return (
    <div className="base-container">
      <span className="box square border border-dark">
        <div className="header">Login</div>

        <div className="content">
          <div className="image">
            <Image src={accountImg} alt="Login" height="100%" width="100%" />
          </div>

          <div className="form-class">
            <Form>
              <Form.Group className="form-group" controlId="email">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId="password">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                onClick={handleSubmit}
              >
                Login
              </Button>
  
            </Form>
          </div>
        </div>

        <div className="footer">
          <p id="signUp">
            {" "}
            Not yet registered? <Link to="/Register"> Sign up </Link>
          </p>
        </div>
      </span>
    </div>
  );
};

export default Login;