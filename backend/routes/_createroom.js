const createRoom = (router, engine) => {
    router.post("/createroom", (req, res) => {
        console.log("POST: createroom");
        const params = req.body;
        console.log(params);
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