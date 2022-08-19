import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Collapse } from "@material-ui/core";
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

const useStyles = makeStyles((theme) => ({
    title: {
        fontFamily: "Nunito"
    }
}));


export default function ImageCard(props, checked) {
  const classes = useStyles();
  return (
    <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
        <Card sx={{ maxWidth: 545, margin: "20px" }}>
        <CardMedia
            component="img"
            height="260"
            src={props.image}
            alt="Mao"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div" className={classes.title}>
                {props.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {props.description}
            </Typography>
        </CardContent>
        </Card>
      </Collapse>
    
  );
}


