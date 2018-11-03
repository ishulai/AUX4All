const getNext = (router, engine) => {
    router.post("/getnext", (req, res) => {
        res.send(engine.getNext());
    });
}

module.exports = getNext;