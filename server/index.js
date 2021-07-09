const { Socket } = require('dgram');
const express = require('express');
const app = express();
const http = require('http').createServer(app)
const PORT = 3000
let playerCount = 0;
const lodash = require('lodash');

let cardList = [
    {
      num: 1,
      id: "1b",
      img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204sa.jpg",
      discovered: false,
      flip: false
    },
    {
        num: 2,
        id: "2b",
        img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204s2.jpg",
        discovered: false,
        flip: false
    },
    {
        num: 3,
        id: "3b",
        img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204s3.jpg",
        discovered: false,
        flip: false
    },
    {
        num: 4,
        id: "4b",
        img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204s4.jpg",
        discovered: false,
        flip: false
    },
    {
        num: 5,
        id: "5b",
        img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204s5.jpg",
        discovered: false,
        flip: false
    },
    {
        num: 6,
        id: "6b",
        img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204s6.jpg",
        discovered: false,
        flip: false
    },
    {
        num: 1,
        id: "1r",
        img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204ha.jpg",
        discovered: false,
        flip: false
    },
    {
        num: 2,
        id: "2r",
        img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204h2.jpg",
        discovered: false,
        flip: false
    },
    {
        num: 3,
        id: "3r",
        img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204h3.jpg",
        discovered: false,
        flip: false
    },
    {
        num: 4,
        id: "4r",
        img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204h4.jpg",
        discovered: false,
        flip: false
    },
    {
        num: 5,
        id: "5r",
        img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204h5.jpg",
        discovered: false,
        flip: false
    },
    {
        num: 6,
        id: "6r",
        img: "https://playingcardcollector.files.wordpress.com/2013/03/d13204h6.jpg",
        discovered: false,
        flip: false
    },
]
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

    socket.on('getCard', () => {
        io.emit('s_getCard', getRandomCard())
    })

    socket.on('flipCard', payload => {
        socket.broadcast.emit("s_flipCard", payload);
    })
})

function getRandomCard() {
    return lodash.shuffle(cardList)
}

http.listen(PORT, () => {
    console.log('Server Run On Port : ' + PORT)
})