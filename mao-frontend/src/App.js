import React, { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Main from "./pages/Main"
import MyNotes from "./pages/MyNotes"
import About from "./pages/About"
import { getUser, getToken, setUserSession, resetUserSession } from "./service/AuthService";
import axios from "axios"
// import PublicRoute from "./routes/PublicRoute"
// import PrivateRoute from "./routes/PrivateRoute"




function App() {

  const [isAuthenticating, setAuthenticating] = useState(true);
  const verifyTokenAPIUrl = "https://zex1cv7er9.execute-api.ap-southeast-1.amazonaws.com/prod/verify"

  useEffect(() => {
    // check if token exists
    const token = getToken()
    if (token === "undefined" || token === undefined || token === null || !token) {
      return;
    }

    // otherwise, call api to verify if token is valid
    const requestConfig = {
      headers: {
        "x-api-key": "LnKX8HRBva7IQRRTzRs4322HPUjjaVlM5gTJW7gj"
      }
    }
    const requestBody = {
      user: getUser(),
      token: token
    }

    axios.post(verifyTokenAPIUrl, requestBody, requestConfig).then(response => {
      setUserSession(response.data.user, response.data.token);
      setAuthenticating(false);
    }).catch(()=>{
      resetUserSession();
      setAuthenticating(false);

    })
  
  }, []);

  const token = getToken();
  if (isAuthenticating && token){
    // if it is authenticating and a token is available
    return <div className = "content">Authenticating</div>
  }




  return <div>
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/main" element={<Main/>} />
        <Route path="/mynotes" element={<MyNotes/>} />
        <Route path="/about" element={<About/>} />

      </Routes>

    </BrowserRouter>
  </div>;

}

export default App;
