// LOADING DATA
const SaveNote = require("../db/notes");

// ROUTING

module.exports = function (app) {
  // API Get Request
  app.get("/api/notes", function (req, res) {
    SaveNote.getNote()
      .then((notes) => {
        res.json(notes);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // API POST Request
  app.post("/api/notes", function (req, res) {
    var newNote = req.body;

    console.log(newNote);

    SaveNote.addNotes(newNote)
      .then((notes) => {
        res.json(notes);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.delete("/api/notes/:id", function (req, res) {
    var id = req.params.id;

    SaveNote.removeNote(id)
      .then((notes) => {
        res.json(notes);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
