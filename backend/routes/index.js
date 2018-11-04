const addSong = require("./_addsong");
const getNext = require("./_getnext");
const getStatus = require("./_getstatus");
const vote = require("./_vote");
const search = require("./_search");
const createRoom = require("./_createroom");
const joinRoom = require("./_joinroom");

let routes = (router, engine) => {
    addSong(router, engine);
    getNext(router, engine);
    getStatus(router, engine);
    vote(router, engine);
    search(router, engine);
    createRoom(router, engine);
    joinRoom(router, engine);
}

module.exports = routes;