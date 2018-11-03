const vote = require("./_vote");

class song {
    constructor(uri) {
        this.uri = uri;
        this.id = this._uuid();
        this.votes = [];
    }

    upvote(userId) {
        this.votes.push(new vote(userId, 1));
    }

    downvote(userId) {
        this.votes.push(new vote(userId, -1));
    }

    countVotes() {
        return this.votes.map(vote => vote.getValue()).reduce((a, b) => a + b);
    }

    _uuid() {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    toJson() {
        return {
            song_id: this.id,
            upvotes: this.votes.filter(vote => vote.getValue() === 1).length,
            downvotes: this.votes.filter(vote => vote.getValue() === -1).length,
            votes: this.votes.filter(vote => vote.getValue() === 1).length - this.votes.filter(vote => vote.getValue() === -1).length,
            title: "",
            artist: "",
            album: "",
            album_cover: "",
            uri: this.uri
        }
    }
}

module.exports = song;