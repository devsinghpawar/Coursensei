const express = require('express');
const app = express();
var cors = require('cors');
const { createUser,getUser,updateUser } = require('./Database/Saveuser');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

app.use(express.json())
app.use(cors())
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
app.get('/accessToken', async function (req,res){
    console.log(req.query.code);
    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code;// + "&redirect_uri=" + REDIRECT_URL;
    await fetch("https://github.com/login/oauth/access_token" + params,{
        method: "POST",
        headers: {
            "Accept" : "application/json"
        }
    }).then((response)=>{
        //console.log(response);
        return response.json();
    }).then((data)=>{
        //console.log(data);
        res.json(data);
    });
});

app.get('/validateuser',async function (req,res){ 
    req.get("Authorization");
    await fetch("https://api.github.com/user",{
        method: 'GET',
        headers:{
            "Authorization" : req.get("Authorization")
        }
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        console.log(data);
        res.json(data);
    })
})

app.get('/saveuser', async function(req,res){
    var userpresence = await getUser(req.get("github_username"),req.get("github_id"));
    console.log(userpresence);
    console.log(userpresence.length);
    if(userpresence.length!=0){
        updateUser(userpresence[0].github_id,req.get("token"))
    }
    else{
        createUser(req.get("github_username"),req.get("github_id"),req.get("github_avatar_url"),req.get("github_name"),req.get("github_location"),req.get("github_email"),req.get("token"),uuidv4());
    }
})

app.listen(5000,function(){
    console.log("listening to port 5000...")
})