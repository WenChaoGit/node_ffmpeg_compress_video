var ffmpeg = require('ffmpeg');
const fs = require('fs')
const video = require('./video')
const config = require('./config')

let input_path = config.common.input;
let output_path = config.common.output;
try{
  let files =  fs.readdirSync(input_path);
  files.forEach(item => {
    if(item >=config.common.min && item <=config.common.max ){
      let arrVideoDir = fs.readdirSync(`${input_path}/${item}`);
      arrVideoDir.forEach(videoItem => {
        // console.log(videoItem);
        // fs.mkdir(`${output_path}/${item}`,{recursive:true},(err)=>{

        // });
        let params = getOutputName(item,videoItem);
        video.transferVideo(params);
      })
    }
    
  })
  
}catch(err){
  console.log(err)
}

function getOutputName(item,videoItem,input_ext='mpg',output_ext='mp4'){
  let outputName = videoItem.split(`.${input_ext}`);
  let output_suffix = outputName[0];
  let code_name = output_suffix.split('-');
  output_suffix = code_name[0];
  if(!output_suffix.endsWith(`.${output_ext}`)){
    output_suffix = `${output_suffix}.${output_ext}`
  }
  let input= `${input_path}/${item}/${videoItem}`;
  let output = `${output_path}/${item}/${output_suffix}`;
  return { input,output }
}


