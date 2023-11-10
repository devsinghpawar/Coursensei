const mongoose = require('mongoose');
const connectdb = require('./db/connect');
const userModel = require('./Models/User');

require('dotenv').config();
const uri = process.env.MONGO_URI;
connectdb(uri);

async function getUser(github_name,github_id){
    try {
        const userdata = await userModel.find({ github_name: github_name, github_id: github_id });
        //console.log('user fetched');
        return userdata;
    } catch (err) {
        console.log(err);
        return null; // or throw an error if you want to handle errors higher up the call stack
    }
}

async function getUsernew(token){
    try {
        const userdata = await userModel.find({ token:token });
        //console.log('user fetched');
        return userdata;
    } catch (err) {
        console.log(err);
        return null; // or throw an error if you want to handle errors higher up the call stack
    }
}

 
async function createUser(
    github_username,
    github_id ,
    github_avatar_url ,
    github_name ,
    github_location ,
    github_email,token,app_id){//,date){
    var usermodel = new userModel({github_username: github_username,github_id: github_id,github_avatar_url:github_avatar_url,github_name:github_name,github_location:github_location,github_email:github_email,token : token,app_id:app_id});//,date : date});
    usermodel.save()
    .then(() => console.log('user data inserted'))
    .catch(err => console.log(err));
}

async function updateUser(github_id,token){
    await userModel.updateOne({ github_id : github_id},{$set: { token : token}});
    console.log("updated token...");
}

module.exports = { getUser,createUser,updateUser,getUsernew}