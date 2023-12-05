const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
    user_id: {type: String},
    course_name: {type: String},
    topics: {type: String},
    imgurl: {type: String},
    courseid: {type: String},
    completed: {type: String},
    total_articles: {type: Number},
    total_subtopics: {type: Number},
    course_particles: {type: Number},
    course_psubtopics: {type: Number},
    course_making: {type: String},
    savingtime: {type: Date,
        default: Date.now}
});

const courseModel = mongoose.model('Couse',courseSchema)
module.exports = courseModel;