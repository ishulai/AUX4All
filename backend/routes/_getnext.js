const getNext = (router, engine) => {
    router.post("/getnext", (req, res) => {
        console.log("POST: getnext");
        res.send(engine.getNext());
    });
}

module.exports = getNext;