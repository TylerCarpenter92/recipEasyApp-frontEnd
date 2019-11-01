import React, { useRef } from "react";


// This creates
const HomePage = props => {
  const recipeName = useRef();

  const createRecipe = () => {
      console.log(recipeName)
      return fetch(`http://localhost:8000/recipes`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          name: recipeName.current.value
        })
      })
      .then(data => data.json())
      .then(data =>{
          console.log(data)
        props.history.push(`/recipeForm/${data.id}`)

      })
  };
  console.log(recipeName)
  return (
    <>
      <h1> Welcome to RecipEasy</h1>
      <div>
        <label htmlFor="recipeName">Add New Recipe</label>
        <input
          type="text"
          name="recipeName"
          ref={recipeName}
          placeholder="Recipe Name"
        />
        <button onClick={createRecipe}>add</button>
      </div>
    </>
  );
};

export default HomePage;
