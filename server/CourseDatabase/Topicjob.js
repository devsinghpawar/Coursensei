const { imgtotext } = require("../Scripts/Imgtotext");
const fs = require('fs');

async function topicjob(){

    const readData = (databasePath) => {
        return new Promise((resolve, reject) => {
            fs.readFile(databasePath, 'utf8', (err, data) => {
                if (err) {
                    console.error(`Error reading file: ${err}`);
                    reject(err);
                } else {
                    console.log("No Errors!");
                    console.log(data);
                    resolve(JSON.parse(data));
                }
            });
        });
    };

    seejobs();
    async function seejobs(){
        const databasePath = './CourseDatabase/Schedulejob/jobs.json';
        const data = await readData(databasePath);
        let j=0;
        console.log(data)
        if (data.jobs && data.jobs.length > 0) {
            for (let i = 0; i < data.jobs.length; i++) {
                let topic_status = data.jobs[i].topic_completed;
                if(topic_status==="false"){
                    let course_img_url = data.jobs[i].imgurl;
                    let course_id = data.jobs[i].id;
                    let app_id = data.jobs[i].app_id;
                    completetopic(course_img_url,course_id,app_id)
                }
            }
        }else{
            console.log("Undefined! Better luck next time")
        }
    }

    async function completetopic(course_img_url,course_id,app_id){
        await makejsonfolders(course_id,app_id)
        await makejsonfiles(course_id,app_id)
        const gettextdata = await imgtotext(course_img_url);
        const topicpath = `./CourseDatabase/Users/${app_id}/${course_id}/Topicbase/Topic.json`
        await appendtotopicjson(topicpath,course_id,app_id,gettextdata);
        if(gettextdata!==null){
            await updatejobs(course_id,app_id);
        }else{
            console.log("Got no text back!")
        }
    }

    async function makejsonfolders(course_id,app_id){
        let i;
        const newfolderName = ['Topicbase','Blogbase','Filebase','Progressbase']
        for(i=0;i<4;i++){
            const folderName = `./CourseDatabase/Users/${app_id}/${course_id}/${newfolderName[i]}`;
            await makefolder(folderName,course_id,app_id)
        }
    }

    async function makejsonfiles(course_id,app_id){
        let i;
        const newfolderName = ['Topicbase','Blogbase','Filebase','Progressbase']
        const newjsonfile = ['Topic.json','Blog.json','File.json','Progress.json']
        const filetopic = ['topic','blog','file','progress']
        for(i=0;i<4;i++){
            const fileName = `./CourseDatabase/Users/${app_id}/${course_id}/${newfolderName[i]}/${newjsonfile[i]}`;
            await makefile(course_id,app_id,fileName,filetopic[i])
        }
    }

    async function makefolder(folderName,course_id,app_id){
        console.log(folderName);
        fs.stat(folderName, (err, stats) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    console.log(`Folder "${folderName}" does not exist.`);
                    fs.promises.mkdir(folderName, (err) => {
                    if (err) {
                        console.error(`Error creating folder: ${err}`);
                    } else {
                        console.log(`Folder "${folderName}" created successfully.`);
                    }
                    });
                } else {
                    console.error(`Error checking folder: ${err}`);
                }
            } else {
                if (stats.isDirectory()) {
                    console.log(`Folder "${folderName}" exists.`);
                } else {
                    console.log(`"${folderName}" is not a folder.`);
                }
            }
            });
            return
    }

    async function makefile(course_id, app_id, fileName,filetopic) {
        const fileContent = {
            [filetopic]: []
        }
    
        try {
            const fileStats = await fs.promises.stat(fileName);
            if (fileStats.isFile()) {
                console.log(`File "${fileName}" already exists.`);
            } else {
                await fs.promises.writeFile(fileName, JSON.stringify(fileContent, null, 2), 'utf8');
                console.log(`File "${fileName}" created successfully.`);
            }
        } catch (err) {
            if (err.code === 'ENOENT') {
                try {
                    await fs.promises.writeFile(fileName, JSON.stringify(fileContent, null, 2), 'utf8');
                    console.log(`File "${fileName}" created successfully.`);
                } catch (writeError) {
                    console.error(`Error writing file: ${writeError}`);
                }
            } else {
                console.error(`Error checking file: ${err}`);
            }
        }
    }
    

    async function appendtotopicjson(topicpath,course_id,app_id,gettextdata){
        console.log(topicpath)
        const databasePath = topicpath;
        const addCourse = async function(newTopic){
            console.log("newTopic::::::::::::");
            console.log(newTopic);
            const data = await readData(databasePath);
            data.topic.push(newTopic);
            writeData(data);
        };

        const writeData = (data) => {
            fs.writeFileSync(databasePath, JSON.stringify(data, null, 2), 'utf8');
        };

        await addCourse(gettextdata)
    }

    async function updatejobs(course_id,app_id){

        const databasePath = './CourseDatabase/Schedulejob/jobs.json';
        const writeData = (data) => {
            fs.writeFileSync(databasePath, JSON.stringify(data, null, 2), 'utf8');
        };

        updateCourse = async function(courseId, updatedFields){
            const data = await readData(databasePath);
            const jobToUpdate = data.jobs.find(job => job.id === courseId);
            if (jobToUpdate) {
              Object.assign(jobToUpdate, updatedFields);
              writeData(data);
            } else {
              console.log(`Course with ID ${courseId} not found.`);
            }
        };

        await updateCourse(course_id, { topic_completed: 'true' });
    }
}

module.exports = { topicjob }