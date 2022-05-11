import React, {useState} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const signUpUrl = "https://zex1cv7er9.execute-api.ap-southeast-1.amazonaws.com/prod/register"

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

const Signup = () => {
  const classes = useStyles();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  // message to show user 
  const [message, setMessage] = useState(null)

  const submitHandler = (event) => {
    event.preventDefault();
    if (username.trim() === "" || email.trim() === "" || password.trim() === "" || username.trim() === ""){
      setMessage("All fields are required");
      return;
    }
    // console.log("Submit is pressed!")
    setMessage(null);
    // contain header to provide API key
    const requestConfig = {
      headers: {
        "x-api-key": "LnKX8HRBva7IQRRTzRs4322HPUjjaVlM5gTJW7gj"
      }
    }
    const requestBody = {
      name: name,
      email: email,
      username: username,
      password: password

    }
    axios.post(signUpUrl, requestBody, requestConfig).then((response) => {
      // if sign up is successful,
      setMessage("Sign Up Successful")
    }).catch((error) => {
      // catch error
      if (error.response.status === 403){
        // set message to error message
        setMessage(error.response.message)
      } else {
        // else if server has error in backend
        setMessage("Backend server is not responding. Please try again later.")
      }
    })
  }


  return (
    <div className = {classes.root}>
      <div>
        <form onSubmit={submitHandler}>
          <h5>Sign Up</h5>
          Name: <input type="text" value={name} onChange = {event => setName(event.target.value)} /> <br/>
          Email: <input type="text" value={email} onChange = {event => setEmail(event.target.value)} /> <br/>
          Username: <input type="text" value={username} onChange = {event => setUsername(event.target.value)} /> <br/>
          Password: <input type="password" value={password} onChange = {event => setPassword(event.target.value)} /> <br/>
          <input type="submit" value="SignUp" />

        </form>
        {/* display message, execute display in p */}
        {message && <p className="message">{message}</p>}
      </div>

    </div>
  )
}

export default Signup