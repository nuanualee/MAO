const registerService = require("./service/register")
const loginService = require("./service/login")
const verifyService = require("./service/verify")
const util = require("./utils/util")

// path parameters
const healthPath = "/health";
const registerPath = "/register";
const loginPath = "/login";
const verifyPath = "/verify";

exports.handler = async (event) => {
    console.log("Request Event:", event);
    let response; // define var to return to clients
    switch(true){
        case event.httpMethod === "GET" && event.path === healthPath:
            response = util.buildResponse(200);
            break;
        case event.httpMethod === "POST" && event.path === registerPath:
            // extract request body from event body
            const registerBody = JSON.parse(event.body);
            // use register service to register new user, define method in registerBody 
            // dynamic function, async
            response = await registerService.register(registerBody)
            break;
        case event.httpMethod === "POST" && event.path === loginPath:
            // extract request body from event body
            const loginBody = JSON.parse(event.body);
            response = await loginService.login(loginBody);
            break;
        case event.httpMethod === "POST" && event.path === verifyPath:
            // extract request body from event body
            const verifyBody = JSON.parse(event.body);
            // use verified service, verify token to validate if it is valid/expired
            response = verifyService.verify(verifyBody);
            break;
        default:
            response = util.buildResponse(404, "404 Not Found")
    }
    return response;
    
};


