const express = require('express');
const app = express();
var cors = require('cors');
const { createUser,getUser,updateUser,getUsernew } = require('./Database/Saveuser');
const { createCourse,getCourses} = require('./Database/Savecourse');
const { createFile,getFiles, nowgetFile} = require('./Database/Savefiles');
const { topicjob } = require('./CourseDatabase/Topicjob');
const { blogjob} = require('./CourseDatabase/Blogjob');
const { v4: uuidv4 } = require('uuid');
const { subtopicjob } = require('./CourseDatabase/Blogsubtopicjob');
const { createsubtopic,getsubtopics,getsubtopicsblog } = require('./Database/Savesubtopic');
const {imgtotext} = require('./Scripts/Imgtotext');
const {chattext} = require('./Scripts/Blogmaker');
const schedule = require('node-schedule');
const fs = require('fs');
require('dotenv').config();
const bodyParser = require('body-parser');

app.use(express.json())
app.use(cors())
app.use(bodyParser.json());

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

app.get('/makecourse',async function(req,res){
    var userdetails = await getUsernew(req.get("accesst"));
    let user_id = userdetails[0].app_id;
    const dte = new Date();
    const course_id = uuidv4();
    createCourse(user_id,req.get('name'),req.get('topics'),req.get('imgurl'),course_id,"false",0,0,0,0,"false",dte);
    const folderName = `./CourseDatabase/Users/${user_id}`;
    makecoursefolder(folderName,course_id);
    schedule_job(course_id,user_id,req.get('imgurl'));
})

app.get('/uploadfile',async function(req,res){
    var userdetails = await getUsernew(req.get("accesst"));
    console.log(userdetails);
    let user_id = userdetails[0].app_id;
    const dte = new Date();
    const file_id = uuidv4();
    const urll = req.get("fileurl");
    console.log(urll);
    const filetext = await imgtotext(urll);
    console.log(filetext)
    await createFile(user_id,file_id,req.get('name'),req.get('fileurl'),filetext,dte);
    res.send(file_id);
})

app.get('/getfiles',async function(req,res){
    var userdetails = await getUsernew(req.get("accesst"));
    console.log(userdetails)
    var user_id = userdetails[0].app_id;
    var filees = await getFiles(user_id);
    console.log(filees)
    res.send(filees)
})

app.get('/nowgetfile',async function(req,res){
    var userdetails = await getUsernew(req.get("token"));
    console.log(userdetails)
    var user_id = userdetails[0].app_id;
    var filee = await nowgetFile(user_id,req.get("file_id"));
    console.log(filee)
    res.send(filee)
})

app.post('/chatapp',async function(req,res){
    console.log('runin chatapp');
    let gotpastarray = req.body.pastarraypacket || [];
    const prompt = "This is our communication array with final data being next prompt:-" + gotpastarray + ".Now based on this, reply to next prompt:- " + req.body.usertext;
    var newchatreply = await chattext(prompt);
    const chatreply = await JSON.parse(newchatreply);
    console.log(chatreply);
    const resobject = {
        sender: "Ai:",
        text: chatreply.text
    }
    console.log(resobject);
    gotpastarray.push(resobject)
    let packetsend = {
        sender: "ai",
        text: chatreply.text,
        newpastarray: gotpastarray
    }
    console.log(gotpastarray);
    res.send(packetsend);
})

app.get('/getcourse',async function(req,res){
    var userdetails = await getUsernew(req.get("token"));
    console.log(userdetails)
    var user_id = userdetails[0].app_id;
    var courses = await getCourses(user_id);
    console.log(courses)
    res.send(courses)
})

async function schedule_job(course_id,app_id,imgurl){

    const databasePath = './CourseDatabase/Schedulejob/jobs.json';
    const readData = () => {
    try {
        const data = fs.readFileSync(databasePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return { jobs: [] };
    }
    };
    const addCourse = (newCourse) => {
        const data = readData();
        data.jobs.push(newCourse);
        writeData(data);
    };

    const writeData = (data) => {
        fs.writeFileSync(databasePath, JSON.stringify(data, null, 2), 'utf8');
    };
    
    addCourse({id: course_id,app_id: app_id,imgurl: imgurl,total: 0,doned: 0,completed: "false",topic_completed: "false",subtopic_completed: "false"})
}

async function makecoursefolder(folderName,course_id){
    fs.stat(folderName, (err, stats) => {
    if (err) {
        if (err.code === 'ENOENT') {
            console.log(`Folder "${folderName}" does not exist.`);
            fs.mkdir(folderName, (err) => {
            if (err) {
                console.error(`Error creating folder: ${err}`);
            } else {
                console.log(`Folder "${folderName}" created successfully.`);
                if(course_id!=="false"){
                    const courseName = folderName + '/' + `${course_id}`;
                    makecoursefolder(courseName,"false")
                }
            }
            });
        } else {
            console.error(`Error checking folder: ${err}`);
        }
    } else {
        if (stats.isDirectory()) {
            console.log(`Folder "${folderName}" exists.`);
            if(course_id!=="false"){
                const courseName = folderName + `${course_id}`;
                makecoursefolder(courseName,"false")
            }
        } else {
            console.log(`"${folderName}" is not a folder.`);
        }
    }
    });
}

app.get('/getuser',async function(req,res){
    var userdetails = await getUsernew(req.get("token"));
    res.send(userdetails)
})

app.get('/getcourseblogs',async function(req,res){
    const readData = (databasePath) => {
        return new Promise((resolve, reject) => {
            fs.readFile(databasePath, 'utf8', (err, data) => {
                if (err) {
                    console.error(`Error reading file: ${err}`);
                    reject(err);
                } else {
                    console.log("No Errors!");
                    //console.log(data);
                    resolve(JSON.parse(data));
                }
            });
        });
    };

    const databasePath = './CourseDatabase/Users/'+req.get("user_id")+"/"+req.get("course_id")+"/Topicbase/Topic.json";
    const data = await readData(databasePath);
    res.json(data);
})

app.get('/getsubtopics', async function(req,res){
    const getsubtopicdata = await getsubtopics(req.get("user_id"),req.get("course_id"))
    let netarray=[];
    for(i=0;i < getsubtopicdata.length;i++){
        netarray[i] = getsubtopicdata[i].subtopics;
    }
    console.log(netarray);
    res.send(netarray);
})

app.get('/getsubtopicblogs',async function(req,res){
    const getsubtopicdata = await getsubtopicsblog(req.get("user_id"),req.get("course_id"),req.get("topicname"));
    console.log(getsubtopicdata);
    const subtopicblogsarray = getsubtopicdata[0].blogs;
    let subtopicblogfinal;
    for(i=0;i <= getsubtopicdata.length + 1;i++){
        if(subtopicblogsarray[i].subtopicname===req.get("subtopicname")){
            if(subtopicblogsarray[i].subtopicblog!==undefined){
                subtopicblogfinal = subtopicblogsarray[i].subtopicblog;
            }else{
                subtopicblogfinal = "Blog empty, something went wrong please be patient while we fix it!";
            }
        }
    }
    res.send(subtopicblogfinal);
})

app.get('/getindividualblogs',async function(req,res){
    const readData = (databasePath) => {
        return new Promise((resolve, reject) => {
            fs.readFile(databasePath, 'utf8', (err, data) => {
                if (err) {
                    console.error(`Error reading file: ${err}`);
                    reject(err);
                } else {
                    console.log("No Errors!");
                    //console.log(data);
                    resolve(JSON.parse(data));
                }
            });
        });
    };
    let individualblog;
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
    console.log(req.headers);
    console.log(req.get("TopicIndex"));
    const Topicindex = parseInt(req.get("TopicIndex"), 10); // Assuming 'topicindex' is the header key
    console.log(req.get("user_id"));
    if(req.get("user_id")!=='' && req.get("TopicIndex") !== undefined){
        const databasePath = './CourseDatabase/Users/'+req.get("user_id")+"/"+req.get("course_id")+"/Blogbase/Blog.json";
        console.log(databasePath);
        const data = await readData(databasePath);
        console.log(data)
        individualblog = data.blog[Topicindex].line;
        console.log("Current :")
        console.log(individualblog)
    }
    else{
        individualblog = "Choose a coure blog...";
    }
    res.send(individualblog);
})

async function runJobs() {
    try {
        console.log("Schedule job running...");
        await topicjob();
        await blogjob();
        await subtopicjob();
        // Uncomment the line below if you want updatemongo to run after all three jobs
        // await updatemongo();
    } catch (error) {
        console.log(error);
    }
}

async function schedule_runner() {
    while (true) {
        await runJobs();
        // Add a delay of 1 minute (adjust as needed)
        await new Promise(resolve => setTimeout(resolve, 30000));
    }
}


app.listen(5000,function(){
    console.log("listening to port 5000...")
    schedule_runner();
})