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

async function getsubtopicfromai(newline){
    try {
        const result = await spawnPythonProcess('python', ["./LLMstuff/LLMscript/huggingchatforsbt.py", newline]);
        //const responseObject = JSON.parse(result.replace(/'/g, '"'));
        console.log(result);
        var responseObject = JSON.parse(result)
        const inpt = responseObject.text;
        console.log(inpt);

        const arrayRegex = /\[.*\]/;
        // Match the array part in the output
        const match = inpt.match(arrayRegex);
        // Parse the matched string as JSON to get the array
        console.log(match)
        inputString = match[0];
        // Replace single quotes with double quotes
        const jsonString = inputString.replace(/'/g, '"');
        // Parse the JSON string to get the array
        const parsedArray = JSON.parse(jsonString);
        console.log(parsedArray)
        //const extractedArray = match ? JSON.parse(match[0]) : null;
        //console.log(extractedArray[0])
        //const newArray = extractedArray.replace(/'/g, '"')
        if(parsedArray!==null){
            return parsedArray;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

//getsubtopicfromai("Computer Networks")

module.exports = {getsubtopicfromai}