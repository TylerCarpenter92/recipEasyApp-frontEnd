import React, { useRef, useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Constainer from "react-bootstrap/Container";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const MealPlan = props => {
  const [mealPlan, setMealPlan] = useState([]);

  const getMeaPlan = () => {
    fetch(
      `http://localhost:8000/mealplannings`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`
        }
      }
    )
      .then(response => response.json())
      .then(response => {
        setMealPlan(response);
      });
  };

  useEffect(getMeaPlan, []);

  return (
    <>
      <h1>Meal Planning for the next 7 days</h1>

      <Container>
        <Row>
          <Col>
            <>
              <Button
                variant="success"
                size="sm"
              >
                Edit
              </Button>
              <Button variant="danger" size="sm" >
                Delete
              </Button>
            </>
          </Col>
          <Col>
            <>
              <Button
                variant="success"
                size="sm"
              >
                Edit
              </Button>
              <Button variant="danger" size="sm" >
                Delete
              </Button>
            </>
          </Col>
          <Col>
            <>
              <Button
                variant="success"
                size="sm"
              >
                Edit
              </Button>
              <Button variant="danger" size="sm" >
                Delete
              </Button>
            </>
          </Col>
          <Col>
            <>
              <Button
                variant="success"
                size="sm"
              >
                Edit
              </Button>
              <Button variant="danger" size="sm" >
                Delete
              </Button>
            </>
          </Col>
          <Col>
            <>
              <Button
                variant="success"
                size="sm"
              >
                Edit
              </Button>
              <Button variant="danger" size="sm" >
                Delete
              </Button>
            </>
          </Col>
          <Col>
            <>
              <Button
                variant="success"
                size="sm"
              >
                Edit
              </Button>
              <Button variant="danger" size="sm" >
                Delete
              </Button>
            </>
          </Col>
          <Col>
            <>
              <Button
                variant="success"
                size="sm"
              >
                Edit
              </Button>
              <Button variant="danger" size="sm" >
                Delete
              </Button>
            </>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MealPlan
