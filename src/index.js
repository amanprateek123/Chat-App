const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 5000 
const publicDir = path.join(__dirname,'../public')

app.use(express.static(publicDir))

let count = 0
io.on('connection',(socket)=>{
    console.log('New Web Socket connection!')
    // socket.emit('countUpdated',count)
    // socket.on('increament',()=>{
    //     count++
    //     // socket.emit('countUpdated',count)  single connection notified
    //     io.emit('countUpdated',count)      //all connection get updated
    // })
    socket.emit('message','Welcome')
    socket.on('send',(msg)=>{
         io.emit('msg',msg) 
    })
})

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})