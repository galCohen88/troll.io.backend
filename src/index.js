const fs = require('fs');
const app = require('express')();
const http = require('http').createServer(app);
const bodyParser = require('body-parser').json();
const { migrate, PromiseDB } = require('./Database');
const scores = require('./scores');

const io = require('socket.io')(http, {
    cors: { origin: '*' },
});
const cors = require('cors');

const registerHandlers = require('./events');


const PORT = process.env.PORT || 80;

app.use(cors());

app.get('/isAlive', (_req, res) => {
    res.send("Alive and kickin'!!")
});

const wrap = fn => (...args) => fn(...args).catch(args[2]);

let emails = [];
app.post('/login', bodyParser, wrap(async (_req, res, next) => {
    const user = _req.body["user"];
    if (emails.length === 0) {
        let db = new PromiseDB();
        let users = await db.all("select email from users");
        emails = users.map(user => user.email);
    }

    console.log(`user ${user} trying to log in`);

    const response = {};

    response.loggedIn = false;
    if (emails.includes(user)) {
        response.loggedIn = true;
        response.scores = await scores.getAll();
    }

    res.send(response)
}));

app.get('/users', wrap(async (_req, res, next) => {
    res.send({ users: await scores.getAll() });
}));

io.on('connection', socket => {
    console.log('a user has connected');
    socket.send('Howdy!');

    registerHandlers(socket);
});


migrate().then(() => {
    http.listen(PORT, () => {
        console.log(`Troll.io server listening on port ${PORT}`);
    });
}).catch(err => {
    console.error(err);
});
