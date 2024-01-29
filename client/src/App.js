import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import NoteDetails from './NoteDetails';

function App() {
  // State
  const [notes, setNotes] = useState(null);
  const [createForm, setCreateForm] = useState({
    title: "",
    body: "",
  });
  const [updateForm, setUpdateForm] = useState({
    _id: null,
    title: "",
    body: "",
  });

  // Use effect
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    // Fetch the notes
    const res = await axios.get("http://localhost:5000/notes");

    // Set to state
    setNotes(res.data.notes);
  };

  const updateCreateFormField = (e) => {
    const { name, value } = e.target;

    setCreateForm({
      ...createForm,
      [name]: value,
    });
  };

  const createNote = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:5000/notes", createForm);

    setNotes([...notes, res.data.note]);

    setCreateForm({
      title: "",
      body: "",
    });
  };

  const deleteNote = async (_id) => {
    // Delete the note
    const res = await axios.delete(`http://localhost:5000/notes/${_id}`);

    // Update state
    const newNotes = [...notes].filter((note) => {
      return note._id !== _id;
    });

    setNotes(newNotes);
  };

  const handleUpdateFieldChange = (e) => {
    const { value, name } = e.target;

    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  const toggleUpdate = (note) => {
    // Set state on update form
    setUpdateForm({ title: note.title, body: note.body, _id: note._id });
  };

  const updateNote = async (e) => {
    e.preventDefault();

    const { title, body } = updateForm;

    // Send the update request
    const res = await axios.put(
      `http://localhost:5000/notes/${updateForm._id}`,
      { title, body }
    );

    // Update state
    const newNotes = [...notes];
    const noteIndex = notes.findIndex((note) => {
      return note._id === updateForm._id;
    });
    newNotes[noteIndex] = res.data.note;

    setNotes(newNotes);

    // Clear update form state
    setUpdateForm({
      _id: null,
      title: "",
      body: "",
    });
  };

  return (
    <div className="container mx-auto p-4 bg-slate-400">
      <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h2 className="text-2xl font-bold mb-4">Notes:</h2>
                {notes &&
                  notes.map((note) => (
                    <div key={note._id} className="mb-4">
                      <Link to={`/note/${note._id}`}>
                        <h3 className="text-xl font-bold">{note.title}</h3>
                      </Link>
                      <button
                        onClick={() => deleteNote(note._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete note
                      </button>
                      <button
                        onClick={() => toggleUpdate(note)}
                        className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
                      >
                        Update note
                      </button>
                    </div>
                  ))}
              </div>
            }
          />
          <Route
            path="/note/:id"
            element={<NoteDetails />}
          />
        </Routes>
      </div>
    </Router>

      {updateForm._id && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold">Update note</h2>
          <form onSubmit={updateNote} className="mt-2">
            <input
              onChange={handleUpdateFieldChange}
              value={updateForm.title}
              name="title"
              className="w-full p-2 border rounded"
              placeholder="Title"
            />
            <textarea
              onChange={handleUpdateFieldChange}
              value={updateForm.body}
              name="body"
              className="w-full p-2 mt-2 border rounded"
              placeholder="Body"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-2 py-1 rounded mt-2"
            >
              Update note
            </button>
          </form>
        </div>
      )}

      {!updateForm._id && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold">Create note</h2>
          <form onSubmit={createNote} className="mt-2">
            <input
              onChange={updateCreateFormField}
              value={createForm.title}
              name="title"
              className="w-full p-2 border rounded"
              placeholder="Title"
            />
            <textarea
              onChange={updateCreateFormField}
              value={createForm.body}
              name="body"
              className="w-full p-2 mt-2 border rounded"
              placeholder="Body"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-2 py-1 rounded mt-2"
            >
              Create note
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;