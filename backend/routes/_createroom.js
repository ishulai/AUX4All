const createRoom = (router, engine) => {
    router.post("/createroom", (req, res) => {
        const params = req.body;
        const token = params.token;
        const redirect_uri = params.redirect_uri;
        const pin = engine.createRoom(token, redirect_uri);
        const user_id = engine.joinRoom(pin);
        res.send({
            pin: pin,
            user_id: user_id
        });
    });
}

module.exports = createRoom;