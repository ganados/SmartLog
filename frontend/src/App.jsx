import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import ReactMarkdown from "react-markdown";

import NoteForm2 from "./components/NoteForm2";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/notes`);
      console.log("Fetched notes:", response.data);
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleNoteSaved = (savedNote) => {
    const existingNoteIndex = notes.findIndex(
      (note) => note.id === savedNote.id
    );
    if (existingNoteIndex !== -1) {
      const updatedNotes = [...notes];
      updatedNotes[existingNoteIndex] = savedNote;
      setNotes(updatedNotes);
    } else {
      setNotes([...notes, savedNote]);
    }
  };

  const handleNoteDeleted = async (deletedNote) => {
    setNotes(notes.filter((note) => note.id !== deletedNote.id));
    const response = await axios.delete(
      `http://localhost:8080/api/notes/${deletedNote.id}`
    );
  };

  const [selectedNote, setSelectedNote] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>SmartLog Frontend</h1>
      </header>
      <NoteForm2 onNoteSaved={handleNoteSaved} selectedNote={selectedNote} />
      <h2>Note List</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            {note.content && <ReactMarkdown>{note.content}</ReactMarkdown>}
            <button onClick={() => setSelectedNote(note)}>Edit</button>
            <button onClick={() => handleNoteDeleted(note)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
