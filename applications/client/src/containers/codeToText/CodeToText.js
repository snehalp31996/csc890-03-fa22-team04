import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../index.css";
const { Configuration, OpenAIApi } = require("openai");

const CodeToText = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    question: "",
    answer: "",
    feedback: "",
  });
  const callCodeToText = async () => {
    try {
      const res = await fetch("/api/auth/codeToText", {
        method: "GET",
        headers: {
          Accept: "appllication/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    callCodeToText();
  });

  const [response, setResponse] = useState(
    "....... await the response, might take a few seconds!"
  );

  const onFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());

    console.log(formDataObj.productName);

    //OPENAI

    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    openai
      .createCompletion({
        model: "code-davinci-002",
        prompt: `${formDataObj.productName}\n\n\\"\\"\\"\nHere's what the above class is doing:\n`,
        temperature: 0.8,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ['"""'],
      })
      .then((response) => {
        setResponse(response.data.choices[0].text);
      });
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };

  const submitFeedback = async (e) => {
    e.preventDefault();

    const { email, question, answer, feedback } = userData;

    console.log("hello from submit feedback");
    const res = await fetch("/api/auth/codeToText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        question,
        answer,
        feedback,
      }),
    });
    const data = await res.json();
    if (!data) {
      console.log("Feedback not send");
    } else {
      alert("FeedBack sent successfully");
      setUserData({
        ...userData,
        email: "",
        question: "",
        answer: "",
        feedback: "",
      });
    }
  };

  return (
    <Container>
      <br />
      <div className="div-containerrow">
        <h1> Generate Explanation for your code</h1>
        <h4> Enter code and display the result for it.</h4>
      </div>
      <br />
      <Row>
        <Col>
          <Form onSubmit={onFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label> What Code you want to undertsand?</Form.Label>
              <Form.Control
                as="textarea"
                name="productName"
                placeholder="Enter Code"
                className="feedback_form_question"
                rows={5}
              />
              <Form.Text className="text-muted">
                Enter as much information as possible for more accurate
                description.
              </Form.Text>
            </Form.Group>
            <Button variant="primary" size="lg" type="submit">
              Get AI Suggestions
            </Button>
          </Form>
        </Col>
      </Row>
      <br />
      <br />
      <Card>
        <Card.Body>
          <br />
          <Card.Text>
            <pre>{response}</pre>
          </Card.Text>
        </Card.Body>
      </Card>
      <br />

      <h1>User Feedback</h1>
      <Row>
        <div className="mb-3">
          <div className="form">
            <Form>
              <Form.Group method="POST" className="mb-3">
                <Form.Control
                  type="email"
                  value={userData.email}
                  onChange={handleInput}
                  placeholder="Your Registered Email"
                  id="feedback_form_email"
                  name="email"
                  className="feedback_form_email"
                  required
                />
                <Form.Label>Enter the question</Form.Label>
                <Form.Control
                  as="textarea"
                  value={userData.question}
                  onChange={handleInput}
                  name="question"
                  placeholder="Question"
                  className="feedback_form_question"
                  rows={5}
                  required
                />
                <Form.Label>Enter the output generated</Form.Label>
                <Form.Control
                  as="textarea"
                  value={userData.answer}
                  onChange={handleInput}
                  name="answer"
                  placeholder="Answer Generated"
                  className="feedback_form_answer"
                  rows={5}
                  required
                />
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
              <Button
                variant="primary"
                size="lg"
                type="submit"
                onClick={submitFeedback}
              >
                Submit Feedback
              </Button>
            </Form>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default CodeToText;
