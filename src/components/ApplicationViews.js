import { Route } from "react-router-dom"
import React, { useState, useEffect } from "react"
import { withRouter, Redirect } from "react-router-dom"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"
import Register from "./auth/Register"
import Login from "./auth/Login"
import HomePage from "./home/HomePage"



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


        </React.Fragment>
    )
}

export default withRouter(ApplicationViews)