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
    <Col>
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