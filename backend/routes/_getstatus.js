const getStatus = (router, engine) => {
    router.post("/getstatus", (req, res) => {
        res.send({
            users: engine.getUsers(),
            queue: engine.getQueue(),
            current_song: engine.getCurrentSong()
        })
    });
}

module.exports = getStatus;