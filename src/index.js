const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/isAlive', (req, res) => {
    res.send("Alive and kickin'!!")
});

io.on('connection', socket => {
    console.log('a user has connected');

    socket.on('disconnect', () => {
        console.log('a user has disconnected');
    });
});

http.listen(80, () => {
    console.log('Troll.io server listening on port 80');
});
