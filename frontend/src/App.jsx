import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import NoteForm from './components/NoteForm';
import ReactMarkdown from 'react-markdown';

function App() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/notes');
            setNotes(response.data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    const handleNoteCreated = (newNote) => {
        setNotes([...notes, newNote]);  // Optimistic update
        // Or refetch: fetchNotes();
    };

    return (
        <div className="App">
            <h1>SmartLog</h1>
            <NoteForm onNoteCreated={handleNoteCreated} />
            <h2>Notes List</h2>
            <ul>
                {notes.map(note => (
                    <li key={note.id}>
                        <h3>{note.title}</h3>
                        <ReactMarkdown>{note.content}</ReactMarkdown>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;