import Note from "../model/notesModel.js"

const addNote=async(req,res)=>{

   try {
    // const {title,body,updatedAt}=req.body;
    const note = await Note.create({
        title:req.body.title,
        body:req.body.body,
        
    })

    return res.status(201).json({message:'Created Successfully!',note:note})
   } catch (error) {
    res.status(500) .json({err:'Internal sever error',error:error})
    console.log(error);
    
   }
}

 const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
const updateNote=async(req,res)=>{
    try {
        if(Object.keys(req.body).length === 0){
         return res.status(400).json({message:"No data Found"})
      }
        const note = await Note.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json({message:'Updated Successfully',note})
    } catch (error) {
       res.status(500).json({error:'Internal Sever error',err:error})
        
    }
}

const deleteNote=async(req,res)=>{
    try {
        const delNote = await Note.findByIdAndDelete(req.params.id)
        res.status(200).json({msg:'Successfully Deleted',delNote})
    } catch (error) {
       res.status(500).json({error:'Internal Sever error',err:error}) 
    }

}

export {getNotes,addNote,updateNote,deleteNote}