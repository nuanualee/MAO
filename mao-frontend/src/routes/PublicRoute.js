import React from 'react'
import { Navigate , Route } from "react-router-dom";
import { getToken } from "../service/AuthService"

const PublicRoute = ({component: Component, ...rest}) => {
  return (
    <Route
    {...rest}
    render = {props => {
        // if token does not exist
        return !getToken() ? <Component {...props} />
        // else direct to main page where logged in users can access
        : <Navigate  to = "/main" />
    }}
    />
  )
}

export default PublicRoute;