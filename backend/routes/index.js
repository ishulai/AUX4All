const addSong = require("./_addsong");
const connect = require("./_connect");
const getNext = require("./_getnext");
const getStatus = require("./_getstatus");
const vote = require("./_vote");

let routes = (router, engine) => {
    addSong(router, engine);
    connect(router, engine);
    getNext(router, engine);
    getStatus(router, engine);
    vote(router, engine);
}

module.exports = routes;