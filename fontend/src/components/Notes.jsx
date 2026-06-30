import { useState, useEffect } from 'react';
import Sidebar from './SideBar';
import NoteEditor from './NoteEditor';

export default function App() {
  // Initialize state directly from localStorage so data persists
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('react-notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeNoteId, setActiveNoteId] = useState(null);

  // Sync with localStorage every time the notes array changes
  useEffect(() => {
    localStorage.setItem('react-notes', JSON.stringify(notes));
  }, [notes]);

  const createNewNote = () => {
    const newNote = {
      id: Date.now(), 
      title: 'Untitled Note',
      body: '',
      updatedAt: Date.now()
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const updateNote = (updatedField) => {
    setNotes(prevNotes => prevNotes.map(note => {
      if (note.id === activeNoteId) {
        return { ...note, ...updatedField, updatedAt: Date.now() };
      }
      return note;
    }));
  };

  const deleteNote = (idToDelete) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== idToDelete));
    if (activeNoteId === idToDelete) setActiveNoteId(null);
  };

  const getActiveNote = () => notes.find(note => note.id === activeNoteId);

  return (
    <div className="app-container">
      <Sidebar 
        notes={notes} 
        createNewNote={createNewNote} 
        activeNoteId={activeNoteId} 
        setActiveNoteId={setActiveNoteId} 
        deleteNote={deleteNote}
      />
      {activeNoteId ? (
        <NoteEditor activeNote={getActiveNote()} updateNote={updateNote} />
      ) : (
        <div className="no-active-note">Select or create a note to start writing!</div>
      )}
    </div>
  );
}