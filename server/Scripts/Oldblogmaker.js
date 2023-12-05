require('dotenv').config();
const { spawn } = require("child_process");

async function chattext(newline) {
    console.log(newline)
    return new Promise((resolve, reject) => {
        let result = "";

        const process = spawn('python', ["../LLMstuff/LLMscript/huggingchat.py", newline]);

        process.stdout.on('data', function (data) {
            result += data.toString();
        });

        process.on('close', function (code) {
            if (code === 0) {
                resolve(result);
            } else {
                reject(`Child process exited with code ${code}`);
            }
        });
    });
}

/*async function testblog() {
    try {
        const testt = await chattext("Hi");
        console.log(testt);
    } catch (error) {
        console.error('Error:', error);
    }
} 

testblog();
*/

module.exports = { chattext };
