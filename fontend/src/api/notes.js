import axios from 'axios'

const api = axios.create({
    baseURL:"http://localhost:8000/api/v1/notes",
})

const fetchNotes =async()=>{
    const res =await  api.get('/')

    return res.data
}
const addNote =async(note)=>{
   try {
     const res =await  api.post('/add',note)
     return res.data.note;
   } catch (error) {
    console.error("Axis Post error",error)
    throw error;
   }

}
const updateNotes =async(id,update)=>{
  try {
    const res = await api.patch(`/update/${id}`,update)
    return res.data.update
  } catch (error) {
    console.log("Failed to Update",error);
    throw error;
    
  }
}
export {fetchNotes,addNote,updateNotes}