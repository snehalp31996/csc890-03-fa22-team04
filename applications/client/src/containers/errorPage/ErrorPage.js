import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <Container>
      <div className="div-containerrow">
        <h1>404</h1>
        <h2> We are sorry, page not found</h2>
        <h4>
          {" "}
          The page you are looking for might have been removed or had its name
          changed or is temporarily unavailable
        </h4>
      </div>
      <br />
      <div className="homepage-options">
        <Link to="/">
          <button className="btn highlighted-btn">
            <h4> BACK TO HOMEPAGE </h4>
          </button>
        </Link>
      </div>
    </Container>
  );
};

export default ErrorPage;
