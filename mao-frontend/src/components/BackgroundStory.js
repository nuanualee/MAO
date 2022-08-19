import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container, Col, Row } from "react-bootstrap"
import party from "../assets/party.png"

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: "Nunito",
    }, 
    container: {
        minHeight: "100vh",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
    },
    party: {
        height: "480px",
    },
}));

const BackgroundStory = () => {
  const classes = useStyles();

  return (
    <div className= {classes.root}> 
        <Container fluid className = {classes.container}>
            <Row style={{ marginLeft: "6%" }}>
                <Col md={{ span: 4, offset: 1  }} >
                    <h3>- 背景 Background Story</h3>
                </Col>
            </Row>

            <Row>
                <Col md={{ span: 3, offset: 1  }}>
                    <img src={party} alt="Logo" className={classes.party}/>
                </Col>
                <Col md={{ span: 5, offset: 1}} style={{ margin: "auto"}}>
                    <Row> 
                        <h3>Mao</h3> 
                    </Row>
                    <Row>
                        <h3>—</h3>
                    </Row>
                    <Row>
                        <h5>招き猫 The Lucky Cat is often a symbol of luck. It originated in Japan.
                            It is traditionally known as Maneki Neko, translating to beckoning cat.
                            I created this mascot for Mao so that it can bring good luck to anyone using Mao.
                            
                            </h5>
                    </Row>
                </Col>
            </Row>
        </Container>

    </div>
  )
}

export default BackgroundStory