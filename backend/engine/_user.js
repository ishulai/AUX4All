const queue = require("./_queue");
const vote = require("./_vote");

class user {
    constructor() {
        this.id = this._uuid();
        this.queue = new queue();
        this.votes = [new vote(1)];
    }

    upvote() {
        this.votes.push(new vote(1));
    }

    downvote() {
        this.votes.push(new vote(-1));
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

    viewNext() {
        return this.queue.viewNext();
    }

    addSong(uri) {
        this.queue.addSong(uri);
    }

    _uuid() {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
}

module.exports = user;