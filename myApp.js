require("dotenv").config();
let bodyParser = require("body-parser");
let express = require("express");
let app = express();

/* 2. start a working express server (deleted) */
/* 3. serve an HTML file */
app.get("/", function (req, res) {
    let absolutePath = __dirname + "/views/index.html";
    res.sendFile(absolutePath);
});

/* 4. serve static assets */
app.use("/public", express.static(__dirname + "/public"));

/* 11. use body-parser to parse POST requests */
app.use(bodyParser.urlencoded({extended: false}))

/* 5. serve JSON on a specific route */
/* 6. use the .env file */
/* 7. implement a root-level request logger middleware */
app.get("/json", function (req, res, next) {
    if (process.env.MESSAGE_STYLE === "uppercase") {
        res.json({ message: "HELLO JSON" });
    } else {
         res.json({ message: "Hello json" });
    }
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});

/* 8. chain middleware to create a time server */
app.get("/now", function(req, res, next) {
    req.time = new Date().toString();
    next();
}, function(req, res) {
    res.json({"time": req.time});
});

/* 9. get route parameter input from the client */
app.get("/:word/echo", function(req, res) {
    res.json({"echo": req.params.word});
})

/* 10. get query parameter input from the client */
app.get("/name", function(req, res) {
    var firstName = req.query.first;
    var lastName = req.query.last;
    res.json({"name": firstName + " " + lastName}); 
});

/* 12. get data from POST request */
app.post("/name", function(req, res) {
    var string = req.body.first + " " + req.body.last;
    res.json({"name": string});
})

module.exports = app;
