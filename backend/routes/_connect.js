const connect = (router, engine) => {
    router.post("/connect", (req, res) => {
        const params = req.body;
        const nickname = params.nickname;
        const id = engine.addUser(nickname);
        res.send({
            user_id: id
        });
    });
}

module.exports = connect;