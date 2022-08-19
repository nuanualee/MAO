import React from 'react'
import { Container, Col, Row } from "react-bootstrap"
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: "Nunito",
    }, 
    direction: {
        height: "400px",
    },
    font: {
        color: "000"
    }
    
    
}));

export default function DirectionCard(props) {
    const classes = useStyles();

    return (
      <div className={classes.root}>
  
         
          <br />
  
          <Row className="justify-content-md-center" style={{backgroundColor: "#eef0f4"}}>
              <Col xs lg="4">
                  <img src={props.image} alt="Logo" className={classes.direction}/>
                  
              </Col>
              <Col xs lg="4" style={{ marginTop: "auto", marginBottom: "auto"}}>
                 <div style={{color: props.color, display: "flex", alignItems: "center",}}>
                      <h1>{props.kanji}</h1>
                      <span>{props.step}</span>
                 </div>
  
                  <p>{props.description}</p>
                
              </Col>
          </Row>
          <br />
      </div>
      
    );
}