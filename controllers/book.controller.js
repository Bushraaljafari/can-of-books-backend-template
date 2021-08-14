'use strict';
const {userModel} = require('../models/users.model');

///------2 (reading data) getting email from  frontend to send static data
// http://localhost:3033/books?email=bushra.aljafari@gmail.com
const getBook= (req,res)=>{
    const{email}=req.query;
    //or findOne but make sure user.books
    userModel.find({ email: email }, function (err, user) {
        if (err) {console.log('did not work ')}
        // console.log(user[0].books);
        else{res.json(user);}  
      });
    }

    //-----3 create anew data in the db from frontend //create with an email address
    const createNewBooks= async(req,res)=>{
        const {title,description,status,email}=req.body;
        // console.log(req.body);
        const newBookObj=new userModel({
          title,
          description,
          status,
          email:email,
        });
        console.log(newBookObj);
        newBookObj.save();
        res.json(newBookObj);
      }

  //---4 deleting data from the dataBase:
  
  const deleteBooks= (req,res)=>{
    const id=req.params.book_id;
    

    userModel.deleteOne({_id:id},(error,book)=>{
        res.json(book.deletedCount);
    });
}

//---5 update data from DB

        const updateBookInfo =async (req, res) => {
            const booksId=Number(req.params.books_id);
            const {title,description,status} = req.body;
            
            userModel.findByIdAndUpdate(
              {_id: bookId} ,
           {
              title:title,
              description:description,
              status:status
            },
            {new : true}, // the flag to tell the method to return the new updated data
            (err,data)=>{
                res.send(data);
            })
        }
        
            

          module.exports = {
            getBook,
            createNewBooks,
            deleteBooks,
            updateBookInfo
          };
       