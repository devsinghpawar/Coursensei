const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  github_username: { type: String},
  github_id: {type: String,
       required: true },
  github_avatar_url: {type: String},
  github_name: {type: String},
  github_location: {type: String},
  github_email: {type: String},
  token: { type: String, 
           required: true},
  app_id: {type: String}
});

const userModel = mongoose.model('OktaUser',userSchema)
module.exports = userModel;