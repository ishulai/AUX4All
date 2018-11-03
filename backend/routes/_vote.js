const vote = (router, engine) => {
    router.post("/vote", (req, res) => {
        const params = req.body;
        const user_id = params.user_id;
        const value = params.value;
        engine.vote(user_id, value);
        res.send(true);
    });
}

module.exports = vote;