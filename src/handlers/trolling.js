const scores = require('../scores');
const socketCollection = require('../SocketCollection');

async function handleTroll(payload) {
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
            scores.update(media.senderEmail, destination);
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
