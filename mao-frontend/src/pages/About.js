import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Typewriter } from 'react-simple-typewriter'
import logo from "../assets/lineless.png"
import BackgroundStory from "../components/BackgroundStory"
import AboutCard from "../components/AboutCard"
import { Container, Col, Row } from "react-bootstrap"


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        backgroundColor: "#a9c2ec",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        fontFamily: "Nunito",
        position: "relative",
    }, 
    mini: {
        height: "300px",
    },

    h2: {
        color: "#fff",
    }
    
}));


const About = () => {
  const classes = useStyles();

  return (
    <div >
        <Container fluid className = {classes.root}>
            <Row className="justify-content-md-center">
                <Col>
                    <h1 className = {classes.h2}>MAO</h1>
                    <img src={logo} alt="Logo" className={classes.mini}/>
                </Col>
            </Row>
        </Container>
        
        
    <BackgroundStory />
    <Col md={{ span: 4, offset: 1  }} >
        <h3>- Introduction</h3>
    </Col>

            
    <AboutCard />
        
    </div>
  )
}

export default About