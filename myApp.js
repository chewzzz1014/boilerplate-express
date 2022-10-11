const bodyParser = require('body-parser');
let express = require('express');
let path = require("path");
require("dotenv").config();
let app = express();

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }))

// middleware
app.use(function (req, res, next) {
    // For every request,  log to the console a string taking the following format: method path - ip
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next();
})
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/index.html"));
})
app.get("/json", (req, res) => {
    if (process.env.MESSAGE_STYLE === "uppercase")
        res.json({ "message": "HELLO JSON" });
    else
        res.json({ "message": "Hello json" });
})
app.get("/now", function (req, res, next) {  // middleware
    req.time = new Date().toString();
    next();
}, function (req, res) {    // handler
    res.json({ "time": req.time });
})
app.get("/:word/echo", (req, res) => {
    const { word } = req.params;
    res.json({ "echo": word });
})
app.get("/name", (req, res) => {
    const { first, last } = req.query;
    res.json({ "name": `${first} ${last}` });
})
app.post("/name", (req, res) => {
    const { first, last } = req.body;
    res.json({ "name": `${first} ${last}` });
})
console.log("Hello World");


































module.exports = app;
