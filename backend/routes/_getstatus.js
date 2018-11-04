const getStatus = (router, engine) => {
    router.post("/getstatus", (req, res) => {
        const pin = req.body.pin;

        engine.updatePlayState(pin);

        engine.getCurrentSong(pin, song => {
            res.send({
                current_song: song
            })
        });
    });
}

module.exports = getStatus;