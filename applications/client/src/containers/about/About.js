import Image from "react-bootstrap/Image";
import snehal from "../../assets/About/snehal.png";
import manali from "../../assets/About/manali.png";
import { Link } from "react-router-dom";
import "../../index.css";
import React from "react";
import { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";

const About = () => {
  return (
    <div className="div-container">
      <Container>
        <br />
        <div className="div-containerrow">
          <h1> Connect with us!</h1>
          <h5> Thank you for visiting our website!</h5>
        </div>
        <br />
        <Row className="row-class">
          <Col>
            <div className="icon-picture">
              <Image
                src={snehal}
                alt="Image1"
                className="profile-picture-adjust"
              ></Image>
            </div>
            <h2> Snehal Patil </h2>
            <h4> Team Leader </h4>
            <h5>
              {" "}
              Email:{" "}
              <a href="mailto:spatil2@mail.sfsu.edu" className="link-info">
                {" "}
                spatil2@mail.sfsu.edu{" "}
              </a>
            </h5>
            <h5>
              {" "}
              Github Username:{" "}
              <a href="https://github.com/snehalp396" className="link-info">
                {" "}
                snehalp396{" "}
              </a>
            </h5>
            <br />
            <div className="profile-options">
              <Link to="/AboutSnehal">
                <button className="btn highlighted-btn">
                  <h4> About Me! </h4>
                </button>
              </Link>
            </div>
          </Col>
          <Col>
            <div className="icon-picture">
              <Image
                src={manali}
                alt="Image2"
                className="profile-picture-adjust"
              ></Image>
            </div>
            <h2> Manali Seth </h2>
            <h4> Github Master </h4>
            <h5>
              {" "}
              Email:{" "}
              <a href="mailto:mseth@mail.sfsu.edu" className="link-info">
                {" "}
                mseth@mail.sfsu.edu{" "}
              </a>
            </h5>
            <h5>
              {" "}
              Github Username:{" "}
              <a href="https://github.com/ManaliSeth" className="link-info">
                {" "}
                Manali-Seth{" "}
              </a>
            </h5>
            <br />
            <div className="profile-options">
              <Link to="/AboutManali">
                <button className="btn highlighted-btn">
                  <h4> About Me! </h4>
                </button>
              </Link>
            </div>
          </Col>
        </Row>
        <br />
        <br />
      </Container>
    </div>
  );
};

export default About;
