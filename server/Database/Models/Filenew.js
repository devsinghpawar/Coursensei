const mongoose = require('mongoose');
const { Schema } = mongoose;

const fileSchema = new Schema({
    user_id: {type: String},
    file_id: {type: String},
    name: {type: String},
    fileurl: {type: String},
    filetext: {type: [String]},
    savingtime: {type: Date,
        default: Date.now}
});

const fileModel = mongoose.model('Files',fileSchema)
module.exports = fileModel;