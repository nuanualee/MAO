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
        <ImageCard image = {sleepCat} title="What Is Mao?" description="Sit back and relax as Mao allows you to stay connected with people with a simple click. Join with an invited ID and get the ball rolling. Audio transcription is available as well." checked = {checked}/>
        <ImageCard image = {pawCat} title="Mao Creator" description="Mao is created by Lee Ji Yee, studying in the Diploma of Applied Artificial Intelligence during Semester 1 of Year 2 with the aim on improving my React.JS skills." checked = {checked}/>
    </div>
  )
}

export default MaoCard;
