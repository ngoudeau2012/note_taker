const fs = require("fs");
const util = require("util");
const { Console } = require("console");
// const db = require("./db.json")

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class SaveNote {
  readFile() {
    return readFileAsync("Develop/db/db.json", "utf8");
  }

  writeFile(note) {
    return writeFileAsync("Develop/db/db.json", JSON.stringify(note));
  }

  getNote() {
    return this.readFile().then((res,err) => {
        if(err) throw err;
        
      return JSON.parse(res);
    });
  }

  addNotes(note) {
    console.log("line 27" + note)

    const newNote = {
      id: Math.random(),
      title: note.title,
      text: note.text,
    };
    console.log(newNote)
    return this.getNote()
      .then((res) => {
        let newNoteArr = [...res , newNote]
        console.log(newNoteArr)
        return newNoteArr
      })
      .then((updatedNotes) => {
        console.log(updatedNotes)
        this.writeFile(updatedNotes);
      })
      .then(() => {
        return newNote;
      });
  }

  removeNote(id){
    return this.getNote().then((res)=>{
      let filteredNotes = res.filter(note => note.id !== parseFloat(id))
      return filteredNotes
    }).then((filteredNotes) => {
      console.log(filteredNotes)
      this.writeFile(filteredNotes)
      return filteredNotes
    })
  }
}

module.exports = new SaveNote