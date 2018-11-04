const song = require("./_song");

class queue {
    constructor() {
        this.songs = [];
    }

    addSong(uri) {
        this.songs.push(new song(uri));
    } 

    getNext() {
        return (this.songs.length) ? this.songs.shift() : false;
    }

    viewNext() {
    	if(this.songs.length) return this.songs[0];
    	return false;
    }
}

module.exports = queue;