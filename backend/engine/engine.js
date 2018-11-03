const queue = require("./_queue");
const user = require("./_user");
const api = require("./_api");

class engine {
    constructor() {
        this.users = [];
        this.currentUser = -1;
        this.currentSong = null;
        this.api = new api();
    }

    addUser(nickname) {
        const u = new user(nickname);
        this.users.push(u);
        if(this.currentUser === -1) this.currentUser = 0;
        return u.getId();
    }

    getNext() {
        this.nextUser();
        let s = this.users[this.currentUser].getNext()
        while(s === false) this.nextUser();
        this.currentSong = s;
        return s;
    }

    nextUser() {
        this.currentUser = (this.currentUser + 1) % this.users.length;
    }

    upvote(userId) {
        this.currentSong.upvote(userId);
    }

    downvote(userId) {
        this.currentSong.downvote(userId);
    }

    addSong(userId, uri) {
        this.users.find(user => user.getId() === userId).addSong(uri);
    }

    getUsers() {
        return this.users.map(user => user.toJson());
    }

    getQueue() {
        return [];
    }

    getCurrentSong() {
        return this.currentSong.toJson();
    }

    search(query, callback) {
        this.api.callAPI("searchTracks", { keyword: query }, results => {
            console.log(results);
            callback(results);
        })
    }
}

module.exports = engine;