'use strict';
const mongoose = require('mongoose');

 //creat collection (file)
// creat schema for books

const bookSchema=new mongoose.Schema({
    title:String,
    description: {typy:String},
    status: {typy:String}
  });

  module.exports = {
    bookSchema
};