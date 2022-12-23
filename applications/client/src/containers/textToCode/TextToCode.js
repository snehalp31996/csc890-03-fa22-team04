import React, { useState, useEffect, useContext } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import { UserContext } from "../../App";
import StarRating from "../../components/StarRating";

const { Configuration, OpenAIApi } = require("openai");

const TextToCode = () => {
  const { state, dispatch } = useContext(UserContext);
  const [response, setResponse] = useState("");
  const [dropdownValue, setDropdownValue] = useState("Python");
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

  //  fetching user data
  const callTextToCode = async () => {
    try {
      const res = await fetch("/api/auth/textToCode", {
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
    callTextToCode();
  }, []);

  const handleDropdown = (event) => {
    setDropdownValue(event.target.value);
  };

  // user input in form and output with OpenAI
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
        model: "text-davinci-003",
        prompt: `\n\n\\"\\"\\"\nWrite a ${dropdownValue} code to ${formDataObj.question}:\n`,
        temperature: 0.1,
        max_tokens: 256,
        top_p: 1,
        n: 1,
        best_of: 2,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ['"""'],
      })
      .then((response) => {
        setResponse(response.data.choices[0].text);
        setDropdownValue(dropdownValue);
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

  // user feedback form
  const submitFeedback = async (e) => {
    e.preventDefault();

    const { email, question, answer, feedback, userRating } = userData;

    const res = await fetch("/api/auth/TextToCode", {
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
        <h1> Generate code for your query</h1>
        <h4> Enter text and display the result for it.</h4>
      </div>
      <br />
      <br />

      <Form onSubmit={onFormSubmit} data-testid="code-form">
        <Row>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="progLang">
              Select Programming language to generate code in
            </Form.Label>
            <Form.Select
              value={dropdownValue}
              onChange={handleDropdown}
              className="form-control"
              id="progLang"
              data-testid="select"
            >
              <option
                name="language"
                value="Python"
                data-testid="select-option"
              >
                Python
              </option>
              <option name="language" value="Java" data-testid="select-option">
                Java
              </option>
              <option name="language" value="C++" data-testid="select-option">
                C++
              </option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row>
          <Col className="col-md-6">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                {" "}
                Query: Write your question to generate code for{" "}
              </Form.Label>
              <Form.Control
                required
                as="textarea"
                name="question"
                placeholder="Enter your question"
                rows={12}
                onChange={handleInput}
              />
              <Form.Text className="text-muted">
                Enter as much information as possible for more accurate code
                generation. Responses might not be 100% accurate. By default it
                will generate code in Python
              </Form.Text>
            </Form.Group>

            <Button variant="primary" size="lg" type="submit">
              Generate Code
            </Button>

            <Form.Group>
              <Form.Text>
                ....... await the response, might take a few seconds!
              </Form.Text>
            </Form.Group>
          </Col>

          <Col className="col-md-6">
            <h5>Result: {dropdownValue} code</h5>
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
            <Form
              onSubmit={submitFeedback}
              method="POST"
              data-testid="feedback-form"
            >
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

              <Form.Group className="mb-3">
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
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        onClick={onClick}
                        onChange={handleInput}
                      />
                    );
                  })}
                </div>
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

export default TextToCode;
