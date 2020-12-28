const SocketCollection = require('./SocketCollection');
const handleTroll = require('./handlers/trolling');

function registerHandlers(socket) {
    socket.on('login', payload => {
        const { username } = JSON.parse(payload);

        SocketCollection.registerUser(username, socket);
        console.log(`${username} is now connected`);
    });
    socket.on('logoff', payload => {
        const { username } = JSON.parse(payload);

        SocketCollection.remove(username);
        console.log(`${username} has disconnected`);
    });

    socket.on('troll', handleTroll);

    socket.on('disconnect', () => {
        console.log('a user has disconnected');
    });
}

module.exports = registerHandlers;
