const queue = require("./_queue");
const user = require("./_user");

class engine {
    constructor() {
        this.users = [];
        this.currentUser = -1;
        this.lastSong = null;
        this.currentSong = null;
    }

    addUser() {
        const u = new user();
        this.users.push(u);
        if(this.currentUser === -1) this.currentUser = 0;
        return u.getId();
    }

    getNext() {
        this.currentUser = (this.currentUser + 1) % this.users.length;
        const s = this.users[this.currentUser].getNext();
        this.lastSong = this.currentSong;
        this.currentSong = s;
        return s;
    }

    upvote() {
        this.lastSong.upvote();
    }

    downvote() {
        this.lastSong.downvote();
    }

    addSong(userId, songId) {
        this.users.find(user => user.getId() === userId).addSong(songId);
    }
}

module.exports = engine;