import React, {useState} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { setUserSession } from "../service/AuthService"
import { useNavigate } from 'react-router-dom';


const loginUrl = "https://zex1cv7er9.execute-api.ap-southeast-1.amazonaws.com/prod/login"

const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: '100vh',
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      textAlign: "center",
      fontFamily: "Nunito"
    },
  }));

const Login = (props) => {
  const classes = useStyles();
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
 // error to show user 
 const [errorMessage, setErrorMessage] = useState(null)

 const submitHandler = (event) => {
   event.preventDefault();
   if (username.trim() === "" || password.trim() === ""){
     setErrorMessage("Both username and password are required")
     return;
   }
   setErrorMessage(null)
  //  console.log("Login button clicked")
  const requestConfig = {
    headers: {
      "x-api-key": "LnKX8HRBva7IQRRTzRs4322HPUjjaVlM5gTJW7gj"
    }
  }
  const requestBody = {
    username: username,
    password: password
  }
  axios.post(loginUrl, requestBody, requestConfig).then((response) => {
    // set user session, get user item + token from response body
    setUserSession(response.data.user, response.data.token);
    // direct user to main page
    navigate("/main");
  }).catch((error) => {
    // if username or password is incorrect
    if (error.response.status === 401 || error.response.status === 403 ){
      setErrorMessage(error.response.data.message);
    } else {
      setErrorMessage("Backend server is not responding. Please try again later.");
    }
  })
 }

  return (
    <div className = {classes.root}>
       <div>
        <form onSubmit={submitHandler}>
          <h5>Log In</h5>
          Username: <input type="text" value={username} onChange = {event => setUsername(event.target.value)} /> <br/>
          Password: <input type="password" value={password} onChange = {event => setPassword(event.target.value)} /> <br/>
          <input type="submit" value="Login" />

        </form>
        {/* display message, execute display in p */}
        {errorMessage && <p className="message">{errorMessage}</p>}
      </div>

    </div>
  )
}

export default Login;