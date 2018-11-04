const vote = (router, engine) => {
    router.post("/vote", (req, res) => {
        console.log("POST: vote");
        const params = req.body;
        const pin = params.pin;
        const value = params.value;
        if(value == -1) engine.downvote(pin);
        else engine.upvote(pin);
        res.send(true);
    });
}

module.exports = vote;