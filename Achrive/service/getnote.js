const AWS = require("aws-sdk");
AWS.config.update({
    // update region'
    region: "ap-southeast-1"
})

// declare no sql db client
const util = require("../utils/util");
const bcrypt = require("bcryptjs");
const auth = require("../utils/auth");

const dynamodb= new AWS.DynamoDB.DocumentClient();
const userTable = "mao-users";

// takes in user as request body
async function login(user) {
    // extract username
    const username = user.username;
    const password = user.password;

    // getting username from database
    const dynamoUser = await getUser(username.toLowerCase().trim());
    // if username does not exist in database
    if (!dynamoUser || !dynamoUser.username) {
      return util.buildResponse(403, { message: 'User does not exist'});
    }

    return util.buildResponse(200, {nice: "nice"});
  }
  
  async function getUser(username) {
    const params = {
      TableName: userTable,
      Key: {
        // username is primary key
        username: username
      }
    }
  
    return await dynamodb.get(params).promise().then(response => {
      return response.Item;
    }, error => {
      console.error('There is an error getting user: ', error);
    })
  }
  
  module.exports.getnote = login;