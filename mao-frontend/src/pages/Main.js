import React from 'react'
import { getUser, resetUserSession, getToken, getID } from "../service/AuthService"
import { makeStyles } from "@material-ui/core/styles";
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
  name: {
    display: "inline",
    color: "#F9C46A"
  },
  p: {
    color: "black",
    fontSize: "0.6em"
  },
  mainBox: {
    backgroundColor: "white",
    borderRadius: "10px",
    display: "flex",
    flexDirection:"column",
    justifyContent: "space-between",
    width: "380px"
  },
  mainInput: {
    height: "40px",
    borderRadius: "10px",
    border: "1px solid gray",
    fontSize: "18px",
    paddingLeft: "20px"
  },
  mainButton: {
    height: "50px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#001941",
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
  },
  text: {
    paddingTop: "10px",
    textAlign: "left"
  }
}));

const Main = () => {
  const classes = useStyles();

  const user = getUser();
  const token = getToken();
  const id = getID();
  console.log("ID is",id);
//   get username from user object, check if undefined or not
  const name = user !== "undefined" && user ? user.name : "";
  
  return (
    <div className = {classes.root}>
      <div className = {classes.mainBox}>
            <h1>Hi <span className = {classes.name}>{name}!
            <br></br>
            <p className = {classes.p}>Join a call.</p>
            </span></h1>
            <input className = {classes.mainInput} placeholder="Name: " type="text"  /> <br/>
            <input className = {classes.mainInput}  placeholder="ID to call: " type="text"  /> <br/>
            <input className = {classes.mainButton} type="submit" value="Continue" />
            <p className = {classes.text}>Anyone with access to your ID can join.</p>
      </div>
      
      
    </div>

    
    
  )
}

export default Main