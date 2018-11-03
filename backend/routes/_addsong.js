const addSong = (router, engine) => {
    router.post("/addsong", (req, res) => {
        const params = req.body;
        const user_id = params.user_id;
        const uri = params.uri;
        engine.addSong(user_id, uri);
        res.send(true);
    });
}

module.exports = addSong;