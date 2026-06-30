
import app from './app.js'
import dotenv from 'dotenv'
import connectDB from './src/config/database.js'

dotenv.config({
    path:'./.env'
})

const server = async()=>{
    
    try {
       await  connectDB();
         app.on("error",(error)=>{
            console.log("ERROR",error);
            throw error;
        })
        app.listen(process.env.PORT,()=>{
            console.log(`Server Running ${process.env.PORT}`);
            
        })
    } catch (error) {
       console.log(error);
        
    }
    
}
server();