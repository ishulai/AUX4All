const user = require("./_user");
const api = require("./_api");

class room {
    constructor(token, redirect_uri) {
        this.pin = Math.floor(Math.random() * 999999) + "";
        while(this.pin.length < 6) this.pin = "0" + this.pin;
        this.token = "";
        this.redirect_uri = redirect_uri;
        this.users = [];
        this.currentUser = -1;
        this.currentSong = null;
        this.api = new api();
        this.playState = null;
        this.api.codeToToken(token, redirect_uri, t => {
            this.token = t;
            setInterval(() => {
                this.updatePlayState();
            }, 2000);
        });
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
        let activeUsers = this.users.filter(u => u.viewNext());
        if(activeUsers.length == 0) return false;
        this.nextUser(activeUsers);
        let s = this.users[this.currentUser].getNext();
        this.currentSong = s;
        this.api.playSong(this.token, this.currentSong.getUri());
        this.playState = this.currentSong.toJson();
        this.downvotes = 0;
        return this.currentSong;
    }

    nextUser(users) {
        if(users.length == 1) {
            this.currentUser = 0;
            return;
        }
        var table = [];
        users.forEach((u, i) => {
            for(let j = 0; j < u.getVotes(); j++) {
                table.push(i);
            }
        });
        this.currentUser = this.users.findIndex(u => u.getId() === users[table[Math.floor(Math.random() * table.length)]].getId());
    }

    upvote() {
        this.users[this.currentUser].upvote();
    }

    downvote() {
        this.users[this.currentUser].downvote();
        this.downvotes++;
        if(this.downvotes >= this.users.length) this.playNextSong();
    }

    addSong(userId, uri) {
        this.users.find(user => user.getId() === userId).addSong(uri);
    }

    getUsers() {
        return this.users.map(user => user.toJson());
    }

    getCurrentSong(callback) {
        this.api.getCurrentState(this.token, state => callback(state));
    }

    updatePlayState() {
        this.api.getCurrentState(this.token, state => {
            if(state === false) this.playNextSong();
            else {
                if(this.playState === null) this.playState = state;
                else if(this.playState.uri !== state.uri) {
                    this.playState = state;
                    this.playNextSong();
                }
            }
        });
    }
}

module.exports = room;
