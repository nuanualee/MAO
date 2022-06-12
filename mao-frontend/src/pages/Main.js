import React, {useRef,useEffect,useState} from 'react'
import { getUser, getToken, getID, setNotes } from "../service/AuthService"
import { makeStyles } from "@material-ui/core/styles";
import { testing }from "../assets/DaleChallEasyWordList.js";
import {daleChallFormula, daleChallGradeLevel} from "../assets/DaleChallFormula.js";
import Table from "react-bootstrap/Table"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"


import axios from "axios";
const notesUrl = "https://zex1cv7er9.execute-api.ap-southeast-1.amazonaws.com/prod/notes"

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "95vh",
    textAlign: "center",
    fontFamily: "Nunito",
    overflow: "scroll"
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
      height: "350px",
      overflow: "scroll"
    },
    boxNote:{
      height:"100px",
      overflow: "scroll"
    },
    buttonBox:{
      marginBottom: "15px"
    },
    message:{
      marginBottom: "-25px"
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

  // const submit = () => {
  //   setState({show: state.value})
  // } 

  

  const user = getUser();
  const token = getToken();
  const id = getID();
  // console.log("ID is",id);
//   get username from user object, check if undefined or not
  const name = user !== "undefined" && user ? user.name : "";
  
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
    console.log(savedNotes)

     
    // console.log(setSavedNotes)

    // console.log("WORKING?", noteTopic)
    // let topic = {
    //   [noteTopic]: savedNotes
    // }

    // console.log("noteArray is!", noteArray)
    localStorage.setItem('myNotes', JSON.stringify(savedNotes));
    // localStorage.setItem('testingNotes', JSON.stringify(topic));
    // localStorage.setItem("notes", savedNotes)
  }

  const submitHandler = (event) => {
    let noteTopic = JSON.parse(localStorage.getItem('topic'))

    event.preventDefault();
    if (noteTopic.trim() === "" ){
      setErrorMessage("Topic required")
      return;
    }
    setErrorMessage(null)
    //  console.log("Login button clicked")
    const requestConfig = {
      headers: {
        "x-api-key": "LnKX8HRBva7IQRRTzRs4322HPUjjaVlM5gTJW7gj"
      }
    }
  
    const requestBody = {
      id: id,
      topic: noteTopic,
      notes: savedNotes
    }
    axios.post(notesUrl, requestBody, requestConfig).then((response) => {
      // set user session, get user item + token from response body
      setNotes(response.data.notes);

    }).catch((error) => {
      // if username or password is incorrect
      if (error.response.status === 401 || error.response.status === 403 ){
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Backend server is not responding. Please try again later.");
      }
    })
  }





  return (
    
    <div className = {classes.root}>
      <Container>
      <Row>
        <Col>
                <h1>Hi <span className = {classes.name}>{name}!
                <br></br>
                <p className = {classes.p}>Start teaching yourself! </p> 
                </span></h1>
                <div className = {classes.buttonBox}>
                  <input className = {classes.mainInput} placeholder="Topic/Concept" type="text" onChange={(e)=>handleChange(e)}/>
                  <input className = {classes.mainButton} type="submit" value="Continue" onClick={submitHandler}/>
                  {errorMessage && <p className="message">{errorMessage}</p>}
                  <br/>
                </div>

                <video ref={videoRef} className="container"></video>
        </Col>
        <Col>
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
                  <p className={classes.boxNote} key={n}>{n}</p>
                ))}
                </div>
            </div>
          </Col>
          <Col xs lg="2">
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