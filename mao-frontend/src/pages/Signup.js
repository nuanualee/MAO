import React, {useState} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const signUpUrl = "https://zex1cv7er9.execute-api.ap-southeast-1.amazonaws.com/prod/register"

const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: '100vh',
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f0f2f5",
      height: "100vh",
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
      backgroundColor: "white",
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

const Signup = () => {
  const classes = useStyles();
  const navigate = useNavigate()

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
      navigate("/login");
      
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
        <div>
            <div className = {classes.loginWrapper}>
              <div className = {classes.login}>
                <h1 className ={classes.loginLogo}>MAO</h1>
                <span className ={classes.loginDesc}>Connect with people with MAO.</span>
              </div>

              <div className = {classes.login}>
                  <div className = {classes.loginBox}>
                  <input className = {classes.loginInput} placeholder="Name: " type="text" value={name} onChange = {event => setName(event.target.value)} /> <br/>
                 <input className = {classes.loginInput}  placeholder="Email: " type="text" value={email} onChange = {event => setEmail(event.target.value)} /> <br/>
                <input className = {classes.loginInput} placeholder="Username: " type="text" value={username} onChange = {event => setUsername(event.target.value)} /> <br/>
                <input className = {classes.loginInput} placeholder="Password: " type="password" value={password} onChange = {event => setPassword(event.target.value)} /> <br/>
                    <input className = {classes.loginButton} type="submit" value="Sign Up" />
                  </div>
                </div>
            </div>

           


          </div>

          

        </form>
        {/* display message, execute display in p */}
        {message && <p className="message">{message}</p>}
      </div>

    </div>
  )
}

export default Signup