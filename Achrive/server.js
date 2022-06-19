const express = require('express')
const http = require('http')
const { emit } = require('process')
const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server, {
    cors: {
        origin: 'https://localhost:3000',
        method: ["GET", "POST"]
    }
})

// create connection through socket
io.on("connection", (socket) => {
    // connect people through id
    socket.emit("me", socket.id)

    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded")
    })

    // call users
    socket.on("callUser", (data) => {
        // data.userToCall pass in from frontend
        io.to(data.userToCall).emit("callUser", {signal: data.signalData, from: data.from, name: data.name})
    })

    // answer call
    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data-signal)
    })
})

server.listen(3000, () => console.log('listening on port 3000'))