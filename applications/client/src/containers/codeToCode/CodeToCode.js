import React, { useState, useEffect, useContext } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import { UserContext } from "../../App";
import StarRating from "../../components/StarRating";

const { Configuration, OpenAIApi } = require("openai");

const CodeToCode = () => {
  const { state, dispatch } = useContext(UserContext);
  const [response, setResponse] = useState("");
  const [dropdownValue1, setDropdownValue1] = useState("Python");
  const [dropdownValue2, setDropdownValue2] = useState("Java");
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [userDetails, setUserDetails] = useState([]);

  const onMouseEnter = (ratingValue) => {
    setHover(ratingValue);
  };

  const onMouseLeave = () => {
    setHover(null);
  };

  const onClick = (ratingValue) => {
    setRating(ratingValue);
  };

  const [userData, setUserData] = useState({
    email: "",
    question: "",
    answer: "",
    feedback: "",
    userRating: null,
  });

  const navigate = useNavigate();

  const callCodeToCode = async () => {
    try {
      const res = await fetch("/api/auth/codeToCode", {
        method: "GET",
        headers: {
          Accept: "appllication/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setUserDetails(data);

      dispatch({ type: "USER", payload: true });

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    callCodeToCode();
  }, []);

  const handleDropdown1 = (event) => {
    setDropdownValue1(event.target.value);
  };

  const handleDropdown2 = (event) => {
    setDropdownValue2(event.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());

    //OPENAI

    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    openai
      .createCompletion({
        model: "code-davinci-002",
        prompt: `##### Translate this function from ${dropdownValue1} into ${dropdownValue2} \n ### ${dropdownValue1} \n\n ${formDataObj.question} \n\n ### ${dropdownValue2}`,
        temperature: 0,
        max_tokens: 256,
        top_p: 1,
        n: 1,
        best_of: 2,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ["###"],
      })
      .then((response) => {
        // console.log(response);
        setResponse(response.data.choices[0].text);
        setDropdownValue1(dropdownValue1);
        setDropdownValue2(dropdownValue2);
        setUserData({
          ...userData,
          email: userDetails.email,
          answer: response.data.choices[0].text,
        });
      });
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };

  const submitFeedback = async (e) => {
    e.preventDefault();

    const { email, question, answer, feedback, userRating } = userData;

    const res = await fetch("/api/auth/CodeToCode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        question,
        answer,
        feedback,
        userRating,
      }),
    });

    const data = await res.json();
    if (!data) {
      alert("Feedback not sent");
    } else {
      alert("Feedback sent successfully");
      setUserData({
        ...userData,
        email: "",
        question: "",
        answer: "",
        feedback: "",
        userRating: "",
      });
      setResponse("");
      setRating(null);
    }
  };

  return (
    <Container>
      <br />
      <div className="div-containerrow">
        <h1>Translating programming languages</h1>
        <h4>Enter code and display the result for it.</h4>
      </div>
      <br />
      <br />

      <Form onSubmit={onFormSubmit} data-testid="code-form">
        <Row>
          <Col className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="progLang1">
                Select Programming language to convert code from
              </Form.Label>
              <Form.Select
                value={dropdownValue1}
                onChange={handleDropdown1}
                className="form-control"
                id="progLang1"
                data-testid="dropdown1"
              >
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C++">C++</option>
              </Form.Select>
              <Form.Text className="text-muted">
                By default source code will be considered in Python unless
                chosen from dropdown.
              </Form.Text>
            </Form.Group>
          </Col>

          <Col className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="progLang2">
                Select Programming language to convert code in
              </Form.Label>
              <Form.Select
                value={dropdownValue2}
                onChange={handleDropdown2}
                className="form-control"
                id="progLang2"
                data-testid="dropdown2"
              >
                <option value="Java">Java</option>
                <option value="Python">Python</option>
                <option value="C++">C++</option>
              </Form.Select>
              <Form.Text>
                By default it will convert code in Java unless chosen from
                dropdown.
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col className="col-md-6">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label> Write your {dropdownValue1} code </Form.Label>
              <Form.Control
                required
                as="textarea"
                name="question"
                placeholder="Source code"
                rows={12}
                onChange={handleInput}
              />
              <Form.Text className="text-muted">
                Enter proper information for more accurate code translation.
                Responses might not be 100% accurate.
              </Form.Text>
            </Form.Group>

            <Button variant="primary" size="lg" type="submit">
              Translate Code
            </Button>

            <Form.Group>
              <Form.Text>
                ....... await the response, might take a few seconds!
              </Form.Text>
            </Form.Group>
          </Col>

          <Col className="col-md-6">
            <h5>Result: {dropdownValue2} code</h5>
            <Card
              style={{ height: "305px", overflow: "auto" }}
              data-testid="card"
            >
              <Card.Body>
                <pre>{response}</pre>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
      <br />

      <h1>User Feedback</h1>
      <Row>
        <div className="mb-3">
          <div className="form">
            <Form onSubmit={submitFeedback} data-testid="feedback-form">
              <Form.Group method="POST" className="mb-3">
                <Form.Group className="mb-3">
                  <Form.Label>Enter your registered email</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={userDetails.email}
                    placeholder="Email"
                    id="feedback_form_email"
                    name="email"
                    className="feedback_form_email"
                    rows={1}
                    readOnly={true}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Enter the question</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={userData.question}
                    name="question"
                    placeholder="Question"
                    className="feedback_form_question"
                    rows={5}
                    readOnly={true}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Enter the output generated</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={response}
                    name="answer"
                    placeholder="Answer Generated"
                    className="feedback_form_answer"
                    rows={5}
                    readOnly={true}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Enter your feedback</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={userData.feedback}
                    onChange={handleInput}
                    name="feedback"
                    placeholder="Write your feedback"
                    className="feedback_form_feedback"
                    rows={5}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Rate the response</Form.Label>
                  <br />

                  <div className="star">
                    {[1, 2, 3, 4, 5].map((ratingValue) => {
                      return (
                        <StarRating
                          key={ratingValue}
                          ratingValue={ratingValue}
                          hover={hover}
                          rating={rating}
                          userData={userData}
                          onMouseEnter={onMouseEnter}
                          onMouseLeave={onMouseLeave}
                          onClick={onClick}
                          onChange={handleInput}
                        />
                      );
                    })}
                  </div>
                </Form.Group>
              </Form.Group>
              <Button variant="primary" size="lg" type="submit">
                Submit Feedback
              </Button>
            </Form>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default CodeToCode;
