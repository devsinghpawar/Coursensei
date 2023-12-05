const express = require('express');
var spawn = require("child_process").spawn;
const app = express();
const cors = require('cors');

app.get('/getblog', getblog);
app.use(express.json())
app.use(cors());

function getblog(req,res){
    var process = spawn('python',["./LLMscript/huggingchat.py",req.query.newLine] );
    process.stdout.on('data', function(data) {
        res.send(data.toString());
    } )

}

app.listen(5000, function() {
    console.log('server running on port 5000');
} )