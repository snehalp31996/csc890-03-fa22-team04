import React, {useState, useEffect, useContext} from 'react';
import {Container, Form, Button, Card} from 'react-bootstrap';
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import { UserContext } from "../../App";

const {Configuration , OpenAIApi} = require("openai");

const CodeToCode = () => {

    const { state, dispatch } = useContext(UserContext);

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
        callCodeToCode();
    });

    const [response, setResponse] = useState(
        "....... await the response, might take a few seconds!"
      );

    const [dropdownValue1, setDropdownValue1] = useState('Python');
    const [dropdownValue2, setDropdownValue2] = useState('Java');

    const handleDropdown1 = event => {
        setDropdownValue1(event.target.value);
      };

    const handleDropdown2 = event => {
        setDropdownValue2(event.target.value);
    };

    const onFormSubmit = (e) => {

        e.preventDefault()

        console.log("Chosen programming language to convert from:", dropdownValue1);
        console.log("Chosen programming language to convert to:", dropdownValue2);

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
        prompt: `##### Translate this function from ${dropdownValue1} into ${dropdownValue2} \n ### ${dropdownValue1} \n\n ${formDataObj.query} \n\n ### ${dropdownValue2}`,
        temperature: 0,
        max_tokens: 256,
        top_p: 1,
        n: 1,
        best_of: 2,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ["###"],
        }).then((response) =>{
            console.log(response);
            setResponse(response.data.choices[0].text);
            setDropdownValue1(dropdownValue1);
            setDropdownValue2(dropdownValue2);
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
            <h1>Translating programming languages</h1>
            <h4>Enter code and display the result for it.</h4>
            </div>
            <br />
            <br />

            <Row>
            <Col>
                <Form onSubmit={onFormSubmit}>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="progLang1">Select Programming language to convert code from</Form.Label>
                        <Form.Select
                            value={dropdownValue1}
                            onChange={handleDropdown1}
                            className="form-control"
                            id="progLang1"
                            >
                            <option value="Python">Python</option>
                            <option value="Java">Java</option>
                            <option value="C++">C++</option>
                        </Form.Select>
                        <Form.Text className="text-muted">
                            <br/> By default source code will be considered in Python unless chosen from dropdown.
                        </Form.Text>
                    </Form.Group>

                    <br />

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label> Write your {dropdownValue1} code </Form.Label>
                        <Form.Control required as="textarea" name="query" placeholder="Source code" rows={5}/>
                        <Form.Text className="text-muted">
                            <br/> Enter proper information for more accurate code translation. 
                        </Form.Text>
                    </Form.Group>

                    <br />
                    <br />

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="progLang2">Select Programming language to convert code in</Form.Label>
                        <Form.Select
                            value={dropdownValue2}
                            onChange={handleDropdown2}
                            className="form-control"
                            id="progLang2"
                            >
                            {/* <option value="noLangSelected">Select language</option> */}
                            <option value="Java">Java</option>
                            <option value="Python">Python</option>
                            <option value="C++">C++</option>
                        </Form.Select>
                        <Form.Text>
                            <br/> By default it will convert code in Java unless chosen from dropdown.
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
                <Card.Title><h3>{dropdownValue2} code</h3></Card.Title>
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

export default CodeToCode;






  