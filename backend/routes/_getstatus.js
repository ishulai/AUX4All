const getStatus = (router, engine) => {
    router.post("/getstatus", (req, res) => {
        const pin = req.body.pin;

        engine.updatePlayState(pin);
        
        res.send({
            current_song: engine.getCurrentSong(pin)
        })
    });
}

module.exports = getStatus;