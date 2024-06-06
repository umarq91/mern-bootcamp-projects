
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import env from "dotenv"
import { connectDB } from "./db/db.js"
import MemberRoutes from "./routes/MemberRoutes.js"
import TrainerRoutes from "./routes/TrainerRoutes.js"


env.config()


const app = express()
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(bodyParser.json())
app.use(cookieParser())


connectDB()

app.listen(5000, () => console.log("server running on port 5000"))


app.use('/api/v1/members',MemberRoutes)
app.use('/api/v1/trainer',TrainerRoutes)

app.use((err,req,res,next)=>{
// 
    const statusCode = err.statusCode || 501;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success:"false",
        message,
        statusCode
    })

})
