import { Route } from "react-router-dom"
import React from "react"
import { withRouter } from "react-router-dom"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"
import Register from "./auth/Register"
import Login from "./auth/Login"
import HomePage from "./home/HomePage"
import RecipeForm from './recipe/RecipeForm'



const ApplicationViews = () => {
    const { isAuthenticated } = useSimpleAuth()

    return (
        <React.Fragment>

            <Route
                exact path="/" render={props => {
                    return <HomePage {...props} />
                }}
            />

            <Route
                path="/register" render={props => {
                    return <Register {...props} />
                }}
            />

            <Route
                path="/login" render={props => {
                    return <Login {...props} />
                }}
            />

            <Route
                path="/recipe/:recipeId(\d+)"
                render={props => {
                    return <RecipeForm {...props} />
                }}
            />


        </React.Fragment>
    )
}

export default withRouter(ApplicationViews)