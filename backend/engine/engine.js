const queue = require("./_queue");
const user = require("./_user");
const api = require("./_api");
const room = require("./_room");

class engine {
    constructor() {
        this.users = [];
        this.currentUser = -1;
        this.currentSong = null;
        this.nextSong = null;
        this.api = new api();
        this.rooms = [];
    }

    upvote(pin) {
        this.rooms.find(r => room.getPin() === pin).upvote();
        console.log(this);
    }

    downvote(pin) {
        this.rooms.find(r => room.getPin() === pin).downvote();
        console.log(this);
    }

    addSong(pin, userId, uri) {
        this.rooms.find(r => room.getPin() === pin).addSong(userId, uri);
        console.log(this);
    }

    getNextSong() {
        console.log(this);
        return this.rooms.find(r => room.getPin() === pin).getNextSong();
    }

    getCurrentSong() {
        console.log(this);
        return this.rooms.find(r => room.getPin() === pin).getCurrentSong();
    }

    search(query, callback) {
        this.api.callAPI("searchTracks", { keyword: query }, results => {
            console.log(results);
            callback(results);
        })
    }

    createRoom() {
        const r = new room();
        this.rooms.push(r);
        console.log(this);
        return r.getPin();
    }

    joinRoom(pin) {
        console.log(this);
        return this.rooms.find(r => room.getPin() === pin).addUser();
    }
}

module.exports = engine;