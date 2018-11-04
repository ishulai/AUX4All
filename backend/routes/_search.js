const search = (router, engine) => {
    router.post("/search", (req, res) => {
        console.log("POST: search");
        const params = req.body;
        const query = params.query;
        engine.search(query, results => {
            res.send({
                results: results
            });
        });
    });
}

module.exports = search;