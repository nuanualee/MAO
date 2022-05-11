import React from 'react'
import { Navigate , Route } from "react-router-dom";
import { getToken } from "../service/AuthService"

const PrivateRoute = ({component: Component, ...rest}) => {
  return (
    <Route
    {...rest}
    render = {props => {
        // if token exist
        return getToken() ? <Component {...props} />
        // else if it does not, redirect to login page
        : <Navigate to = "/login" />
    }}
    />
  )
}

export default PrivateRoute;