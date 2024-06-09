import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/authRoutes';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

//dastabase connection
mongoose.connect(process.env.MONGO_URL || '')
.then(()=>console.log('Database connected'))
.catch((err)=>console.log('Database not connected ', err))

//midd
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))


app.use('/', router)

const PORT = 8000;
app.listen(PORT, ()=>{
    console.log(`...listening port ${PORT}`)
})


