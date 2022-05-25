import React, {useRef,useEffect,useState} from 'react'
import { getUser, resetUserSession, getToken, getID } from "../service/AuthService"
import { makeStyles } from "@material-ui/core/styles";



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

  const user = getUser();
  const token = getToken();
  const id = getID();
  console.log("ID is",id);
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

  const [isListening, setIsListening] = useState(false)
  const [recording, isRecording] = useState(false)
  const [note, setNote] = useState(null)
  const [savedNotes, setSavedNotes] = useState([])
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
      console.log(transcript)
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note])
    setNote('')
  }





  return (
  
    <div className = {classes.root}>
      <div className = {classes.splitScreen}>
        <div className={classes.leftPane}>
          
            <h1>Hi <span className = {classes.name}>{name}!
            <br></br>
            <p className = {classes.p}>Start teaching yourself!</p>
            </span></h1>
            <input className = {classes.mainInput} placeholder="Topic/Concept" type="text"  /><input className = {classes.mainButton} type="submit" value="Continue" /> <br/>

            <video ref={videoRef} className="container"></video>
           
        </div>
        <div className={classes.rightPane}>
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
        </div>
           
      </div>
      
    </div>
   
    
  )
}

export default Main