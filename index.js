// Dependencies
const express = require("express");
const path = require("path");

// Express server set up.
const app = express();
const PORT = 3000;

// Data parsing set up.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function (req, res) {
    // res.send("Welcome to the Star Wars Page!")
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("/", function (req, res) {
    // res.send("Welcome to the Star Wars Page!")
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server.
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});