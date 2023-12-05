const { chattext } = require("../Scripts/Blogmaker");
const fs = require('fs');

async function blogjob(){

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

    seejobs();
    async function seejobs(){
        const databasePath = './CourseDatabase/Schedulejob/jobs.json';
        const data = await readData(databasePath);
        let j=0;
        //console.log(data)
        if (data.jobs && data.jobs.length > 0) {
            for (let i = 0; i < data.jobs.length; i++) {
                let topic_status = data.jobs[i].topic_completed;
                let blog_status = data.jobs[i].completed;
                if(topic_status!=="false" && blog_status==="false"){
                    let course_id = data.jobs[i].id;
                    let app_id = data.jobs[i].app_id;
                    completeblog(course_id,app_id);
                }
            }
        }else{
            console.log("Undefined! Better luck next time")
        }
    }

    async function completeblog(course_id,app_id){
        var blogcompleted;
        const topicdatabasePath = `./CourseDatabase/Users/${app_id}/${course_id}/Topicbase/Topic.json`;
        const topic_data = await readData(topicdatabasePath);
        //console.log(topic_data)
        if (topic_data.topic) {
            for (let i = 0; i < topic_data.topic.length; i++) {
                let linet = topic_data.topic[i].line;
                if(linet!==null){
                    await completeblogline(linet,course_id,app_id);
                }
                if(i === topic_data.topic.length - 1){
                    await updatejobs(course_id,app_id);
                }
            }
        }else{
            console.log("Undefined topic in blogjob! Better luck next time")
        }
    }

    async function completeblogline(newline,course_id,app_id){
        const blogPath = `./CourseDatabase/Users/${app_id}/${course_id}/Blogbase/Blog.json`;
        let getchattextdata,newobject;
        //console.log(newline);
        try {
            getchattextdata = await chattext(newline);
            var responseObject = JSON.parse(getchattextdata);
            console.log(getchattextdata.text)
            newobject = {
                "line" : responseObject.text
            }
            //console.log(getchattextdata);
        } catch (error) {
            console.error('Error in chattext:', error);
        }
        await appendtoblogjson(blogPath,course_id,app_id,newobject)
        return 0;
    }

    async function appendtoblogjson(blogPath,course_id,app_id,getchattextdata){
        //console.log(blogPath)
        const addBlog = async function(newBlog){
            console.log("newBlog::::::::::::");
            //console.log(newBlog);
            const data = await readData(blogPath);
            data.blog.push(newBlog);
            writeData(data);
        };

        const writeData = (data) => {
            fs.writeFileSync(blogPath, JSON.stringify(data, null, 2), 'utf8');
        };

        await addBlog(getchattextdata)
        return 0;
    }

    async function updatejobs(course_id,app_id){
        console.log("Update Jobs running...")
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

        await updateCourse(course_id, { completed: 'true' });
        return 0;
    }
}

blogjob();

module.exports = { blogjob }