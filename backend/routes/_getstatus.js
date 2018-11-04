const getStatus = (router, engine) => {
    router.post("/getstatus", (req, res) => {
        const pin = req.body.pin;
        res.send({
            current_song: engine.getCurrentSong(pin),
            next_song: engine.getNextSong(pin)
        })
    });
}

module.exports = getStatus;