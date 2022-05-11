function buildResponse(statusCode, body){
    return {
        statusCode : statusCode,
        headers: {
            // allow clients to call api since it has different endpoints
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }
}

module.exports.buildResponse = buildResponse;