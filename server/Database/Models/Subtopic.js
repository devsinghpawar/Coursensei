const mongoose = require('mongoose');
const { Schema } = mongoose;

const subtopicSchema = new Schema({
    user_id: {type: String},
    courseid: {type: String},
    line: {type: String},
    subtopics: {type: [String]},
    blogs: {
        type:[
                {
                    subtopicname: { type : String },
                    subtopicblog: { type : String }
                }
            ]
    }
});

const subtopicModel = mongoose.model('Subtopic',subtopicSchema)
module.exports = subtopicModel;