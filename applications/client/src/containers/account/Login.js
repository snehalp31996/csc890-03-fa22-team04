import React from "react";
import Image from "react-bootstrap/Image";
import accountImg from "../../assets/Account/account.svg";
import { Link } from "react-router-dom";
import "./account.css";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
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
        <div className="header">Login</div>

        <div className="content">
          <div className="image">
            <Image src={accountImg} alt="Login" height="100%" width="100%" />
          </div>

          <div className="form-class">
            <form className="form-group" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={data.email}
                required
                className="form-control"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={data.password}
                required
                className="form-control"
              />
              {error && <div className="error_message">{error}</div>}
              <button type="submit" className="btn highlighted-btn">
                Login
              </button>
            </form>
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
