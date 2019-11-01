import React, { useRef, useState, useEffect } from "react";

const MyRecipes = props => {
  const [myRecipes, setMyRecipes] = useState();

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
      {myRecipes.map(recipe => {
          return (
              <div key={recipe.id}>
                  
              </div>
          )
      })}
    </>
  );
};

export default MyRecipes;
