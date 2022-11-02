import Image from "react-bootstrap/Image";
import image1 from "../../assets/Home/1.png";
import image2 from "../../assets/Home/2.png";
import image3 from "../../assets/Home/3.png";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "../../components/CardDisplay";
import { Col, Row } from "react-bootstrap";
import "../../index.css";

const Home = () => {
  return (
    <div className="div-container">
      <br />
      <div className="div-containerrow">
        <h1> CSC 890 Graduate Seminar Project</h1>
        <p>
          {" "}
          Start by picking any of the use-cases below to start generating AI
          content.
        </p>
      </div>
      <br />
      <Row>
        <Col>
          <div className="icon-picture">
            <Image
              src={image1}
              alt="Image1"
              className="profile-picture-adjust"
            ></Image>
          </div>
          <Card
            header="Code To Text"
            title="Translate Code to Natural Language"
            text="Explain a complicated piece of code. User can input the code in the text box."
            theLink="/codeToText"
          />
        </Col>
        <Col>
          <div className="icon-picture">
            <Image
              src={image2}
              alt="Image2"
              className="profile-picture-adjust"
            ></Image>
          </div>
          <Card
            header="Text To Code"
            title="Generate Code"
            text="Generates code in any language mentioned by the user. The user has to select the language type."
            theLink="/textToCode"
          />
        </Col>
        <Col>
          <div className="icon-picture">
            <Image
              src={image3}
              alt="Image3"
              className="profile-picture-adjust"
            ></Image>
          </div>
          <Card
            header="Code To Code"
            title="Translate programming languages"
            text="Translate from one programming language to another, use the comments to specify the source and target languages."
            theLink="/codeToCode"
          />
        </Col>
      </Row>
      <br />
      <br />
    </div>
  );
};

export default Home;
