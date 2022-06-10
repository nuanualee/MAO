import React, {useState} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { setUserSession } from "../service/AuthService"
import { useNavigate } from 'react-router-dom';
import { borderRadius } from '@mui/system';

const loginUrl = "https://zex1cv7er9.execute-api.ap-southeast-1.amazonaws.com/prod/login"

const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: '100vh',
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f0f2f5",
      textAlign: "center",
      fontFamily: "Nunito"
    },
    loginWrapper: {
      height: "70%",
      display: "flex"
    },

    login: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },

    loginLogo: {
      fontSize: "50px",
      fontWeight: "bold",
      color: "#F9C46A",
      marginBottom: "10px"
    },
    loginDesc: {
      fontSize: "24px"
    },
    loginBox: {
      height: "300px",
      padding: "20px",
      backgroundColor: "#fff",
      borderRadius: "10px",
      display: "flex",
      flexDirection:"column",
      justifyContent: "space-between",
    },
    loginInput: {
      height: "50px",
      borderRadius: "10px",
      border: "1px solid gray",
      fontSize: "18px",
      paddingLeft: "20px"
    },
    loginButton: {
      height: "50px",
      borderRadius: "10px",
      border: "none",
      backgroundColor: "#F9C46A",
      color: "white",
      fontSize: "20px",
      fontWeight: "bold",

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
        <form onSubmit= {submitHandler}>
          <div>
            <div className = {classes.loginWrapper}>
              <div className = {classes.login}>
                <h1 className ={classes.loginLogo}>MAO</h1>
                <span className ={classes.loginDesc}>Connect with people with MAO.</span>
              </div>

              <div className = {classes.login}>
                  <div className = {classes.loginBox}>
                    <input className = {classes.loginInput} placeholder = "Username: " type="text" value={username} onChange = {event => setUsername(event.target.value)} /> <br/>
                    <input className = {classes.loginInput} placeholder = "Password: " type="password" value={password} onChange = {event => setPassword(event.target.value)} /> <br/>
                    <input className = {classes.loginButton} type="submit" value="Login" />
                  </div>
                </div>
            </div>

          </div>

          

        </form>
        {/* display message, execute display in p */}
        {errorMessage && <p className="message">{errorMessage}</p>}
      </div>

    </div>
  )
}

export default Login;