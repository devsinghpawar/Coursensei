require('dotenv').config();
async function imgtotext(course_img_url){
    const CVAZUREAPIKEY = "df6b057cce684885bb99ecd90dbd2b33";
    const body = {
        url: course_img_url,
    };
    const resp = await fetch("https://jaycaptain.cognitiveservices.azure.com/vision/v3.2/ocr?language=unk&detectOrientation=true&model-version=latest" ,{
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': CVAZUREAPIKEY,
        },
        body: JSON.stringify(body),
    }).then((response)=>{
        //console.log(response[3]);
        return response.json();
    }).then((data)=>{
        //console.log(data.regions[0].lines[0].words[0].text);
        return data;
    });

    //console.log(resp.regions[0].lines[0].words[0]);
    let i,j,k;
    let topicr = [];
    for(i=0;resp.regions[i]!==undefined;i++){
        for(j=0;resp.regions[i].lines[j]!==undefined;j++){
            let textx=[];
            for(k=0;resp.regions[i].lines[j].words[k]!==undefined;k++){
                textx.push(resp.regions[i].lines[j].words[k].text)
            }
            let line = textx.join(' ')
            let newobject = { "line": line }
            topicr.push(newobject);
        }
    }
    //console.log(CVAZUREAPIKEY);
    return topicr;
}

//async function main(){
    //let respont = await imgtotext('https://files.edgestore.dev/8cjtik8nsapmp2se/publicFiles/_public/cd7b961f-ab66-4cf2-aae8-03bdf79d086d.png')
    //console.log(respont)
//}

//main();
module.exports = { imgtotext }