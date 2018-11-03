const song = require("./_song");

class queue {
    constructor() {
        this.songs = [];
    }

    addSong(songId) {
        this.songs.push(new song(songId));
    } 

    getNext() {
        return this.songs.shift();
    }
}

module.exports = queue;