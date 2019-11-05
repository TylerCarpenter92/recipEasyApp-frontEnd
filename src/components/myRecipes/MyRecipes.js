import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"

const MyRecipes = props => {
  const [myRecipes, setMyRecipes] = useState([]);

  const getMyRecipes = () => {
    fetch(`http://localhost:8000/recipes`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      }
    })
      .then(response => response.json())
      .then(setMyRecipes);
  };

  useEffect(getMyRecipes, []);

  return (
    <>
      <h1>Heres Your Recipes</h1>
      {myRecipes.length > 0 ?
      myRecipes.map(recipe => {
        return (
          <Card style={{ width: "18rem" }} key={recipe.id}>
            <Card.Body>
              <Card.Title>{recipe.name}</Card.Title>
              <Button variant="primary" onClick={() => props.history.push(`/recipe/${recipe.id}`)}>Details</Button>
            </Card.Body>
          </Card>
        );
      })
      :
      <h3>you have no recipes</h3>
      }

    </>
  );
};

export default MyRecipes;
