const mongoose=require("mongoose");
const booksModel= require("../model/books");
const {ObjectId}=require("mongoose").Types;

const createBooks= async function(req,res){
    try{
const data= req.body;
const {
    title,
    name,
    categary,
    subCategary,
    authorId,
    price,
}= data;
const booksData= new booksModel(
    {
        title,
    name,
    categary,
    subCategary,
    authorId,
    price, 
    });
    await booksData.save();
res.status(200).send({
    message:"books data created successfully",
    data:booksData
});
    }catch(error){
        console.log(error);
    }
};

const getAllBooks= async function(req,res){
    try{
const books= await booksModel.find();
res.status(200).send ({
    message:"get All books fetch successfully",
    data:books
});
    }catch(error){
        console.log(error);
    }
};

const singleBooks= async function (req,res){
    try{
const {id}= req.params;
const data = req.body;
const booksData= await booksModel.findOne({_id: new ObjectId(id)});
res.status(200).send({
    message:" single book created successfully",
    data:booksData
});
    }catch(error){
        console.log(error);
    }
};

const updatebooks= async function (req,res){
    try {
        const {id}= req.params;
        const data = req.body;
        const {
            title,
            name,
            categary,
            subCategary,
            authorId,
            price,
        }= data;
        const booksData= await booksModel.findOneAndUpdate(
            {_id: new ObjectId(id)},
            {
                title,
                name,
                categary,
                subCategary,
                authorId,
                price,
            },
            {new :true},
        );
        res.status(200).send({
            message:"books data update successfully",
            data:booksData
        });
    } catch (error) {
        console.log(error)
    }
};

const deletebooks= async function (req,res){
    try {
       const {id}= req.params;
       //const data = req.body;
       const books= await booksModel.findOneAndDelete({_id: new ObjectId (id)});
       res.status(200).send({
        message:"delete books successfully",
       });
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    createBooks,
    getAllBooks,
    singleBooks,
    updatebooks,
    deletebooks,

};