import React, { useState, useEffect, useRef } from "react";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import "./RecipeForm.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AddIngredient from "./AddIngredient"

const RecipeForm = props => {
  const [myRecipe, setMyRecipe] = useState([]);
  const recipeName = useRef();
  const timeToCook = useRef();
  const recipeInstructions = useRef();
  const linkToPage = useRef();


  const getRecipe = () => {
    fetch(`http://localhost:8000/recipes/${props.match.params.recipeId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      }
    })
      .then(response => response.json())
      .then(response => {
        setMyRecipe(response);
      });
  };


  const updateRecipe = () => {
    fetch(`http://localhost:8000/recipes/${myRecipe.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        name: recipeName.current.value,
        instructions: recipeInstructions.current.value,
        time_to_cook: timeToCook.current.value,
        link_to_page: linkToPage.current.value
      })
    })
      .then(response => response.json())
      .then(response => {
        setMyRecipe(response);
      });
  };

  const deleteIngredient = id => {
    fetch(`http://localhost:8000/recipeingredients/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`
        }
      })
        .then(getRecipe)
  }


  useEffect(getRecipe, []);
  console.log(myRecipe)
  return (
    <>
      <h1>{myRecipe.name}</h1>
      <Form>
        <Form.Group controlId="recipeName">
          <Form.Label>Update Recipe Name</Form.Label>
          <Form.Control
            type="text"
            name="recipeName"
            ref={recipeName}
            defaultValue={myRecipe.name}
          />
        </Form.Group>
        <Button variant="primary" size="sm" onClick={updateRecipe}>
          Update Recipe Name
        </Button>
      </Form>
      <h1>Add Ingredients to Your Recipe!</h1>
      <AddIngredient {...props} getRecipe={getRecipe} myRecipe={myRecipe} />

      <div>
        <h1>ingredients list</h1>
        {myRecipe.ingredient_list ? (
          <ul>
            {myRecipe.recipe_ingredient.map(ingredient => {

              return (
                <div key={ingredient.id}>
                  <li>
                    {ingredient.amount} {ingredient.ingredient.name}{" "}
                    {ingredient.extra_instructions}{" "}
                  </li>
                  <Button variant="success" size="sm">
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => deleteIngredient(ingredient.id)}>
                    Delete
                  </Button>
                </div>
              );
            })}
          </ul>
        ) : (
          <h6>no ingredients</h6>
        )}
      </div>

      <Form>
        <h1>Instructions</h1>
        <Form.Group controlId="timeToCook">
          <Form.Label>estimated time</Form.Label>
          <Form.Control
            type="text"
            name="timeToCook"
            ref={timeToCook}
            defaultValue={myRecipe.time_to_cook}
          />
        </Form.Group>
        <Form.Group controlId="recipeInstructions">
          <Form.Label>recipe Instructions</Form.Label>
          <Form.Control
            as="textarea"
            rows="6"
            name="recipeInstructions"
            ref={recipeInstructions}
            defaultValue={myRecipe.instructions}
          />
        </Form.Group>
        <Form.Group controlId="linkToPage">
          <Form.Label>Website Link</Form.Label>
          <Form.Control
            type="text"
            name="linkToPage"
            ref={linkToPage}
            defaultValue={myRecipe.link_to_page}
          />
        </Form.Group>
        <Button variant="primary" size="sm" onClick={updateRecipe}>
          Save Recipe
        </Button>
      </Form>
    </>
  );
};

export default RecipeForm;