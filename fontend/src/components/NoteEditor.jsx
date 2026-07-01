

export default function NoteEditor({ activeNote, updateAppNote }) {
  
  // Handles changes for both input fields dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateAppNote({ [name]: value });
  };

  return (
    <main className="note-editor">
      <div className="editor-header">
        <input
          type="text"
          name="title"
          placeholder="Note Title..."
          value={activeNote.title}
          onChange={handleChange}
          className="editor-title-input"
          maxLength="50"
        />
      </div>
      
      <div className="editor-body-container">
        <textarea
          name="body"
          placeholder="Start typing your thoughts here..."
          value={activeNote.body}
          onChange={handleChange}
          className="editor-textarea"
        />
      </div>
    </main>
  );
}