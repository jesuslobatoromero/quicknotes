// src/components/NoteForm.tsx

import { useState } from "react";

interface NoteFormProps {
  onNoteCreated: () => void;
}

function NoteForm({ onNoteCreated }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please login again.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, category }),
      });

      const data = await response.json();

      if (response.ok) {
        // Limpiar el formulario
        setTitle("");
        setContent("");
        setCategory("");
        onNoteCreated(); // Avisar a NotesPage que recargue las notas
      } else {
        setError(data.message || "Failed to create note");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Create New Note</h3>

      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Add Note</button>
    </form>
  );
}

export default NoteForm;
