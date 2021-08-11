'use strict';
const mongoose = require('mongoose');
const bookModel = require('./books.model');

 //creat user schema
 const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    books: [bookSchema]
  });

  //create  model (connect the model with collection and schema)
const userModel = mongoose.model('users', userSchema);


//create function to create the collection, model data and seading them in the database
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

  module.exports = {
    userSchema,
    userModel,
    seedUsersCollection
  };