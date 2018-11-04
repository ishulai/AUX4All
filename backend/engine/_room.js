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
        this.playState = null;
        setInterval(() => {
            this.updatePlayState();
        }, 1000);
        this.downvotes = 0;
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
        let s = this.users[this.currentUser].getNext();
        while (s === false) {
            if (inactiveUsers.find(u => u.getId() !== this.currentUser.getId())) inactiveUsers.push(this.currentUser);
            if (inactiveUsers.length === this.users.length) return false;
            this.nextUser();
            s = this.users[this.currentUser].getNext();
        }
        this.currentSong = s;
        this.api.playSong(this.token, this.currentSong.getUri());
        this.downvotes = 0;
        return this.currentSong;
    }

    nextUser() {
        var table = [];
        this.users.forEach((u, i) => {
            for(let j = 0; j < u.getVotes(); j++) {
                table.push(i);
            }
        });
        this.currentUser = table[Math.floor(Math.random() * table.length)];
    }

    upvote() {
        this.users[this.currentUser].upvote();
    }

    downvote() {
        this.users[this.currentUser].downvote();
        this.downvotes++;
        if(this.downvotes === this.users.length) this.playNextSong();
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
            else {
                if(this.playState === null) this.playState = state;
                else if(this.playState.uri !== state.uri) {
                    this.playNextSong();
                    this.playState = state;
                }
            }
        });
    }
}

module.exports = room;