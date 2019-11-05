import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

const RecipeDetails = props => {
  const [myRecipe, setMyRecipe] = useState([]);

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

  const deleteRecipe = () => {
    fetch(`http://localhost:8000/recipes/${myRecipe.id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`
        }
      })
      .then(() => props.history.push('/recipes'))

  }

  useEffect(getRecipe, []);
 
  return (
    <>
      <h1>{myRecipe.name}</h1>

      <h2>Ingredients</h2>
      {myRecipe.recipe_ingredient ? (
        myRecipe.recipe_ingredient.map(ingredient => {
          return (
            <div key={ingredient.id}>
              <li>
                {ingredient.amount} {ingredient.ingredient.name}{" "}
                {ingredient.extra_instructions}{" "}
              </li>
            </div>
          );
        })
      ) : (
        <h6>no ingredients</h6>
      )}

      <h2>instructions</h2>
      <p>{myRecipe.time_to_cook}</p>
      {myRecipe.instructions ? (
        <p>{myRecipe.instructions}</p>
      ) : (
        <p>no instructions</p>
      )}
      {myRecipe.link_to_page ?
        <a href={`${myRecipe.link_to_page}`}>link to website</a>
        :
        ""
      }


      <Button variant="success" size="sm" onClick={() => props.history.push(`/recipeForm/${myRecipe.id}`)}>
        Edit
      </Button>
      <Button
        variant="danger"
        size="sm"
        onClick={deleteRecipe}
      >
        Delete
      </Button>
    </>
  );
};

export default RecipeDetails;
