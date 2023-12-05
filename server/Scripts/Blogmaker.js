const { spawn } = require('child_process');

function spawnPythonProcess(command, args) {
    return new Promise((resolve, reject) => {
        const process = spawn(command, args, { shell: true });

        let result = "";

        //console.log(result)
        process.stdout.on('data', (data) => {
            //console.log(data.toString())
            result += data.toString();
        });

        process.stderr.on('data', (data) => {
            console.error(`Error: ${data.toString()}`);
        });

        process.on('close', (code) => {
            if (code === 0) {
                resolve(result);
            } else {
                reject(`Child process exited with code ${code}`);
            }
        });
    });
}

async function chattext(newline) {
    try {
        const result = await spawnPythonProcess('python', ["./LLMstuff/LLMscript/huggingchat.py", newline]);
        console.log(result);
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}

//chattext("Lion");

module.exports = { chattext };
