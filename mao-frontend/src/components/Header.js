import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, IconButton, Toolbar, Collapse } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll'
import {Nav, Navbar, Container, Button} from "react-bootstrap"

const useStyles = makeStyles((theme) => ({
    root:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        fontFamily: "Nunito"

    },
    appbar: {
        background: "none",
    },
    icon: {
        height: "80px",
    },
    colorText: {
        color: "#F9C46A",
        justifyContent: "center",
    },
    normalText: {
        color: "#000"
    },
    container: {
        justifyContent: "center"
    },
    goDown: {
        color: "#000",
        fontSize: "2em"
    }
}));

function Header() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
      setChecked(true);
  }, []);
  return (
    <div className={classes.root} id="header">

      <Collapse in={checked}
        //   delay animation for 1 second and afterwards do the collapse
      {... (checked ? { timeout: 1000} : {})}
      collapsedHeight = {40}
      >
        <div className={classes.container}>
            <h1 className={classes.normalText}>Start learning with <br />
            <span className={classes.colorText}>MAO!</span></h1>
            

            <Scroll to="mao-card" smooth={true}>
                <IconButton>
                    <ExpandMoreIcon className={classes.goDown}/> 
                </IconButton>
            </Scroll>
        </div>
      </Collapse>
    </div>
    
  );
}
export default Header;
