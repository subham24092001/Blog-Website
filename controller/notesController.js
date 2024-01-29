const Note = require('../models/note')

const fecthNotes = async (req, res) => {
  //find the notes
  const notes = await Note.find();
  //respond with them
  res.json({ notes: notes });
};

const fecthNote = async (req, res) => {
  //get id off the url
  const noteId = req.params.id;
  //find the note using that id
  const note = await Note.findById(noteId);
  //respond with the note
  res.json({ note: note });
};

const createNote = async (req, res) => {
  // get the sent in data off request body
  const title = req.body.title;
  const body = req.body.body;

  // create a note with it
  const note = await Note.create({
    title: title,
    body: body,
  });

  // respond with the new note
  res.json({ note: note });
};

const updateNote = async (req, res) => {
  //get id off the url
  const noteId = req.params.id;

  //get the data off the req body
  const title = req.body.title;
  const body = req.body.body;

  //find and update the record
  await Note.findByIdAndUpdate(noteId, {
    title: title,
    body: body,
  });

  //find updated note
  const note = await Note.findById(noteId);

  //respond with it
  res.json({ note: note });
};

const deleteNote = async (req, res) => {
  //get id off the url
  const noteId = req.params.id;
  //delete the record
  await Note.deleteOne({ _id: noteId });
  //respond
  res.json({ success: "Record Deleted" });
};

module.exports = {fecthNotes,fecthNote,createNote,updateNote,deleteNote}