import React, { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddIngredient = props => {
  const [locations, setLocations] = useState([]);
  const ingredientName = useRef();
  const ingredientAmount = useRef();
  const ingredientInstructions = useRef();
  const location = useRef();

  const getLocations = () => {
    fetch(`http://localhost:8000/locations`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      }
    })
      .then(response => response.json())
      .then(response => {
        setLocations(response);
      });
  };

  const addIngredient = () => {
    fetch(`http://localhost:8000/recipeingredients`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        name: ingredientName.current.value,
        extra_instructions: ingredientInstructions.current.value,
        location: location.current.value,
        amount: ingredientAmount.current.value,
        recipe_id: props.myRecipe.id
      })
    })
      .then(response => response.json())
      .then(response => {
          ingredientInstructions.current.value = ""
          ingredientAmount.current.value = ""
          ingredientName.current.value = ""
        console.log(response);
        props.getRecipe();
      });
  };

  useEffect(getLocations, []);

  return (
    <Form>
      <Form.Group controlId="ingredientName">
        <Form.Label>Ingredient Name</Form.Label>
        
        <Form.Control
          type="text"
          name="ingredientName"
          ref={ingredientName}
          placeholder="ex: Butter"
        />
      </Form.Group>
      <Form.Group controlId="ingredientAmount">
        <Form.Label>Ingredient Amount</Form.Label>
        <Form.Control
          type="text"
          name="ingredientAmount"
          ref={ingredientAmount}
          placeholder="ex: 2Tbsp"
        />
      </Form.Group>
      <Form.Group controlId="ingredientInstructions">
        <Form.Label>ingredient Instructions</Form.Label>
        <Form.Control
          type="text"
          name="ingredientInstructions"
          ref={ingredientInstructions}
          placeholder="ex: melted"
        />
      </Form.Group>
      <Form.Group controlId="locations">
        <Form.Label>Aisle Selection</Form.Label>
        <Form.Control
          as="select"
          type="location"
          name="location"
          ref={location}
        >
          {locations.map(location => {
            return (
              <option key={location.id} id={location.id} value={location.id}>
                {location.location}
              </option>
            );
          })}
        </Form.Control>
      </Form.Group>
      <Button variant="primary" size="sm" onClick={addIngredient}>
        Add Ingredient
      </Button>
    </Form>
  );
};
export default AddIngredient;
