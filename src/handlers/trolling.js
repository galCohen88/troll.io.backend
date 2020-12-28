const socketCollection = require('../SocketCollection');

function handleTroll(payload) {
    const {
        destination,
        media,
        email,
        sms
    } = JSON.parse(payload);

    if (media) {
        if (!socketCollection.isConnected(destination)) {
            // TODO save for later when user connects
        } else {
            socketCollection.sendMessage(destination, 'troll-media', { media });
        }
    }

    if (email) {
        // TODO send email
    }

    if (sms) {
        // TODO send SMS
    }
}

module.exports = handleTroll;
