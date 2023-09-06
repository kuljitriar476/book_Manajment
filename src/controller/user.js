const mongoose=require("mongoose");
const userModel=require("../model/user");
const {ObjectId}= require("mongoose").Types;


const createUser= async function (req,res){
    try{
const data= req.body;
const {
    title,
    name,
    lastName,
    email,
    mobileNumber,
    address,
    role,
    password,
}= data;
const userData= new userModel(
    {
        title,
        name,
        lastName,
        email,
        mobileNumber,
        address,
        role,
        password,
    });
    await userData.save();
    res.status(200).send({
        message:"suer data created successfully",
        data:userData
    });
    }catch(error){
        console.log(error);
    }
};

const getAllUser= async function(req,res){
    try{
const userData= await userModel.find();
res.status(200).send({
    message:"get All user fetch successfully",
    data:userData,
});
    }catch(error){
        console.log(error);
    }
};

const singleUser= async function(req,res){
    try{
const data= req.body;
const {id}= req.params;
const userData= await userModel.findOne({_id: new ObjectId(id)});
res.status(200).send({
    message:"single user created successfully",
    data:userData
});
    }catch(error){
        console.log(error);
    }
};

const updateUser= async function (req,res){
    try{
const {id} = req.params;
const data= req.body;
const {
    title,
    name,
    lastName,
    email,
    mobileNumber,
    address,
    role,
    password,
}=data;
const userData= await userModel.findOneAndUpdate(
    {_id: new ObjectId (id)},
    {
        title,
        name,
        lastName,
        email,
        mobileNumber,
        address,
        role,
        password,
    },
    {new: true},
);
res.status(200).send({
    message:"user update successfully",
    data: userData
});
    }catch (error){
        console.log(error);
    }
};

const deleteUser= async function(req,res){
    try{
const {id}= req.params;
const data= req.body;
const userData = await userModel({_id: new ObjectId(id)});
res.status(200).send({
    message:"user deleted successfully",
    data:userData
});
    }catch(error){
        console.log(error);
    }
};
module.exports={
    createUser,
    getAllUser,
    singleUser,
    updateUser,
    deleteUser,
};