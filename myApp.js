require("dotenv").config();
let bodyParser = require("body-parser");
let express = require("express");
let app = express();

app.get("/", function (req, res) {
    let absolutePath = __dirname + "/views/index.html";
    res.sendFile(absolutePath);
});

app.use("/public", express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({extended: false}))

app.get("/json", function (req, res, next) {
    if (process.env.MESSAGE_STYLE === "uppercase") {
        res.json({ message: "HELLO JSON" });
    } else {
         res.json({ message: "Hello json" });
    }
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});

app.get("/now", function(req, res, next) {
    req.time = new Date().toString();
    next();
}, function(req, res) {
    res.json({"time": req.time});
});

app.get("/:word/echo", function(req, res) {
    res.json({"echo": req.params.word});
})

app.get("/name", function(req, res) {
    var firstName = req.query.first;
    var lastName = req.query.last;
    res.json({"name": firstName + " " + lastName}); 
});

app.post("/name", function(req, res) {
    var string = req.body.first + " " + req.body.last;
    res.json({"name": string});
})

module.exports = app;
