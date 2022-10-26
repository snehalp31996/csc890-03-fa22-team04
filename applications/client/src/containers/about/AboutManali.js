import React from "react";
import "../../index.css";
import Image from "react-bootstrap/Image";
import manali from "../../assets/About/manali.png";
import { Component } from "react";
class AboutManali extends Component {
  render(){
    return (
      <div className="profile-container">
        <div className="profile-parent">
          <div className="profile-details">
  
            <div className="profile-details-name">
              <span className="primary-text">
                Hello! I'M <span className="highlighted-text">Manali Seth</span>
              </span>
            </div>
  
            <div className="profile-details-role">
              <span className="profile-role-tagline">
                Love building applications with frontend and backend operations.{" "}
              </span>
              <span className="profile-role-paragraph">
                I am a Graduate student pursuing Computer Science at San Francisco State
                University. I have some experience working as frontend/backend developer.
                Looking forward to work in a team and create a website using MERN stack for this course.
              </span>
            </div>
  
            <div className="profile-details-colz">
              <p>
                Email:
                <a href="mailto:mseth@mail.sfsu.edu" className="link-info">
                  mseth@mail.sfsu.edu
                </a>
              </p>
              <p>
                Github Username:
                <a href="https://github.com/ManaliSeth" className="link-info">
                  Manali-Seth
                </a>
              </p>
            </div>
  
          </div>
          <div className="profile-picture">
            <div className="profile-picture-background">
              <Image
                src={manali}
                alt="ManaliImage"
                className="profile-picture-adjust"
              ></Image>
            </div>
          </div>
        </div>
      </div>
);
}
}

export default AboutManali;
