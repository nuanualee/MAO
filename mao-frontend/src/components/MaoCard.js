import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ImageCard from './ImageCard';
import myCat from "../assets/mao.png"
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
        <ImageCard image = {myCat} title="Hi" description="yoyooyoyoyo" checked = {checked}/>
        <ImageCard image = {myCat} title="Hi" description="yoyooyoyoyo" checked = {checked}/>
    </div>
  )
}

export default MaoCard;
