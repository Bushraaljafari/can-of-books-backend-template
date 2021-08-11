'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
//---save all method inside express
const app = express();
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa'); // we are going to use this package to connect to Auth0
//-----
const PORT = process.env.PORT;
const MONGO_DB_URL=process.env.MONGO_DB_URL;
const JWKSURI = process.env.JWKSURI;


///-------
const mongoose = require("mongoose");

const client = jwksClient({
  jwksUri: JWKSURI
});

// to recieve all req
app.use(cors());
///
//parse any requested data by axios.post
server.use(express.json());


function getKey(header, callback){
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}
 


app.get('/test', (request, response) => {
const token = request.headers.authorization.split(' ')[1]; // take the token from frontend
jwt.verify(token, getKey, {}, (error, user) =>{ // pass it to the auth to check the token if its valid
  if(error){
    response.send('invalid token');
  }
  response.json(user);//send user information in the state from auth
});
});

 
  // TODO: 
  // STEP 1: get the jwt from the headers
  // STEP 2. use the jsonwebtoken library to verify that it is a valid jwt
  // jsonwebtoken dock - https://www.npmjs.com/package/jsonwebtoken
  // STEP 3: to prove that everything is working correctly, send the opened jwt back to the front-end


// start lisin to port so be readyto recieve req
  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
  });


  // connect mongo with express serves(node)
  mongoose.connect(`${MONGO_DB_URL}/books`, { useNewUrlParser: true , useUnifiedTopology: true  });


  const bookSchema=new mongoose.Schema({
    title:String,
    description: {typy:String},
    status: {typy:String}
  });

  //creat user schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  books: [bookSchema]
});

//create  model (connect the model with collection and schema)
const userModel = mongoose.model('users', userSchema);

//create function to create the collection, model data and seading them in the database
function seedUserCollection() {
  const bushra = new userModel({
    email: 'bushra.aljafari@gmail.com',
    books: [
      {
          name : 'The Power of Habit',
          description : "helps you understand why habits are at the core of everything you do, how you can change them, and what impact that will have on your life, your business and society.",
          status : 'unread'
      },
      {
          
              name : 'A Smile in the Mind',
              description : "Forty years of witty thinking from over 500 designers, including hundreds of visual examples and interviews with the world's top practitioners.",
              status : 'unread'
      },
      {
          name : "Flash ",
          description : "The first comprehensive biography of Weegee―photographer, “psychic,” ultimate New Yorker―from Christopher Bonanos, author of Instant: The Story of Polaroid..",
          status : 'unread'
      }
    ]
  });

  const bushra2 = new userModel({
    email: 'bushrajamal291@yahoo.com',
    books:[
      {
        name : 'Pride and Prejudice',
        description : "romantic novel by Jane Austen",
        status : 'reading'
      },
      {
        name: 'Broken Wings',
        description: "a tale of tragic love",
        status: 'has been read'
      }
    ]
  });
  
  bushra.save();
  bushra2.save();
 
}
//seedUserCollection();
//-------1
app.get('/', (req, res) => {
  res.send('hello useless home page');
});
///------2 (reading data) getting email from  frontend to send static data
 app.get('/books', seadBooksCollections);

 function seadBooksCollections(req,res){
  let {email} = req.query;
   userModel.find({email:email},function(err,user){
     if(err){ console.log('did not work')
    }
    else{
      res.send(user[0].books)
    }

   })
 }
 
//-----3 create anew data in the db from frontend //create with an email address
app.post('/books',createNewBooks);

function createNewBooks(req, res) {
const {bookName,bookDescription,bookStatus,email}=req.body;
userModel.find({email:email},function (err,user){

if(err){ console.log('did not work')
}
else{
  user[0].books.push(
    {
    name:bookName,
    description:bookDescription,
    status:bookStatus
  }
  )
  user[0].save();
  res.send(user[0].books);
}
});
}

//---4 deleting data from the dataBase:

app.delete('/books/:books_id',deleteBooks);

function deleteBooks(req,res){
  const booksId=Number(req.params.books_id);
  const {email}=req.query;
  userModel.find({email:email},(err,user)=>{
if (err){ console.log('did not work')}
else{
  const booksArr =user[0].books.filter((books,idx)=>{
    if (booksId !== idx){ return books;}
  });
  user[0].books = booksArr;
  user[0].save();
  res.send('The book has been successfully deleted');

}
  });

}
//another way
/*.
function deleteBooks(req,res){
  const booksId=Number(req.params.books_id);
  userModel.delete({_id:booksId},(err,deleted) =>  {
    if (err){console.log('did not work')}
    else{res.send(deleted);}
  
  });
}*/