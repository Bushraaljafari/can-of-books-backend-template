'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
//---save all method inside express
const app = express();
//const jwt = require('jsonwebtoken');
//const jwksClient = require('jwks-rsa'); // we are going to use this package to connect to Auth0
//-----
const PORT = process.env.PORT;
const MONGO_DB_URL=process.env.MONGO_DB_URL;
//const JWKSURI = process.env.JWKSURI;


///-------
const mongoose = require("mongoose");

/*const client = jwksClient({
  jwksUri: JWKSURI
});*/

// to recieve all req
app.use(cors());
///


/*function getKey(header, callback){
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
*/
 
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

function seedUsersCollection() {
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

  
  

  bushra.save();
 
}

 

 app.get('/books', seadBooksCollections);

 function seadBooksCollections(req,res){
  let requestedEmail = req.query.email;
   userModel.find({email:requestedEmail},function(err,user){
     if(err){ console.log('did not work')
    }
    else{
      res.send(user[0].books)
    }

   })
 }
 app.get('/', (req, res) => {
  res.send('hello useless home page');
});
//..
