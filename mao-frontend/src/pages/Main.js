import React, {useRef,useEffect,useState} from 'react'
import { getUser, getToken, getID, setNotes } from "../service/AuthService"
import { makeStyles } from "@material-ui/core/styles";
import { testing }from "../assets/DaleChallEasyWordList.js";
import {daleChallFormula, daleChallGradeLevel} from "../assets/DaleChallFormula.js";
import Table from "react-bootstrap/Table"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import moment from "moment";


import axios from "axios";
const notesUrl = "http://localhost:3001/"
const idUrl = "http://localhost:3001/id"
// serialize payload to db
const qs = require("qs");

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
    fontFamily: "Nunito"
  },
  name: {
    display: "inline",
    color: "#F9C46A"
  },
  p: {
    color: "black",
    fontSize: "0.6em"
  },
  mainBox: {
    backgroundColor: "white",
    borderRadius: "10px",
    display: "flex",
    flexDirection:"column",
    justifyContent: "space-between",
    width: "380px"
  },
  mainInput: {
    height: "40px",
    borderRadius: "10px",
    border: "1px solid gray",
    fontSize: "18px",
    paddingLeft: "20px"
  },
  mainButton: {
    marginLeft: "10px",
    height: "40px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#001941",
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
  },
  text: {
    paddingTop: "10px",
    textAlign: "left"
  },
  splitScreen: {
    display: 'flex',
    flexDirection: 'row',
    width: "70%",
    },
    leftPane: {
        width: '50%',
    },
    rightPane: {
        width: '50%',
    },

    box: {
      padding: "20px",
      borderRadius: "5px",
      overflow: "scroll"
    },
    belowBox:{
      height: "220px",
      overflowY: "auto"
    },
    boxNote:{
      height:"100px",
      overflow: "scroll"
    },
    belowBoxNote:{
      height:"auto",
    },
    buttonBox:{
      marginBottom: "15px"
    },
    message:{
      marginBottom: "-25px"
    },
    col: {
      marginTop: "90px"
    },
    statsCol: {
      marginTop: "200px"
    }
}));

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'



const Main = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    value: "",
    show: ""
  });
  
  const [isListening, setIsListening] = useState(false)
  const [recording, isRecording] = useState(false)
  const [note, setNote] = useState(null)
  const [savedNotes, setSavedNotes] = useState([])
  const [wordCounter, setWordCounter] = useState(0)
  const [characterCounter, setCharacterCounter] = useState(0)
  const [sentenceCounter, setSentenceCounter] = useState(0)
  const [errorMessage, setErrorMessage] = useState(null)
  const [difficultWord, setDifficultWord] = useState(0)
  const [daleChall, setDaleChall] = useState("N/A")

  const handleChange = (e) => {
    setState({value: e.target.value})


    console.log(e.target.value)
    localStorage.setItem('topic', JSON.stringify(e.target.value));
  }

  const loadID = () => {
  
    const requestBody = {
      id: id,
    }  
    // alert(JSON.stringify(requestBody))
    axios.post(idUrl, 
    qs.stringify( requestBody )).then((response) => {
    })
    console.log("HIIIII", id)

    // alert("ID loaded~")
  }

  useEffect(() => { 
    loadID()
    // console.log("logging this here", id)
  }, [] )

  // const submit = () => {
  //   setState({show: state.value})
  // } 

  

  const user = getUser();
  const token = getToken();
  const id = getID();
  // console.log("ID is",id);
//   get username from user object, check if undefined or not
  const name = user !== "undefined" && user ? user.name : "";
  var date = moment().format("DD-MM-YYYY HH:mm:ss")
  
  

  let videoRef = useRef(null);
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({

        video: true
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  
  useEffect(() => {
    getVideo();
  }, [videoRef]);

  
  useEffect(() => {
    handleListen()
  }, [isListening])
  
  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')

      
      // }
  
        
      console.log(transcript)
     
      // wordCounter = transcript.split(" ").length

      // {wordCounter == 0 ? (
      //   setWordCounter(transcript.split(" ").length)
      // ) : (
      //   setWordCounter(savedNotes.split(" ").length)) 
      // )}
      setWordCounter(transcript.split(" ").length)
      setCharacterCounter(transcript.length)
      setSentenceCounter(transcript.split(".").length - 1)

      const string = transcript;
      const usingSplit = string.split(' ');
      console.log(usingSplit)
      var arrayLength = usingSplit.length;
      for (var i = 0; i < arrayLength; i++) {
          console.log(usingSplit[i]);
    //Do something
      }

      const difficultWords = usingSplit.filter(x => !testing.includes(x))
      console.log("Date", date)


      console.log( "Number of difficult words" + difficultWords.length )
      setDifficultWord(difficultWords.length)
      // console.log("filter??" + filterWords(transcript))

      if (transcript.split(".").length > 2) {
        console.log("Sentence is more than 2")
        setDaleChall(daleChallGradeLevel(daleChallFormula({word: transcript.split(" ").length, sentence: transcript.split(".").length, difficultWord: difficultWords.length})))
      }
      console.log(daleChallGradeLevel(daleChallFormula({word: transcript.split(" ").length, sentence: transcript.split(".").length, difficultWord: difficultWords.length})))
     
      // const results = testing.map((item) => {
      //   // return me values that appear inside my easy words
      //   return transcript.toLowerCase().includes(item.toLowerCase());
      // });
    
      // console.log(results);

      // const count1 = results.filter(value => value === true).length;
      // console.log("Number of true values", count1);
    
      // console.log(wordCounter)
      // console.log(transcript.length)
      
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
      
    }
  }

  // const filterWords = (str) => {
  //   return testing.some(word => str.includes(word));
  // }
  
  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note])
    setNote('')
    setWordCounter(0)
    setCharacterCounter(0)
    setSentenceCounter(0)
    setDaleChall("N/A")
    console.log(savedNotes)
    // console.log(setSavedNotes)

    // console.log("WORKING?", noteTopic)
    // let topic = {
    //   [noteTopic]: savedNotes
    // }

    // console.log("noteArray is!", noteArray)
    localStorage.setItem('myNotes', JSON.stringify(savedNotes));
    // localStorage.setItem('topic', JSON.stringify(topic));
    // localStorage.setItem("notes", savedNotes)
  }

  const submitNotes = () => {
    // loadID()
    for (var i in savedNotes) {
      const requestBody = {
        user_id: id,
        note: savedNotes[i], 
        topic:  JSON.parse(localStorage.getItem('topic')), 
        date: date,
      }  
      // alert(JSON.stringify(requestBody))
      axios.post(notesUrl, 
      qs.stringify( requestBody )).then((response) => {
      })
    }
      alert("Sucessful posting!")
  
  }



  return (

    
    <div className = {classes.root}>
      <Container>
      <Row>
        <Col className={classes.col}>
                <h1>Hi <span className = {classes.name}>{name}!
                <br></br>
                <p className = {classes.p}>Start teaching yourself! </p> 
                </span></h1>
                <div className = {classes.buttonBox}>
                  <input className = {classes.mainInput} placeholder="Topic/Concept" type="text" onChange={(e)=>handleChange(e)}/>
                  <input className = {classes.mainButton} type="submit" value="Continue" onClick={submitNotes}/>
                  {errorMessage && <p className="message">{errorMessage}</p>}
                  <br/>
                </div>

                <video ref={videoRef} className="container"></video>
        </Col>
        <Col className={classes.col}>
            <div className={classes.container}>
            <div className={classes.box}>
              <h2>Current Note</h2>
              {isListening ? <span>🛑🎙️</span> : <span>🎙️</span>}
              <button onClick={handleSaveNote} disabled={!note}>
                Save Note
              </button>
              <button onClick={() => setIsListening(prevState => !prevState)}>
                Start/Stop
              </button>
              <p className={classes.boxNote}>{note}</p>

            </div>
            <h2>Notes</h2>

            <div className={classes.belowBox}>
                {savedNotes.map(n => (
                  <p className={classes.belowBoxNote} key={n}>{n}</p>
                ))}
                </div>
            </div>
          </Col>
          <Col xs lg="2" className={classes.statsCol} >
            <Table responsive>
              <thead>
                <tr>
                  <th>Details</th>
                  <th>Stats</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Words</td>
                  <td>{wordCounter}</td>
                </tr>
                <tr>
                  <td>Characters</td>
                  <td>{characterCounter}</td>
                </tr>
                <tr>
                  <td>Sentences</td>
                  <td>{sentenceCounter}</td>
                </tr>
                <tr>
                  <td>Reading Level</td>
                  <td>{daleChall}</td>
                </tr>
              </tbody>
            </Table>
        
        </Col>
      </Row>
    </Container>
          
      
    </div>

   
    
  )
}

export default Main