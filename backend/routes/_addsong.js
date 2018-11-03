const addSong = (router, engine) => {
    router.post("/addsong", (req, res) => {
        const params = req.body;
        const user_id = params.user_id;
        const song_id = params.song_id;
        engine.addSong(user_id, song_id);
        res.send(true);
    });
}

module.exports = addSong;