
class SocketCollection {
    constructor() {
        this._userSocketMap = new Map();
    }

    registerUser(username, socket) {
        this._userSocketMap.set(username, socket);
    }

    isConnected(username) {
        return this._userSocketMap.has(username);
    }

    getSocket(username) {
        return this._userSocketMap.get(username);
    }

    sendMessage(receiver, type, message) {
        const socket = this.getSocket(receiver);
        if (!socket) {
            return;
        }

        socket.emit(type, message);
    }

    remove(username) {
        this._userSocketMap.delete(username);
    }
}

module.exports = new SocketCollection();
