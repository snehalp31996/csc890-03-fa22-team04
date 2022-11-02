import { Button, Card, Nav } from "react-bootstrap";
import React from "react";
import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
class CardDisplay extends Component {
  render() {
    const { header, title, text, theLink } = this.props;
    return (
      <div>
        <Card style={{ height: "250px" }}>
          <Card.Header as="h5">{header}</Card.Header>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{text}</Card.Text>
            <Nav.Link href={theLink}>
              <div className="profile-options">
                <Button className="btn highlighted-btn" size="lg">
                  {" "}
                  Get Started
                </Button>
              </div>
            </Nav.Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default CardDisplay;
