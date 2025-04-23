// src/pages/NotesPage.tsx

import { useEffect, useState } from "react";
import NoteForm from "../components/NoteForm";

interface Note {
  id: number;
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found, please login again");
      setLoading(false);

      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setNotes(data.notes);
      } else {
        setError(data.message || "Failed to fetch notes");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (loading) return <p>Loading notes...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="notes-page">
      <button onClick={() => {
  localStorage.removeItem("token");
  window.location.reload(); // o redirige a login si usas router
      }}>
          Logout
      </button>
      <h2>Your Notes</h2>

      <NoteForm onNoteCreated={fetchNotes} />

      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <small>{note.category}</small>
              <br />
              <small>Created: {new Date(note.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NotesPage;
