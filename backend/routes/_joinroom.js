const joinRoom = (router, engine) => {
    router.post("/joinroom", (req, res) => {
        console.log("POST: joinroom");
        const params = req.body;
        const pin = params.pin;
        const id = engine.joinRoom(pin);
        res.send({
            user_id: id
        });
    });
}

module.exports = joinRoom;