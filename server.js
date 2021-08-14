'use strict';
// import packege that i need
const express = require('express');//
require('dotenv').config();
const cors = require('cors');
//---save all method inside express 
const app = express();
//----
const {seedUsersCollection} = require('./models/user.model');
const {getBook} = require('./controller/book.controller');
const {createNewBooks} = require('./controller/book.controller');
const {deleteBooks}= require('./controller/book.controller');
const {updateBookInfo} = require('./controller/book.controller');


const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa'); // we are going to use this package to connect to Auth0
//-----
//-define the port of this backend server
const PORT = process.env.PORT;
const MONGO_DB_URL=process.env.MONGO_DB_URL;
const JWKSURI = process.env.JWKSURI;


///-------
const mongoose = require("mongoose");

const client = jwksClient({
  jwksUri: JWKSURI
});

// open backend app (server)to recieve all req
app.use(cors());
///
//parse any requested data by axios.post(middleWare)
app.use(express.json());


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

  seedUserData();
  // connect mongo with express serves(node)
  mongoose.connect(`${MONGO_DB_URL}/books`, { useNewUrlParser: true , useUnifiedTopology: true  });

//seedUsersCollection();*/
//-------1
app.get('/', (req, res) => {
  res.send('hello useless home page');
});
///------2 (reading data) getting email from  frontend to send static data
 app.get('/books',getBook);
//-----3 create anew data in the db from frontend //create with an email address
app.post('/books',createNewBooks);
//---4 deleting data from the dataBase:

app.delete('/books/:books_id',deleteBooks);


//---5 update data from DB
app.put('/books/:books_id', updateBookInfo);
