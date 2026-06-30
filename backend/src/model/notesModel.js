import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema({

    title:{type:String ,required:true,trim:true},
    body:{type:String ,required:true,trim:true},
    updateAt:{type:Date ,default:new Date}
},{
    timestamps:true
})

const Note = mongoose.model('Note',noteSchema);
export default Note;