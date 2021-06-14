const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')

const { addUser, removeUser, getUser, getUserInRoom } = require('./users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(cors())
app.get('/', (req, res) => {
    res.send('Welcome to server ')
})

io.on('connection', socket => {
    socket.on('join', ({ name, room }, cb) => {
        const { err, user } = addUser({ id: socket.id, name, room })

        if(err) return cb(err)

        socket.join(user.room)

        socket.emit('message', { user: 'Admin', text: `${user.name}, Welcome to the room ${user.room}` })
        socket.broadcast.to(user.room).emit('message', { user: 'Admin', text: `${user.name}, has joined!` })

        io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room) })
    })

    socket.on('send message', (mess, cb) => {
        const user = getUser(socket.id)

        io.to(user.room).emit('message', { user: user.name, text: mess })

        cb()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        
        if(user){
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` })
            io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room) })
        }
    })
})

const PORT = process.env.PORT || 1002
server.listen(PORT, () => console.log(`Server is running at port ${PORT}`))