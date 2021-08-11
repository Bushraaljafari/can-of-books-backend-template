'use strict';
const userModel = require('../models/users.model');

///------2 (reading data) getting email from  frontend to send static data
// http://localhost:3033/books?email=bushra.aljafari@gmail.com
const seadBooksCollections=async (req,res)=>{
    const{email}=req.query;
    //or findOne but make sure user.books
    await userModel.userModel.find({ email: email }, function (err, user) {
        if (err) {console.log('did not work ')}
        // console.log(user[0].books);
        else{res.send(user[0].books);}  
      });
    }

    //-----3 create anew data in the db from frontend //create with an email address
    const createNewBooks= async(req,rea)=>{
        const {bookName,bookDescription,bookStatus,email}=req.body;
        // console.log(req.body);
        await  userModel.userModel.find({ email: email }, (err, user) => {
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
  
  const deleteBooks= async(req,rea)=>{
    const booksId=Number(req.params.books_id);
    const {email}=req.query;
    await userModel.userModel.find({ email: email }, (err, user) => {
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

//---5 update data from DB

        const updateBookInfo =async (req, res) => {
            const booksId=Number(req.params.books_id);
            const {email, bookName, bookDescription, bookStatus} = req.body;
            const newInfo = {
              name: bookName,
              description: bookDescription,
              status: bookStatus
            };
            await userModel.userModel.find({email: email}, (err, user) =>{
              // console.log(user[0]);
              user[0].books.splice(booksId, 1, newInfo);
              user[0].save();
              res.send(user[0].books);
            });
          } 

          module.exports = {
            seadBooksCollections,
            createNewBooks,
            deleteBooks,
            updateBookInfo
          };
       