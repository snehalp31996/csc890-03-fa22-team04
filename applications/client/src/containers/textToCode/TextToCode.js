import React, {useState, useEffect, useContext} from 'react';
import {Container, Form, Button, Card} from 'react-bootstrap';
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import { UserContext } from "../../App";

const {Configuration , OpenAIApi} = require("openai");

const TextToCode = () => {

    const { state, dispatch } = useContext(UserContext);

    const navigate = useNavigate();

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
          // console.log(res);
          const data = await res.json();
          console.log(data);

          dispatch({ type: "USER", payload: true });
          
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
        callTextToCode();
    });

    const [response, setResponse] = useState(
        "....... await the response, might take a few seconds!"
      );

    const [dropdownValue, setDropdownValue] = useState('Python');

    
    const handleDropdown = event => {
        setDropdownValue(event.target.value);
    };

    const onFormSubmit = (e) => {

        e.preventDefault()

        console.log("Chosen programming language:", dropdownValue);

        const formData = new FormData(e.target),
        formDataObj = Object.fromEntries(formData.entries());
        console.log(formDataObj.query)

        //OPENAI

        const configuration = new Configuration({
            apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        });

        const openai = new OpenAIApi(configuration);

        openai.createCompletion({
            model: "code-davinci-002",
            prompt: `\n\n\\"\\"\\"\nWrite a ${dropdownValue} code to ${formDataObj.query}:\n`,
            temperature: 0.1,
            max_tokens: 256,
            top_p: 1,
            n: 1,
            best_of: 2,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop: ["\"\"\""],
        }).then((response) =>{
            console.log(response);
            setResponse(response.data.choices[0].text);
            setDropdownValue(dropdownValue);
        });
    }

    const [userData, setUserData] = useState({
        email: "",
        question: "",
        answer: "",
        feedback: "",
      });

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
    
        setUserData({ ...userData, [name]: value });
      };
    
    const submitFeedback = async (e) => {
        e.preventDefault();
    
        const { email, question, answer, feedback } = userData;
    
        console.log("hello from submit feedback");
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
          }),
        });

        const data = await res.json();
        if (!data) {
          console.log("Feedback not sent");
        } else {
          alert("Feedback sent successfully");
          setUserData({
            ...userData,
            email: "",
            question: "",
            answer: "",
            feedback: "",
          });
        }
      };

    return(
        <Container>
            <br/>
                <div className="div-containerrow">
                <h1> Generate code for your query</h1>
                <h4> Enter text and display the result for it.</h4>
                </div>
                <br />
                <br />

                <Row>
                <Col>
                    <Form onSubmit={onFormSubmit}>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="progLang">Select Programming language to generate code in</Form.Label>
                            <Form.Select
                                value={dropdownValue}
                                onChange={handleDropdown}
                                className="form-control"
                                id="progLang"
                                >
                                {/* <option value="noLangSelected">Select language</option> */}
                                <option value="Python">Python</option>
                                <option value="Java">Java</option>
                                <option value="C++">C++</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label> Write your query to generate code for </Form.Label>
                            <Form.Control required as="textarea" name="query" placeholder="Enter your query" rows={5}/>
                            <Form.Text className="text-muted">
                                Enter as much information as possible for more accurate code generation. By default it will generate code in Python
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
                    <Card.Title><h3>{dropdownValue} code</h3></Card.Title>
                    <br />
                    <Card.Text>
                    <h4>
                        <pre>{response}</pre>
                    </h4>
                    </Card.Text>
                </Card.Body>
                </Card>   

                <br />

            <h1>User Feedback</h1>
            <Row>
            <div className="mb-3">
                <div className="form">
                <Form onSubmit={submitFeedback}>
                    <Form.Group method="POST" className="mb-3">

                    <Form.Group className='mb-3'>
                        <Form.Label>Enter your registered email</Form.Label>
                        <Form.Control
                            type="email"
                            value={userData.email}
                            onChange={handleInput}
                            placeholder="Email"
                            id="feedback_form_email"
                            name="email"
                            className="feedback_form_email"
                            required
                        />
                    </Form.Group>

                    <Form.Group className='mb-3'>
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
                    </Form.Group>
                    
                    <Form.Group className='mb-3'>
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
                    
                    </Form.Group>
                    <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    >
                    Submit Feedback
                    </Button>
                </Form>
                </div>
            </div>
            </Row>

        </Container> 
    )
    
}

export default TextToCode;