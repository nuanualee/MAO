import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import background from "../assets/background.jpg"
import Header from '../components/Header';
import WhatIsMao from "../components/MaoCard"

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    overflow: 'hidden',
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className = {classes.root}>
      <Header />
      <WhatIsMao />
    </div>
  )
}

export default Home