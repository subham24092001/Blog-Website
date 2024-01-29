import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const NoteDetails = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchNoteDetails = async () => {
      const res = await axios.get(`http://localhost:5000/notes/${id}`);
      setNote(res.data.note);
    };

    fetchNoteDetails();
  }, [id]);

  if (!note) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{note.title}</h2>
      <p>{note.body}</p>
    </div>
  );
};

export default NoteDetails;