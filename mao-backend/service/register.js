const AWS = require("aws-sdk");
AWS.config.update({
    // update region'
    region: "ap-southeast-1"
})

// declare no sql db client
const util = require("../utils/util");
const bcrypt = require("bcryptjs");

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = "mao-users";

async function register(userInfo) {
    const name = userInfo.name;
    const email = userInfo.email;
    const username = userInfo.username;
    const password = userInfo.password;

    // if fields are empty
    if (!username || !name || !email || !password) {
      return util.buildResponse(401, {
        message: 'All fields are required'
      })
    }
  
    const dynamoUser = await getUser(username.toLowerCase().trim());
    // if username is inside the database

    if (dynamoUser && dynamoUser.username) {
      return util.buildResponse(401, {
        message: 'username already exists in our database. please choose a different username'
      })
    }
    
    // unique username
    // encrypt password
    const encryptedPW = bcrypt.hashSync(password.trim(), 10);
    const randomID = Math.floor(1000000000 + Math.random() * 9000000000);
    const user = {
      name: name,
      email: email,
      username: username.toLowerCase().trim(),
      password: encryptedPW,
      id: randomID
    }

    // save to database
    const saveUserResponse = await saveUser(user);
    if (!saveUserResponse) {
      return util.buildResponse(503, { message: 'Server Error. Please try again later.'});
    }

    // successful register user
    return util.buildResponse(200, { username: username });
  }
  
  async function getUser(username) {
    const params = {
      TableName: userTable,
      Key: {
        // usernaem is primary key
        username: username,
        
      }
    }
  
    return await dynamodb.get(params).promise().then(response => {
      return response.Item;
    }, error => {
      console.error('There is an error getting user: ', error);
    })
  }
  
  async function saveUser(user) {
    const params = {
      TableName: userTable,
      Item: user
    }
    return await dynamodb.put(params).promise().then(() => {
      return true;
    }, error => {
      console.error('There is an error saving user: ', error)
    });
  }
  
  module.exports.register = register;