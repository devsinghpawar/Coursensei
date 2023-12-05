const { createsubtopic, getsubtopic } = require("../Database/Savesubtopic");
const { chattext } = require("../Scripts/Blogmaker");
const { getsubtopicfromai } = require("../Scripts/Getsubtopics");
const fs = require('fs');

async function subtopicjob() {
    const readData = (databasePath) => {
        return new Promise((resolve, reject) => {
            fs.readFile(databasePath, 'utf8', (err, data) => {
                if (err) {
                    console.error(`Error reading file: ${err}`);
                    reject(err);
                } else {
                    console.log("No Errors!");
                    resolve(JSON.parse(data));
                }
            });
        });
    };

    async function seejobs() {
        const databasePath = './CourseDatabase/Schedulejob/jobs.json';
        const data = await readData(databasePath);

        if (data.jobs && data.jobs.length > 0) {
            for (let i = 0; i < data.jobs.length; i++) {
                let topic_status = data.jobs[i].topic_completed;
                let blog_status = data.jobs[i].completed;
                let subtopic_status = data.jobs[i].subtopic_completed;
                if (topic_status === "true" && blog_status === "true" && subtopic_status === "false") {
                    let course_id = data.jobs[i].id;
                    let app_id = data.jobs[i].app_id;
                    await completeblog(course_id, app_id);
                    // Add a delay of 1 minute after completing each job
                    await new Promise(resolve => setTimeout(resolve, 60000));
                }
            }
        } else {
            console.log("Undefined! Better luck next time");
        }
    }

    async function completeblog(course_id, app_id) {
        const topicdatabasePath = `./CourseDatabase/Users/${app_id}/${course_id}/Topicbase/Topic.json`;
        const topic_data = await readData(topicdatabasePath);

        if (topic_data.topic) {
            for (let i = 0; i < topic_data.topic.length; i++) {
                let linet = topic_data.topic[i].line;
                if (linet !== null) {
                    await completeblogline(linet, course_id, app_id);
                }
                if (i === topic_data.topic.length - 1) {
                    await updatejobs(course_id, app_id);
                    await new Promise(resolve => setTimeout(resolve, 60000));
                }
            }
        } else {
            console.log("Undefined topic in blogjob! Better luck next time");
        }
    }

    async function completeblogline(linet, course_id, app_id) {
        const subtopics = await getsubtopicfromai(linet);
        console.log("subtopppic:");
        console.log(subtopics);
        let blogsarray = [];
        if(subtopics!==undefined){
            for (let i = 0; i < subtopics.length; i++) {
                const getsubtopics = await chattext(subtopics[i]);
                blogsarray[i] = {
                    subtopicname: subtopics[i],
                    subtopicblog: getsubtopics
                };
            }
            await sendblog(linet, subtopics, blogsarray, course_id, app_id);
        }
    }

    async function sendblog(linet, subtopics, blogsarray, course_id, app_id) {
        await createsubtopic(linet, subtopics, blogsarray, course_id, app_id);
    }

    async function updatejobs(course_id, app_id) {
        console.log("From subtopics: Update Jobs running...");
        const databasePath = './CourseDatabase/Schedulejob/jobs.json';
        const writeData = (data) => {
            fs.writeFileSync(databasePath, JSON.stringify(data, null, 2), 'utf8');
        };

        async function updateCourse(courseId, updatedFields) {
            const data = await readData(databasePath);
            const jobToUpdate = data.jobs.find(job => job.id === courseId);
            if (jobToUpdate) {
                Object.assign(jobToUpdate, updatedFields);
                writeData(data);
            } else {
                console.log(`Course with ID ${courseId} not found.`);
            }
        }

        await updateCourse(course_id, { subtopic_completed: 'true' });
    }

    // Call seejobs to start the process
    seejobs();
}

module.exports = { subtopicjob };
