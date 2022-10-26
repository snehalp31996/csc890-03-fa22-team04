import React from "react";
import "../../index.css";
import Image from "react-bootstrap/Image";
import snehal from "../../assets/About/snehal.png";
import { Component } from "react";
class AboutSnehal extends Component {
  render(){
    return (
      <div className="profile-container">
        <div className="profile-parent">
          <div className="profile-details">
  
            <div className="profile-details-name">
              <span className="primary-text">
                Hello! I'M <span className="highlighted-text">Snehal Patil</span>
              </span>
            </div>
  
            <div className="profile-details-role">
              <span className="profile-role-tagline">
                Love building applications with frontend and backend operations.
              </span>
              <span className="profile-role-paragraph">
                
                I am a Computer Science Graduate student at San Francisco State
                University. I am currently in my 3rd semester, planning to
                graduate in May 2023. I have taken this course to get exposure to
                frontend and backend technologies and languages. Currently for
                this project I am learning React and Node.js. I love travelling to
                different places, also I love playing Tennis!
              </span>
            </div>
  
            <div className="profile-details-colz">
              <p>
                Email:
                <a href="mailto:spatil2@mail.sfsu.edu" className="link-info">
                  spatil2@mail.sfsu.edu
                </a>
              </p>
              <p>
                Github Username:
                <a href="https://github.com/snehalp396" className="link-info">
                  snehalp396
                </a>
              </p>
            </div>
          </div>
          <div className="profile-picture">
            <div className="profile-picture-background">
              <Image
                src={snehal}
                alt="SnehalImage"
                className="profile-picture-adjust"
              ></Image>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}

export default AboutSnehal;
