import express, { request, response } from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import {Book} from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';
const app = new express();

app.use(express.json());


// middleware to handle CORS policy
// Option 1: Allow all origin with defaults cors(*)
app.use(cors());
// Option 2: All Custom Origin
app.use(cors({
    origin: 'https://localhost:3000',
    methos: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeader: ['Content-Type'],
})
);
app.get('/',(request, response) =>{
    console.log(request);
    return response.status(234).send("Welcome to MERN Stack Tutorial");
});

app.use('/books', booksRoute);

mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("App connected to Database");
   
    app.listen(PORT, () =>{
        console.log(`App is listening to port: ${PORT}`);
    });
})
.catch((error)=>{
    console.log(error);
})