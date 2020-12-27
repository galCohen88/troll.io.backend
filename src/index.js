const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const loginRouter = require('./api/login');


const PORT = 80 || process.env.PORT;

app.get('/isAlive', (req, res) => {
    res.send("Alive and kickin'!!")
});

io.on('connection', socket => {
    console.log('a user has connected');
    socket.send('Howdy!');

    socket.on('disconnect', () => {
        console.log('a user has disconnected');
    });
});

http.listen(PORT, () => {
    console.log(`Troll.io server listening on port ${PORT}`);
});
