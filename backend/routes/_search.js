const search = (router, engine) => {
    router.post("/search", (req, res) => {
        const params = req.body;
        const query = params.query;
        engine.search(query, results => {
            res.send(results);
        });
    });
}