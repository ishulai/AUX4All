const addSong = (router, engine) => {
    router.post("/addsong", (req, res) => {
        console.log("POST: addsong");
        const params = req.body;
        const pin = params.pin;
        const user_id = params.user_id;
        const uri = params.uri;
        engine.addSong(pin, user_id, uri);
        res.send(true);
    });
}

module.exports = addSong;