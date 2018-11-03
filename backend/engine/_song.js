const vote = require("./_vote");

class song {
    constructor(songId) {
        this.songId = songId;
        this.id = this._uuid();
        this.votes = [];
    }

    upvote() {
        this.votes.push(new vote(1));
    }

    downvote() {
        this.votes.push(new vote(-1));
    }

    countVotes() {
        return this.votes.map(vote => vote.getValue()).reduce((a, b) => a + b);
    }

    _uuid() {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
}

module.exports = song;