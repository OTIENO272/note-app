import { useRef, useState, useEffect } from "react";

export default function NoteEditor({ activeNote, updateAppNote }) {
  const debounceRef = useRef(null);
  const [localNote, setLocalNote] = useState(activeNote);

  // Re-sync local state when switching to a different note
  useEffect(() => {
    setLocalNote(activeNote);
  }, [activeNote._id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 1. Update the visible input immediately — no lag
    setLocalNote(prev => ({ ...prev, [name]: value }));

    // 2. Debounce the actual save to the server
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateAppNote({ [name]: value });
    }, 500);
  };

  return (
    <main className="note-editor">
      <div className="editor-header">
        <input
          type="text"
          name="title"
          placeholder="Note Title..."
          value={localNote.title}
          onChange={handleChange}
          className="editor-title-input"
          maxLength="50"
        />
      </div>
      <div className="editor-body-container">
        <textarea
          name="body"
          placeholder="Start typing your thoughts here..."
          value={localNote.body}
          onChange={handleChange}
          className="editor-textarea"
        />
      </div>
    </main>
  );
}