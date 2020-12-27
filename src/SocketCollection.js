
class SocketCollection {
    constructor() {
        this._socketUserMap = new Map();
    }

    registerUser(username, socket) {
        this._socketUserMap.set(username, socket);
    }

    getSocket(username) {
        return this._socketUserMap.get(username);
    }

    remove(username) {
        this._socketUserMap.delete(username);
    }
}

module.exports = new SocketCollection();
