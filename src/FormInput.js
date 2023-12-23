import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

const FormInput = () => {
  const [userInput, setUserInput] = useState({
    title: "",
    openingText: "",
    date: "",
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => {
      return { ...prev, [name]: value };
    });
  };
  async function onSubmitHandler(e) {
    e.preventDefault();
    const response = await fetch(
      "https://fir-project-b7f8c-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(userInput),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }
  return (
    <Row>
      <Col sm={10} className="colm">
        <Form onSubmit={onSubmitHandler} style={{ width: "90%" }}>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
            onChange={onChangeHandler}
          >
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" placeholder="Enter Title" />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formBasicPassword"
            onChange={onChangeHandler}
          >
            <Form.Label>Opening text</Form.Label>
            <Form.Control
              type="text"
              name="openingText"
              placeholder="Enter opening text"
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formBasicPassword"
            onChange={onChangeHandler}
          >
            <Form.Label>Release Date</Form.Label>
            <Form.Control type="date" name="date" placeholder="Date" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default FormInput;
