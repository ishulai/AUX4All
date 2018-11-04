const api = require("./_api");
const room = require("./_room");

class engine {
    constructor() {
        this.api = new api();
        this.rooms = [];
    }

    upvote(pin) {
        this.rooms.find(r => r.getPin() === pin).upvote();
    }

    downvote(pin) {
        this.rooms.find(r => r.getPin() === pin).downvote();
    }

    addSong(pin, userId, uri) {
        this.rooms.find(r => r.getPin() === pin).addSong(userId, uri);
    }

    getCurrentSong(pin, callback) {
        return this.rooms.find(r => r.getPin() === pin).getCurrentSong(callback);
    }

    search(query, callback) {
        this.api.callAPI("searchTracks", { keyword: query }, results => {
            callback(results);
        })
    }

    createRoom(token, redirect_uri) {
        const r = new room(token, redirect_uri);
        this.rooms.push(r);
        return r.getPin();
    }

    joinRoom(pin) {
        const r = this.rooms.find(r => r.getPin() === pin);
        return r !== undefined ? this.rooms.find(r => r.getPin() === pin).addUser() : false;
    }

    updatePlayState(pin) {
        const r = this.rooms.find(r => r.getPin() === pin);
        if(r !== undefined) r.updatePlayState();
    }
}

module.exports = engine;