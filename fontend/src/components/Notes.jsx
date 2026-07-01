import { useState, useEffect } from 'react';
import Sidebar from './SideBar';
import NoteEditor from './NoteEditor';
import { fetchNotes ,addNote, updateNotes} from '../api/notes.js';


export default function App() {
  // Initialize state directly from localStorage so data persists
  const [notes, setNotes] = useState([]);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [loading,setLoading] = useState(true)
  const [error,setError] =useState(null)

  // Sync with localStorage every time the notes array changes
useEffect(
  ()=>{
    const loadNotes =async()=>{
      try {
        const data = await fetchNotes();
        setNotes(Array.isArray(data) ? data :[])
        
        
      } catch (error) {
        setError(error.message)
      }
      finally{
        setLoading(false)
      }
    }
    loadNotes()
  },[]
)
  const createNewNote =async (inputTitle,inputBody) => {
    const newNote = {
      
      title:inputTitle || 'Untitled Note',
      body:inputBody || 'Note Content'
      
    };
    try {
      const saved = await addNote(newNote)
      setNotes([saved, ...notes])
      setActiveNoteId(saved._id );
    } catch (error) {
      console.log(error);
       setError("Failed to create note");
      
    }
    
    
  };

  const updateAppNote =async (updatedNotes) => {

    try {
      const id = activeNoteId;
      const update = await updateNotes(id,updatedNotes)
      setNotes(prevNote =>
        prevNote.map(n => n._id === id ? update :n)
      )
    } catch (error) {
      setError('Failed to Update',error)
    }
    
  };

  const deleteNote = (idToDelete) => {
    setNotes(prevNotes => prevNotes.filter(note => note._id !== idToDelete));
    if (activeNoteId === idToDelete) setActiveNoteId(null);
  };

  const getActiveNote = () => notes.find(note => note._id === activeNoteId);

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
        <NoteEditor activeNote={getActiveNote()} updateAppNote={updateAppNote} />
      ) : (
        <div className="no-active-note">Select or create a note to start writing!</div>
      )}
    </div>
  );
}