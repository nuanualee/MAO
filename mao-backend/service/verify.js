const util = require('../utils/util');
const auth = require('../utils/auth');

function verify(requestBody) {
  // if request body does not have user / username /token
  if (!requestBody.user || !requestBody.user.username || !requestBody.token) {
    return util.buildResponse(401, { 
      verified: false,
      message: 'Incorrect request body'
    })
  }
  
  // normal request
  const user = requestBody.user;
  const token = requestBody.token;
  const verification = auth.verifyToken(user.username, token);
  // if verified is not true
  if (!verification.verified) {
    return util.buildResponse(401, verification);
  }
  
  // successful verification
  return util.buildResponse(200, {
    verified: true,
    message: 'Success',
    user: user,
    token: token
  })
}

module.exports.verify = verify;