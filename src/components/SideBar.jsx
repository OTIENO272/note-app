

export default function Sidebar({ notes, createNewNote, activeNoteId, setActiveNoteId, deleteNote }) {
  
  
  const getSnippet = (body) => {
    if (!body) return "Empty note...";
    const cleanText = body.replace(/[#*`\n]/g, ' '); // Strip basic markdown if any
    return cleanText.length > 35 ? cleanText.substring(0, 35) + '...' : cleanText;
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>My Notes</h3>
        <button onClick={createNewNote} className="new-note-btn" title="Create new note">
          + New Note
        </button>
      </div>
      
      <div className="sidebar-list">
        {notes.length === 0 ? (
          <p className="empty-state">No notes yet</p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className={`sidebar-item ${note.id === activeNoteId ? 'active' : ''}`}
              onClick={() => setActiveNoteId(note.id)}
            >
              <div className="sidebar-item-content">
                <h4 className="note-title-preview">{note.title || "Untitled Note"}</h4>
                <p className="note-body-preview">{getSnippet(note.body)}</p>
              </div>
              
              <button 
                className="delete-note-btn"
                onClick={(e) => {
                  e.stopPropagation(); // Stops the click from selecting the note right before deleting it
                  deleteNote(note.id);
                }}
                title="Delete note"
              >
                ✕Delete
              </button>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}