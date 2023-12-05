const connectdb = require('./db/connect');
const courseModel = require('./Models/Course');

async function createCourse(
    user_id,
    course_name,
    topics,
    imgurl,
    courseid,
    completed,
    total_articles,
    total_subtopics,
    course_particles,
    course_psubtopics,
    course_making,
    savingtime){//,date){
    var coursemodel = new courseModel({
        user_id:user_id,
        course_name:course_name,
        topics:topics,
        imgurl:imgurl,
        courseid:courseid,
        completed:completed,
        total_articles:total_articles,
        total_subtopics:total_subtopics,
        course_particles:course_particles,
        course_psubtopics:course_psubtopics,
        course_making:course_making,
        savingtime: savingtime});//,date : date});
    coursemodel.save()
    .then(() => console.log('Course data inserted'))
    .catch(err => console.log(err));
}

async function getCourses(user_id){
    try {
        const coursedata = await courseModel.find({ user_id:user_id });
        //console.log('user fetched');
        return coursedata;
    } catch (err) {
        console.log(err);
        return null; // or throw an error if you want to handle errors higher up the call stack
    }
}

module.exports = { createCourse,getCourses }