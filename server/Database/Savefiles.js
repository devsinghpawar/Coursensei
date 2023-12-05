const fileModel = require('./Models/Filenew');

async function createFile(user_id,file_id,name,fileurl,filetext,savingtime){
    var filemodel = new fileModel({
        user_id:user_id,
        file_id:file_id,
        name: name,
        fileurl: fileurl,
        filetext: filetext,
        savingtime: savingtime});//,date : date});
    filemodel.save()
    .then(() => console.log('File data inserted'))
    .catch(err => console.log(err));
}

async function getFiles(user_id){
    try {
        const filedata = await fileModel.find({ user_id:user_id });
        //console.log('user fetched');
        return filedata;
    } catch (err) {
        console.log(err);
        return null; // or throw an error if you want to handle errors higher up the call stack
    }
}

async function nowgetFile(user_id,file_id){
    try {
        const filedata = await fileModel.find({ user_id:user_id, file_id:file_id });
        //console.log('user fetched');
        return filedata;
    } catch (err) {
        console.log(err);
        return null; // or throw an error if you want to handle errors higher up the call stack
    }
}

module.exports = { createFile , getFiles, nowgetFile}
