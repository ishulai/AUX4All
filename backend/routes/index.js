const vote = require("./_vote");
const queue = require("./_queue");

let routes = router => {
    vote(router);
    queue(router);
}

module.exports = routes;