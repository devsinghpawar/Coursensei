const subtopicModel = require('./Models/Subtopic');

async function createsubtopic(linet,subtopics,blogsarray,course_id,app_id){
    var subtopicmodel = new subtopicModel({
        user_id:app_id,
        courseid:course_id,
        line: linet,
        subtopics: subtopics,
        blogs: blogsarray});//,date : date});
    subtopicmodel.save()
    .then(() => console.log('Subtopic data inserted'))
    .catch(err => console.log(err));
}

async function getsubtopics(user_id,course_id){
    try {
        const subtopicdata = await subtopicModel.find({ user_id:user_id , courseid:course_id});
        //console.log('user fetched');
        return subtopicdata;
    } catch (err) {
        console.log(err);
        return null; // or throw an error if you want to handle errors higher up the call stack
    }
}

async function getsubtopicsblog(user_id,course_id,line){
    try {
        const subtopicdata = await subtopicModel.find({ user_id:user_id , courseid:course_id,line:line});
        //console.log('user fetched');
        return subtopicdata;
    } catch (err) {
        console.log(err);
        return null; // or throw an error if you want to handle errors higher up the call stack
    }
}

module.exports = { createsubtopic,getsubtopics,getsubtopicsblog }