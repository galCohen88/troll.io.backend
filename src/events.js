const SocketCollection = require('./SocketCollection');

function registerHandlers(socket) {
    socket.on('login', ({ username }) => {
        SocketCollection.registerUser(username, socket);
        console.log(`${username} is now connected`);
    });
    socket.on('logoff', ({ username }) => {
        SocketCollection.remove(username);
        console.log(`${username} has disconnected`);
    });

    socket.on('disconnect', () => {
        console.log('a user has disconnected');
    });
}

module.exports = registerHandlers;
