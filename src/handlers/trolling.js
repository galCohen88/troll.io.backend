const socketCollection = require('../SocketCollection');

function handleTroll({
    destination,
    media,
    email,
    sms
}) {
    if (media) {
        if (!socketCollection.isConnected(destination)) {
            // TODO save for later when user connects
        } else {
            socketCollection.sendMessage(destination, { media });
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
