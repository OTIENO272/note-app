import express from 'express'
import route from './src/routes/NoteRoute.js';
import cors from 'cors'

const app = express();
app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true
    }
))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/notes',route);


export default app;
