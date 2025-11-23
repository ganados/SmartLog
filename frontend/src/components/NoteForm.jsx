import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown"; // For preview

function NoteForm({ onNoteCreated }) {
  // Prop for callback after create
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/notes", {
        title,
        content,
      });
      onNoteCreated(response.data); // Callback to parent (e.g., refresh list)
      setTitle(""); // Clear form
      setContent("");
    } catch (error) {
      console.error("Error creating note:", error);
      // TODO: User feedback (e.g., alert)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Markdown content..."
        rows={10}
        required
      />
      <div>
        <h3>Preview:</h3>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      <button type="submit">Create Note</button>
    </form>
  );
}

export default NoteForm;
