// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Express server set up.
const app = express();
const PORT = 3000;

// Data parsing set up.
app.use(express.static( __dirname + '/public' ));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route to get the notes.html file.
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// Route for reading and returning db.json file.
app.get("/api/notes", (req, res) => {
    return fs.readFile(__dirname + "/db/db.json", function(err, data) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
});

// Route to get the index.html file.
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server.
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});