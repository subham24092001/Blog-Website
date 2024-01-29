//load env variable
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

//import depencies
const express = require("express");
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const notesController = require("./controller/notesController");

// create an express appp
const app = express();

// configure express josn
app.use(express.json());
app.use(cors())

//connect to database
connectToDb();

//routing
app.get("/notes",notesController.fecthNotes );
app.get("/notes/:id", notesController.fecthNote);
app.post("/notes", notesController.createNote);
app.put("/notes/:id", notesController.updateNote);
app.delete("/notes/:id", notesController.deleteNote);

//start server
app.listen(process.env.PORT);
