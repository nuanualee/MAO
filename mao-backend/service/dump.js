const AWS = require("aws-sdk");
AWS.config.update({
    // update region'
    region: "ap-southeast-1"
})

// declare no sql db client
const util = require("../utils/util");

const dynamodb= new AWS.DynamoDB.DocumentClient();
const noteTable = "mao-notes";

async function notes(notesInfo) {
  const id = notesInfo.id;
  const topic = notesInfo.topic;
  const notes = notesInfo.notes;
 
  
  const note = {
    id: id,
    topic: topic,
    notes: notes,
  }

  // save to database
  const saveNoteResponse = await saveNote(note);
  if (!saveNoteResponse) {
    return util.buildResponse(503, { message: 'Server Error. Please try again later.'});
  }

  

  // successful register user
  return util.buildResponse(200, { id: id });
}

async function saveNote(note) {
  const params = {
    TableName: noteTable,
    Item: note
  }
  return await dynamodb.put(params).promise().then(() => {
    return true;
  }, error => {
    console.error('There is an error saving notes: ', error)
  });
}

module.exports.notes = notes;