import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function NoteForm2({ onNoteCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/notes", { title, content });
      console.log("Note created", response.data);
      onNoteCreated(response.data);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note Title"
        required
        value={title}
      />
      <textarea
        placeholder="Note Content"
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        required
        value={content}
      />
      <div>
        <h3>Preview:</h3>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      <button type="submit">Create Note</button>
    </form>
  );
}

export default NoteForm2;
