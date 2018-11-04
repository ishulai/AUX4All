const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require("./routes/index.js");
const engine = require("./engine/engine.js");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const router = express.Router();

routes(router, new engine());

app.use(router);

const port = 8080;
app.listen(process.env.PORT || port);
console.log("REST API listening on port " + port);