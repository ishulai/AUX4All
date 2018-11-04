const queue = require("./_queue");
const user = require("./_user");
const api = require("./_api");

class room {
    constructor() {
        this.pin = Math.random() * 999999 + "";
        while(this.pin.length < 6) this.pin = "0" + this.pin;
        this.users = [];
        this.currentUser = -1;
        this.currentSong = null;
        this.nextSong = null;
        this.api = new api();
    }

    getPin() {
        return this.pin;
    }

    addUser() {
        const u = new user();
        this.users.push(u);
        if (this.currentUser === -1) this.currentUser = 0;
        return u.getId();
    }

    nextSong() {
        let inactiveUsers = [];
        this.nextUser();
        let s = this.users[this.currentUser].getNext();
        while (s === false) {
            if (inactiveUsers.find(u => u.getId() !== this.currentUser.getId())) inactiveUsers.push(this.currentUser);
            if (inactiveUsers.length === this.users.length) return false;
            this.nextUser();
            s = this.users[this.currentUser].getNext();
        }
        this.currentSong = this.nextSong;
        this.nextSong = s;
        return this.currentSong;
    }

    nextUser() {
        function weightedRand(spec) {
            var table = [];
            for (var i = 0; i < spec.length; i++) {
                for (var j = 0; j < spec[i] * 10; j++) {
                    table.push(i);
                }
            }
            return table[Math.floor(Math.random() * table.length)];
        }
        this.currentUser = weightedRand(this.users.map(u => u.getVotes()));
    }

    upvote() {
        this.currentSong.upvote();
    }

    downvote() {
        this.currentSong.downvote();
    }

    addSong(userId, uri) {
        this.users.find(user => user.getId() === userId).addSong(uri);
    }

    getUsers() {
        return this.users.map(user => user.toJson());
    }

    getCurrentSong() {
        return this.currentSong.toJson();
    }

    getNextSong() {
        return this.nextSong.toJson();
    }
}

module.exports = room;