// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Express server set up.
const app = express();
const PORT = 3000;

// Data parsing set up.
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route to get the notes.html file.
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// Route for reading and returning db.json file.
app.get("/api/notes", (req, res) => {
    return fs.readFile(__dirname + "/db/db.json", "utf-8", (err, data) => {
        if (err) throw err;
        let noteList = JSON.parse(data);
        res.send(noteList);
    });
});

// Route for posting new notes to db.json.
app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    console.log(newNote);
    fs.readFile(__dirname + "/db/db.json", "utf-8", (err, data) => {
        if (err) throw err;
        let noteList = JSON.parse(data);
        noteList.push(newNote);
        noteList.forEach((item, i) => {
            item.id = i + 1;
        });
        console.log(noteList);
        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(noteList), function(err) {
            if (err) throw err;
            console.log("Saved notes have been updated!");
          });
    });
    res.redirect('back');
});

// Route for deleting notes from saved notes.
app.delete("/api/notes/:id", (req, res) => {
    let id = req.params.id;
    fs.readFile(__dirname + "/db/db.json", "utf-8", (err, data) => {
        if (err) throw err;
        let noteList = JSON.parse(data);
        noteList.splice(id - 1, 1);
        noteList.forEach((item, i) => {
            item.id = i + 1;
        });
        console.log(noteList);
        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(noteList), function(err) {
            if (err) throw err;
            console.log("Saved notes have been updated!");
          });
    });
    // req.method = "GET";
    res.redirect(303, "/notes");
});

// Route to get the index.html file.
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server.
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});