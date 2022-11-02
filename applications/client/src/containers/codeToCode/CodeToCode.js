import React from 'react';
import {Component} from 'react';
import {Container, Form, Button, Card} from 'react-bootstrap';
import { Col, Row } from "react-bootstrap";
import "../../index.css";
const {Configuration , OpenAIApi} = require("openai");

export default class CodeToCode extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            heading: 'The response from the AI will be shown here',
            response: '...wait for few seconds to generate code',
            dropdownValue1: "Python",
            dropdownValue2: "Java",
        };
        
        this.handleDropdown1 = this.handleDropdown1.bind(this);
        this.handleDropdown2 = this.handleDropdown2.bind(this);
    }


    handleDropdown1 = event => {
        this.setState({
            dropdownValue1: event.target.value
        });
      };

    handleDropdown2 = event => {
        this.setState({
            dropdownValue2: event.target.value
        });
    };

    handleFormSubmit = e =>{

        e.preventDefault()

        console.log("Chosen programming language to convert from:", this.state.dropdownValue1);
        console.log("Chosen programming language to convert to:", this.state.dropdownValue2);

        const formData = new FormData(e.target),
        formDataObj = Object.fromEntries(formData.entries());
        console.log(formDataObj.query)

        //OPENAI

        const configuration = new Configuration({
        apiKey: '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',
        });
        const openai = new OpenAIApi(configuration);

        openai.createCompletion({
        model: "code-davinci-002",
        prompt: `##### Translate this function from ${this.state.dropdownValue1} into ${this.state.dropdownValue2} \n ### ${this.state.dropdownValue1} \n\n ${formDataObj.query} \n\n ### ${this.state.dropdownValue2}`,
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
            this.setState({
                heading: `AI Code Generation :`,
                response: `${response.data.choices[0].text}`,
                dropdownValue1: `${this.state.dropdownValue1}`,
                dropdownValue2: `${this.state.dropdownValue2}`,
            })
        });
        
    }

    render(){

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
                        <Form onSubmit={this.handleFormSubmit}>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="progLang1">Select Programming language to convert code from</Form.Label>
                                <Form.Select
                                    value={this.state.dropdownValue1}
                                    onChange={this.handleDropdown1}
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
                                <Form.Label> Write your {this.state.dropdownValue1} code </Form.Label>
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
                                    value={this.state.dropdownValue2}
                                    onChange={this.handleDropdown2}
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
                        <Card.Title><h3>{this.state.dropdownValue2} code</h3></Card.Title>
                        <br />
                        <Card.Text>
                        <h4>
                            <pre>{this.state.response}</pre>
                        </h4>
                        </Card.Text>
                    </Card.Body>
                    </Card>   

            </Container> 
        )
    }
  }






  