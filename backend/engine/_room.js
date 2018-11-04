const user = require("./_user");
const api = require("./_api");

class room {
    constructor(token) {
        this.pin = Math.floor(Math.random() * 999999) + "";
        while(this.pin.length < 6) this.pin = "0" + this.pin;
        this.token = token;
        this.users = [];
        this.currentUser = -1;
        this.currentSong = null;
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

    playNextSong() {
        let inactiveUsers = [];
        this.nextUser();
        console.log(this.currentUser);
        let s = this.users[this.currentUser].getNext();
        while (s === false) {
            if (inactiveUsers.find(u => u.getId() !== this.currentUser.getId())) inactiveUsers.push(this.currentUser);
            if (inactiveUsers.length === this.users.length) return false;
            this.nextUser();
            s = this.users[this.currentUser].getNext();
        }
        this.currentSong = s;
        this.api.playSong(this.token, this.currentSong.getUri());
        return this.currentSong;
    }

    nextUser() {
        var table = [];
        this.users.forEach((u, i) => {
            console.log(u.getVotes());
            for(let j = 0; j < u.getVotes(); j++) {
                table.push(i);
            }
        });
        this.currentUser = table[Math.floor(Math.random() * table.length)];
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
        //return this.currentSong.toJson();
        return "hi";
    }

    updatePlayState() {
        this.api.getCurrentState(this.token, state => {
            if(state === false) this.playNextSong();
        });
    }
}

module.exports = room;