import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Header from "../components/Header.js"
import WhatIsMao from "./MaoCard.js"
import maoCat from "../assets/background.jpg"


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${maoCat})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));

function Navigation() {
const classes = useStyles();
  return (

    <div className = {classes.root}>
        <CssBaseline />
        <Header />
        <WhatIsMao />

    </div>
  )
}

export default Navigation