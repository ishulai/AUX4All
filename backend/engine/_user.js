const queue = require("./_queue");

class user {
    constructor() {
        this.id = this._uuid();
        this.queue = new queue();
        this.votes = [];
    }

    upvote() {
        this.votes.push(new vote(userId, 1));
    }

    downvote() {
        this.votes.push(new vote(userId, -1));
    }

    getVotes() {
        return this.votes.map(v => v.getValue()).reduce((a, b) => a + b);
    }

    getId() {
        return this.id;
    }

    getNext() {
        return this.queue.getNext();
    }

    addSong(songId) {
        this.queue.addSong(songId);
    }

    _uuid() {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
}

module.exports = user;