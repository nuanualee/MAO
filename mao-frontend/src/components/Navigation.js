import React from 'react'
import { Nav, Navbar, Container, Button } from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"
import { AppBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getUser, resetUserSession } from '../service/AuthService';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  icon: {
      height: "80px",
  },
  appbar: {
    background: "none",
  },  
}));

const getToken = sessionStorage.getItem("token")
console.log(getToken)

const Navigation = () => {
  const classes = useStyles();
  const navigate = useNavigate()
  const user = getUser();
  const name = user !== "undefined" && user ? user.name : "";
  console.log("Name",name)

  const logoutHandler = () => {
    resetUserSession();
    navigate("/login")
    
  }
  return (
  <AppBar className = {classes.appbar} elevation = {0}>
    <Navbar style={{backgroundColor: "transparent"}} variant="light" expand="lg">
    <Container >

      <LinkContainer to = "/">
        <Navbar.Brand><img src={require("../assets/mao.png")} className={classes.icon}></img></Navbar.Brand>
      </LinkContainer>
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
  

        <Nav className="me-auto">
          {!user && (
            <>
              <LinkContainer to = "/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to = "/signup">
                <Nav.Link>Sign Up</Nav.Link>
              </LinkContainer>
            </> 
          )}

          {user && (
            <>
              <LinkContainer to = "/main">
                <Nav.Link>Connect Now</Nav.Link>
              </LinkContainer>
              <Nav className="me-auto">
                <Nav.Link onClick={logoutHandler}>Sign Out</Nav.Link>
              </Nav>
            </>
          )}
        </Nav>
      
      </Navbar.Collapse>
    </Container>
  </Navbar>
</AppBar>
  )
}

export default Navigation