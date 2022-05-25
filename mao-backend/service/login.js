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
    const id = user.id;
    if (!user || !username || !password) {
      return util.buildResponse(401, {
        message: 'username and password are required'
      })
    }

    // getting username from database
    const dynamoUser = await getUser(username.toLowerCase().trim());
    // if username does not exist in database
    if (!dynamoUser || !dynamoUser.username) {
      return util.buildResponse(403, { message: 'user does not exist'});
    }

    // compare using bcrypted password with user's password from database
    if (!bcrypt.compareSync(password, dynamoUser.password)) {
      return util.buildResponse(403, { message: 'password is incorrect'});
    }

    // if username and password matches
    const userInfo = {
      username: dynamoUser.username,
      name: dynamoUser.name,
    }
    const token = auth.generateToken(userInfo)
    const response = {
      user: userInfo,
      token: token
    }
    return util.buildResponse(200, response);
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
  
  module.exports.login = login;