import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Container, Col, Row } from "react-bootstrap"
import DirectionCard from './DirectionCard';
import direction1 from "../assets/direction1.png"
import direction2 from "../assets/direction2.png"
import direction3 from "../assets/direction3.png"
import direction4 from "../assets/direction4.png"


const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
    },

}));

const AboutCard = () => {
  const classes = useStyles();

  return (
    <div>
        <DirectionCard 
            image = {direction1} 
            color = "#d4452c" 
            kanji = "いち" 
            step="STEP ONE" 
            description = "Choose your topic and start studying. The topic can be anything you would like to learn."
        />

        <DirectionCard 
            image = {direction2} 
            color = "#7eb6fb" 
            kanji = "にの" 
            step="STEP TWO" 
            description = "Teach the topic to someone else. Mao stimulates Step 2 by using your webcam, so you can see your face to teach yourself virtually to learn, to gain confidence and even make you a better presenter."
        />

        <DirectionCard 
            image = {direction3} 
            color = "#10a365" 
            kanji = "さん" 
            step="STEP THREE" 
            description = "Step 3 involves going back to studying, but with an intense focus on your studying gaps. The aim of step 3 is to remove these weaknesses and turn them into areas of strength."
        />

        <DirectionCard 
            image = {direction4} 
            color = "#9e51f7" 
            kanji = "よん" 
            step="STEP FOUR" 
            description = "Ideally, you've already made great progress in understanding the subject you've chosen. However, you're not done yet. Now you must simplify the subject. Mao integration of the Dale-Chall Readability method works well at assisting you in gaining a comprehensive understanding of how you are explaining the topic. When you attempt to do this, you are compelled to comprehend the information and how they work together."
        />       
        
    </div>
  )
}

export default AboutCard