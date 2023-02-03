const express = require('express');
const app = express();
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')
const server = http.createServer(app)

app.use(cors())

// Setting up socket.io server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

// Setting up socket.io connection
io.on("connection", (socket) => {
    const date = new Date()
    console.log(`User Connected:  ${socket.id} Date: ${date}`) 

    // This will listen to any socket.emit mentioning 'send_message' 
    socket.on("send_message", (data) => {
        socket.broadcast.emit("receive_message", data)
    })
})



server.listen(3001, () => {
    console.log('Server is running on port 3001')
})