import { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function NoteForm({ onNoteSaved, selectedNote }) {
  console.log("NoteForm received selectedNote:", selectedNote);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (selectedNote) {
          response = await axios.put(
          `http://localhost:8080/api/notes/${selectedNote.id}`,
          { title, content }
        );
        console.log("Updated note:", response.data);
      } else {
        response = await axios.post("http://localhost:8080/api/notes", {
          title,
          content,
        });
        console.log("Created note:", response.data);
      }
      onNoteSaved(response.data);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title || "");
      setContent(selectedNote.content || "");
    } else {
      setTitle("");
      setContent("");
    }
  }, [selectedNote]);

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
      <button type="submit">{selectedNote ? "Update Note" : "Create Note"}</button>
    </form>
  );
}

export default NoteForm;
