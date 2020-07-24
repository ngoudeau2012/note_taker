const fs = require("fs");
const util = require("util");
const db = require("./db.json")

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class SaveNote {
  readFile() {
    return readFileAsync("db/db.json", "utf8");
  }

  writeFile(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }

  getNote() {
    return this.readFile().then((res) => {
      return JSON.parse(res);
    });
  }

  addNotes(note) {
    const newNote = {
      id: Math.random(),
      title: note.body.title,
      text: note.body.text,
    };
    return this.getNote()
      .then((res) => {
        [...res, newNote];
      })
      .then((updatedNotes) => {
        this.writeFile(updatedNotes);
      })
      .then(() => {
        newNote;
      });
  }

  removeNote(id){
    return this.getNotes().then((res)=>{
       res.filter(note => note.id !== id)
    }).then((filteredNotes) => {
        this.writeFile(filteredNotes)
    })
  }
}

module.exports = new SaveNote