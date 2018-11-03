const queue = require("./_queue");

class user {
    constructor(nickname) {
        this.id = this._uuid();
        this.nickname = nickname;
        this.queue = new queue();
    }

    getId() {
        return this.id;
    }

    getNickname() {
        return this.nickname;
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