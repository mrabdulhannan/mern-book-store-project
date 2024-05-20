import express, { request, response } from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import {Book} from "./models/bookModel.js";

const app = new express();

app.use(express.json());

app.get('/',(request, response) =>{
    console.log(request);
    return response.status(234).send("Welcome to MERN Stack Tutorial");
});

//Create book
app.post('/books', async (request,response)=>{
    try{

        if(!request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: "Send all required Fields",
            });
        }
        const newBook ={
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        }
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//Get all books from Database
app.get('/books', async(request,response)=>{
    try{

        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books,
        });
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Get One  Book from Database by ID
app.get('/books/:id', async(request,response)=>{
    try{

        //  "message": "Cast to ObjectId failed for value \"{ id: '664b26346152737dbf8146a2' }\" (type Object) at path \"_id\" for model \"Book\""
        const {id} = request.params;

        const book = await Book.findById(id);
        return response.status(200).json(book);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

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