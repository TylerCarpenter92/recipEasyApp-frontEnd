import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import moment from "moment";

const MealPlan = props => {
  const [mealPlan, setMealPlan] = useState([]);
  const [dayOfWeek, setDayOfWeek] = useState(null);
  let week = moment().week();
  let date = moment()
    .week(week)
    .day(dayOfWeek);
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

  const getMeaPlan = () => {
    fetch(`http://localhost:8000/mealplannings?week_number=${week}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      }
    })
      .then(response => response.json())
      .then(response => {
        setMealPlan(response);
      });
  };

  const removeMeaPlan = id => {
    fetch(`http://localhost:8000/mealplannings/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      }
    })
    .then(getMeaPlan)
}

  const addMeaPlan = id => {
    fetch(`http://localhost:8000/mealplannings`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        recipe_id: id,
        year: date.day(dayOfWeek).year(),
        month: date.day(dayOfWeek).month() + 1,
        day: date.day(dayOfWeek).date(),
        week: week
      })
    }).then(response => {
      setDayOfWeek(null);
      getMeaPlan();
      console.log("in post");
    });
  };

  useEffect(() => {
    getMeaPlan();
    getMyRecipes();
  }, []);

  console.log(mealPlan);

  return (
    <>
      <h1>Meal Planning for the week</h1>

      <Container>
        <Row>
          <Col>
            <>
              <h5>Sunday</h5>
              <p>
                {moment()
                  .week(week)
                  .day(0)
                  .date()}
                /
                {moment()
                  .week(week)
                  .day(0)
                  .month() + 1}
                /
                {moment()
                  .week(week)
                  .day(0)
                  .year()}
              </p>
              {mealPlan.length > 0 ? (
                mealPlan.map(meal => {
                    if(meal.weekday === "Sunday")
                    {
                  return (
                    <Card style={{ width: "8rem" }} key={meal.id}>
                      <Card.Body>
                        <Card.Title>{meal.recipe.name}</Card.Title>
                        <Button
                          variant="primary"
                          onClick={() =>
                            props.history.push(`/recipe/${meal.recipe.id}`)
                          }
                        >
                          Details
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() =>
                            removeMeaPlan(meal.id)

                          }
                        >
                          Remove
                        </Button>
                      </Card.Body>
                    </Card>
                  );
                        }
                        

                })
              ) : (
                <h3>you have no recipes</h3>
              )}
              <Button
                variant="success"
                size="sm"
                onClick={() => {
                  setDayOfWeek(0);
                }}
              >
                add recipe
              </Button>
            </>
          </Col>
          <Col id="monday">
            <>
              <h5>Monday</h5>
              {mealPlan.length > 0 ? (
                mealPlan.map(meal => {
                    if(meal.weekday === "Monday")
                    {
                  return (
                    <Card style={{ width: "8rem" }} key={meal.id}>
                      <Card.Body>
                        <Card.Title>{meal.recipe.name}</Card.Title>
                        <Button
                          variant="primary"
                          onClick={() =>
                            props.history.push(`/recipe/${meal.recipe.id}`)
                          }
                        >
                          Details
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() =>
                            removeMeaPlan(meal.id)

                          }
                        >
                          Remove
                        </Button>
                      </Card.Body>
                    </Card>
                  );
                        }
                })
              ) : (
                <h3>you have no recipes</h3>
              )}
              <Button
                variant="success"
                size="sm"
                onClick={() => {
                  setDayOfWeek(1);
                }}
              >
                add recipe
              </Button>
            </>
          </Col>
          <Col id="tuesday">
            <>
              <h5>Tuesday</h5>
              {mealPlan.length > 0 ? (
                mealPlan.map(meal => {
                    if(meal.weekday === "Tuesday")
                    {
                  return (
                    <Card style={{ width: "8rem" }} key={meal.id}>
                      <Card.Body>
                        <Card.Title>{meal.recipe.name}</Card.Title>
                        <Button
                          variant="primary"
                          onClick={() =>
                            props.history.push(`/recipe/${meal.recipe.id}`)
                          }
                        >
                          Details
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() =>
                            removeMeaPlan(meal.id)

                          }
                        >
                          Remove
                        </Button>
                      </Card.Body>
                    </Card>
                  );
                        }
                })
              ) : (
                <h3>you have no recipes</h3>
              )}
              <Button
                variant="success"
                size="sm"
                onClick={() => {
                  setDayOfWeek(2);
                }}
              >
                add recipe
              </Button>
            </>
          </Col>
          <Col id="wednesday">
            <>
              <h5>Wednesday</h5>
              {mealPlan.length > 0 ? (
                mealPlan.map(meal => {
                    if(meal.weekday === "Wednesday")
                    {
                  return (
                    <Card style={{ width: "8rem" }} key={meal.id}>
                      <Card.Body>
                        <Card.Title>{meal.recipe.name}</Card.Title>
                        <Button
                          variant="primary"
                          onClick={() =>
                            props.history.push(`/recipe/${meal.recipe.id}`)
                          }
                        >
                          Details
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() =>
                            removeMeaPlan(meal.id)

                          }
                        >
                          Remove
                        </Button>
                      </Card.Body>
                    </Card>
                  );
                        }
                })
              ) : (
                <h3>you have no recipes</h3>
              )}
              <Button
                variant="success"
                size="sm"
                onClick={() => {
                  setDayOfWeek(3);
                }}
              >
                add recipe
              </Button>
            </>
          </Col>
          <Col id="Thursday">
            <>
              <h5>Thursday</h5>
              {mealPlan.length > 0 ? (
                mealPlan.map(meal => {
                    if(meal.weekday === "Thursday")
                    {
                  return (
                    <Card style={{ width: "8rem" }} key={meal.id}>
                      <Card.Body>
                        <Card.Title>{meal.recipe.name}</Card.Title>
                        <Button
                          variant="primary"
                          onClick={() =>
                            props.history.push(`/recipe/${meal.recipe.id}`)
                          }
                        >
                          Details
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() =>
                            removeMeaPlan(meal.id)

                          }
                        >
                          Remove
                        </Button>
                      </Card.Body>
                    </Card>
                  );
                        }
                })
              ) : (
                <h3>you have no recipes</h3>
              )}
              <Button
                variant="success"
                size="sm"
                onClick={() => {
                  setDayOfWeek(4);
                }}
              >
                add recipe
              </Button>
            </>
          </Col>
          <Col>
            <>
              <h5>Friday</h5>
              {mealPlan.length > 0 ? (
                mealPlan.map(meal => {
                    if(meal.weekday === "Friday")
                    {
                  return (
                    <Card style={{ width: "8rem" }} key={meal.id}>
                      <Card.Body>
                        <Card.Title>{meal.recipe.name}</Card.Title>
                        <Button
                          variant="primary"
                          onClick={() =>
                            props.history.push(`/recipe/${meal.recipe.id}`)
                          }
                        >
                          Details
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() =>
                            removeMeaPlan(meal.id)

                          }
                        >
                          Remove
                        </Button>
                      </Card.Body>
                    </Card>
                  );
                        }
                })
              ) : (
                <h3>you have no recipes</h3>
              )}
              <Button
                variant="success"
                size="sm"
                onClick={() => {
                  setDayOfWeek(5);
                }}
              >
                add recipe
              </Button>
            </>
          </Col>
          <Col>
            <>
              <h5>Saturday</h5>
              {mealPlan.length > 0 ? (
                mealPlan.map(meal => {
                    if(meal.weekday === "Saturday")
                    {
                  return (
                    <Card style={{ width: "8rem" }} key={meal.id}>
                      <Card.Body>
                        <Card.Title>{meal.recipe.name}</Card.Title>
                        <Button
                          variant="primary"
                          onClick={() =>
                            props.history.push(`/recipe/${meal.recipe.id}`)
                          }
                        >
                          Details
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() =>
                            removeMeaPlan(meal.id)

                          }
                        >
                          Remove
                        </Button>
                      </Card.Body>
                    </Card>
                  );
                        }
                })
              ) : (
                <h3>you have no recipes</h3>
              )}
              <Button
                variant="success"
                size="sm"
                onClick={() => {
                  setDayOfWeek(6);
                }}
              >
                add recipe
              </Button>
            </>
          </Col>
        </Row>
      </Container>

      {dayOfWeek != null
        ? myRecipes.map(recipe => {
            return (
              <Card style={{ width: "10rem" }} key={recipe.id}>
                <Card.Body>
                  <Card.Title>{recipe.name}</Card.Title>
                  <Button
                    variant="primary"
                    onClick={() => addMeaPlan(recipe.id)}
                  >
                    select
                  </Button>
                </Card.Body>
              </Card>
            );
          })
        : ""}
    </>
  );
};

export default MealPlan;
