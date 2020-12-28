const fs = require('fs');
const app = require('express')();
const http = require('http').createServer(app);
const bodyParser = require('body-parser').json();

const io = require('socket.io')(http, {
    cors: { origin: '*' },
});
const cors = require('cors');

const registerHandlers = require('./events');
var users = require('./users.json')


const PORT = process.env.PORT || 80;

app.use(cors());

app.get('/isAlive', (_req, res) => {
    res.send("Alive and kickin'!!")
});

app.post('/login', bodyParser, (_req, res) => {
    const user = _req.body["user"]
    console.log(`user ${user} trying to log in`);
    let loggedIn = false;
    if (users.includes(user)){
        loggedIn = true;
    }
    res.send({"loggedIn": loggedIn})
});


io.on('connection', socket => {
    console.log('a user has connected');
    socket.send('Howdy!');

    registerHandlers(socket);
});

http.listen(PORT, () => {
    console.log(`Troll.io server listening on port ${PORT}`);
});
