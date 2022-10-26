import React from 'react';
import {Component} from 'react';
import {Container, Form, Button, Card} from 'react-bootstrap';
import { Col, Row } from "react-bootstrap";
import "../../index.css";
const {Configuration , OpenAIApi} = require("openai");
class CodeToText extends Component {
  constructor(){
    super()
    this.state = {
      heading: 'The response from the AI will be shown here',
      response: '....... await the response'
    }
  }

  onFormSubmit = e =>{

    e.preventDefault()

    const formData = new FormData(e.target),
    formDataObj = Object.fromEntries(formData.entries())

    console.log(formDataObj.productName)

    //OPENAI

    const configuration = new Configuration({
      apiKey: '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',
    });
    const openai = new OpenAIApi(configuration);

    openai.createCompletion({
      model: "code-davinci-002",
      prompt: `${formDataObj.productName}\n\n\\"\\"\\"\nHere's what the above class is doing:\n`,
      temperature: 0.8,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ["\"\"\""],
    }).then((response) =>{
      // let str = `${response.data.choices[0].text}`
      // console.log(str.length);
      // var array1 = []
      // let str1 = ""
      // for(let i = 0; i < str.length ;i++)
      // {
      //   str1 += str[i];
      //   if(str[i] === '.')
      //   {
      //     array1.push(str1);
      //     str1 = "";
      //   }
        
      // }
      this.setState({
        heading: `AI Code Explanation :`,
        response: `${response.data.choices[0].text}`
      })
    });
  }
    

  render(){
    return(
      <Container>
        <br/>
            <div className="div-containerrow">
              <h1> Generate Explanation for your code</h1>
              <h4> Enter code and display the result for it.</h4>
            </div>
            <br />
            <Row>
              <Col>
                <Form onSubmit={this.onFormSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label> What Code you want to undertsand?</Form.Label>
                    <Form.Control as="textarea" name="productName" placeholder="Enter Code" rows={5}/>
                    <Form.Text className="text-muted">
                      Enter as much information as possible for more accurate description.
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
                <Card.Title><h1>{this.state.heading}</h1></Card.Title>
                <br />
                <Card.Text>
                  <h4>
                    {this.state.response}
                  </h4>
                </Card.Text>
              </Card.Body>
            </Card>          
      </Container> 
    )
  }
  }
  
  export default CodeToText;





  