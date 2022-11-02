import React, {useState} from 'react';
import {Container, Form, Button, Card} from 'react-bootstrap';
import { Col, Row } from "react-bootstrap";
import "../../index.css";
const {Configuration , OpenAIApi} = require("openai");

const TextToCode = () => {

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

        </Container> 
    )
    
}

export default TextToCode;