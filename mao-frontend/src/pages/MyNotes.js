import React, { useRef, useEffect, useState } from "react";
import { getUser, getID } from "../service/AuthService";
import { makeStyles } from "@material-ui/core/styles";
import { experimentalStyled as styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { IconButton} from "@material-ui/core";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import axios from "axios";
const getNotesUrl = "http://teammao.com/notes";
const pollyUrl = "https://c5cvo7d271.execute-api.ap-southeast-1.amazonaws.com/default/polly"

// serialize payload to db
const qs = require("qs");

// var groupBy = require('lodash.groupby');
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
    fontFamily: "Nunito",
  },
  text: {
    color: "grey"
  }
}));

const MyNotes = () => {
  const classes = useStyles();

  const [notes, setNotes] = useState([]);
  const [clickedTopic, setClickedTopic] = useState();
  const [topicNotes, setTopicNotes] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenVoice = () => setOpen(true);
  const handleCloseVoice = () => setOpen(false);

  const id = getID();

  const loadNotes = () => {
    const requestBody = {
      user_id: id,
    };
    // alert(JSON.stringify(requestBody))
    axios.post(getNotesUrl, qs.stringify(requestBody)).then((response) => {
      // console.log(response.data);
      setNotes(response.data);
    });

    // const submitHandler = (event) => {
    //   event.preventDefault();
    //   const requestConfig = {
    //     headers: {
    //       "x-api-key": "LnKX8HRBva7IQRRTzRs4322HPUjjaVlM5gTJW7gj"
    //     }
    //   }
    //   // const requestBody = {
    //   //   username: 
    //   // }
    //   axios.post(loginUrl, requestBody, requestConfig).then((response) => {
    //     // set user session, get user item + token from response body
    //     setUserSession(response.data.user, response.data.token);
    //     // direct user to main page
    //     navigate("/main");
    //   }).catch((error) => {
    //     // if username or password is incorrect
    //     // if (error.response.status === 401 || error.response.status === 403 ){
    //     //   setErrorMessage(error.response.data.message);
    //     // } else {
    //     //   setErrorMessage("Backend server is not responding. Please try again later.");
    //     // }
    //   })
    // }

  };


  useEffect(() => {
    loadNotes();
    // console.log("logging this here", id)
  }, []);

  var groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  var groupedByTopic = groupBy(notes, "topic");
  var topic = Object.keys(groupedByTopic);

  // for(var i=0;i<topic.length;i++){
  //   // console.log(topic[i]);//will give all the elements
  //   // console.log("INDEX: " + topic[i])
  //   var grouped = groupedByTopic[topic[i]]
  //   console.log(topic[i],grouped)

  // }
  const handler = function (e) {
    var topic = e.target.getAttribute("data-index");
    setClickedTopic(topic);
    console.log("topic", topic);
    const grouped = groupedByTopic[topic];

    console.log("Clicked topic: " + JSON.stringify(grouped));
    setTopicNotes(grouped);
  };

  // console.log("testing...", groupedByTopic["haha"])

  const actions = [
    { icon: <DeleteIcon />, name: 'Delete Topic: "' + clickedTopic + '"' },
  ];


  const deleteTopic = () => {
    //  axios({
    //   method: 'DELETE',
    //   url: deleteUrl,
    //   data: {
    //     topic: clickedTopic
    //   }
    // })
    // axios({
    //   method: 'DELETE',
    //   url: "https://teammao.com/delete",
    //   data: {
    //     topic: clickedTopic,
    //   }
    // })

    // // alert(clickedTopic)
    //   const requestBody = {
    //     topic: clickedTopic,
    //   }
    // //   // alert(JSON.stringify(requestBody))

    //   axios.delete(deleteUrl, {data: qs.stringify( requestBody )}).then((response) => {
    //   })

    axios.delete(`https://teammao.com/delete/${clickedTopic}`, {
      data: { topic: clickedTopic },
    });

    alert("Sucessful deletion!");
    console.log(clickedTopic);
    window.setInterval("window.location.reload(false);", 1000);
  };


  function speakTopicNote(value) {
    // alert(value.note);
    const text = value.note;

    const textEncode = encodeURIComponent(text);
    // axios.post(`getNotesUrl`, { equation: test })
    const pollyUrlText = pollyUrl+"?voice=Matthew&text="+textEncode
    // alert(pollyUrlText)
    
    console.log(pollyUrlText)
    let audio = new Audio(pollyUrlText)
    audio.play()
    // const requestBody = {
    //   text: text,
    // }
    // axios.post(pollyUrl, requestBody, requestConfig).then((response) => {
    //   alert("MEI YOU BA BE QUE")
      
    // })   
  }
  
  return (
    <div className={classes.root}>
       
        <><Grid container spacing={2}>
          <Grid item xs={12}>
            <h2>Topic: {clickedTopic}</h2>
          </Grid>

          <Grid
            justifyContent="center"
            alignItems="center"
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >

            {topic.map((value) => (
              <Grid item key={value}>
                
                <Item data-index={value} onClick={handler}>
                  {value}
                </Item>
              </Grid>
            ))}
          </Grid>

          <Grid item xs={12}>

            <Box
              sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}
              style={{
                overflowY: "scroll",
                maxHeight: "406px",
              }}
            >
              {topicNotes.map((value, index) => (
                
                <StyledPaper sx={{ my: 1, mx: "auto", p: 2 }}>
                  <Grid container spacing={2}>
                    
                    <Grid item>
                      <Avatar
                        style={{
                          backgroundColor: "#F9C46A",
                        }}
                      >
                        {index + 1}
                      </Avatar>
                      
                    </Grid>
                  <Grid item xs>
                      
                    
                    <Typography>{value.note}</Typography>
                      <br/>
                      
                      <p className={classes.text}>{value.date}</p>

                      <IconButton >
                        <RecordVoiceOverIcon onClick={() => speakTopicNote(value)}/>
                      </IconButton>
                    </Grid>
                  </Grid>
                </StyledPaper>
              ))}
            </Box>
          </Grid>


          <Box sx={{ height: 440, transform: "translateZ(0px)", flexGrow: 1 }}>
            <Backdrop open={open} />
            <SpeedDial
              ariaLabel="SpeedDial tooltip"
              sx={{ position: "absolute", bottom: -16, right: 16 }}
              icon={<SpeedDialIcon />}
              onClose={handleClose}
              onOpen={handleOpen}
              open={open}
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  tooltipOpen
                  onClick={deleteTopic}
                />
              ))}
            </SpeedDial>


          </Box>
        </Grid>

        <div></div> 
      </> 
      

      {/* {groupedByTopic[1].map((value) => {
      return <h1 key={value.id}>
        
        Topic: {value.topic}  | 
        Notes: {value.note}
        </h1> 
    })} */}
    </div>
  );
};

export default MyNotes;
