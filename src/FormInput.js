import React, {useState} from 'react'
import {Row,Col,Form,Button} from 'react-bootstrap'

const FormInput = () => {
  const [userInput, setUserInput]=useState({
    title:"",
    openingText:"",
    date:"",
  })
  const onChangeHandler=(e)=>{
    const {name,value}=e.target;
    setUserInput((prev)=>{
      return {...prev, [name]:value}
    });
  }
  const onSubmitHandler=(e)=>{
    e.preventDefault();
    console.log(userInput);
  }
  return (
    <Row>
    <Col sm={6} className="colm">
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail" onChange={onChangeHandler}>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword" onChange={onChangeHandler}>
          <Form.Label>Opening text</Form.Label>
          <textarea name="openingText" rows="5" cols="30"></textarea>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword" onChange={onChangeHandler}>
          <Form.Label>Release Date</Form.Label>
          <Form.Control type="date" name="date" placeholder="Date" />
        </Form.Group>

        <Button  variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Col>
  </Row>
  )
}

export default FormInput;
