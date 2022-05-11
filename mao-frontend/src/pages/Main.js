import React from 'react'
import { getUser, resetUserSession } from "../service/AuthService"

const Main = () => {
  const user = getUser();
//   get username from user object, check if undefined or not
  const name = user !== "undefined" && user ? user.name : "";

  
  return (
    <div>Hello {name} . You have logged in!</div>
  )
}

export default Main