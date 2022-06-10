import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ImageCard from './ImageCard';
import sleepCat from "../assets/sleep.png"
import pawCat from "../assets/paw.png"
import useWindowPosition from '../hook/useWindowPosition';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down("md")]:{flexDirection:"column"}
    }
}));

function MaoCard() {
const classes = useStyles();
const checked = useWindowPosition("header");
  return (
    <div className={classes.root} id="mao-card">
        <ImageCard image = {sleepCat} title="What Is Mao?" description="Learn more effectively and let your brain relax to take in more info in 4 steps with MAO using the 'Feynman Study Method'. Choose what you want to learn, teach like you are explaining to someone, fill in your learning gaps, and repeat!" checked = {checked}/>
        <ImageCard image = {pawCat} title="Mao Creator" description="Mao is created by Lee Ji Yee, studying in the Diploma of Applied Artificial Intelligence during Year 2 Semester 1 for module Cloud Technologies(CTEC) submission with the aim on improving my React.JS skills." checked = {checked}/>
    </div>
  )
}

export default MaoCard;
