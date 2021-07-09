const { Socket } = require('dgram');
const express = require('express');
const app = express();
const http = require('http').createServer(app)
const PORT = 3000
let playerCount = 0;

const io = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
})

app.get('/', (req, res) => {
    res.send('Server Run On Port : ' + PORT)
})

io.on('connect', (socket) => {
    console.log('Koneksi Masuk ', socket.id )

    io.emit('idSocket', socket.id)

    socket.on('join_game', payload => {
        if (playerCount > 2) {
            io.emit('respon_join', 'Player Full')
        } else {
            playerCount++
            io.emit('respon_join', playerCount)
        }
    })
})

http.listen(PORT, () => {
    console.log('Server Run On Port : ' + PORT)
})