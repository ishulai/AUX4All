const vote = (router, engine) => {
    router.post("/vote", (req, res) => {
        const params = req.body;
        const pin = params.pin;
        const value = params.value;
        if(value === -1) engine.upvote(pin);
        else engine.upvote(pin);
        res.send(true);
    });
}

module.exports = vote;