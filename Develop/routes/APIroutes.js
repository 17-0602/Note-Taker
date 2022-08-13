const fs = require("fs");
/*const router = require("express").Router();
const {
    notes
} = require("../db/db.json");
const {
    newNote,
} = require("../../lib/noteFunctions");

router.get("/notes", (req, res) => {
    let save = notes;
    res.json(save);
})

router.post("/notes", (req, res) => {
    req.body.id = notes.length.toString();
    let note = newNote(req.body.notes);
    res.json(note);
})*/
const { v4: uuidv4 } = require('uuid');

module.exports = function (apiRoutes) {

    apiRoutes.get("/api/notes", (req, res) => {
        let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        res.json(data);
    });

    apiRoutes.post("/api/notes", (req, res) => { 
        const newNotes = req.body;
        console.log(`${req.body.title} has been added`)
        newNotes.id = uuidv4();

        let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        notes.push(newNotes);
        fs.writeFileSync('./db/db.json', JSON.stringify(notes));

        res.json(notes);
    });

    apiRoutes.delete("/api/notes/:id", (req, res) => {
        let uniqueId = req.params.id.toString();
        let notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
        const newNotes = notes.filter(note => note.id.toString() !== uniqueId);
        fs.writeFileSync('./db/db.json', JSON.stringify(newNotes));
        res.json(newNotes);
        console.log(`A note's ID ${uniqueId} has been deleted`)
    });
};
