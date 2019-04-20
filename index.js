var ffmpeg = require('ffmpeg');
const fs = require('fs')
const video = require('./video')
let count = 0;
let config={
  min:498,
  max:524
}
try{
  let files =  fs.readdirSync('./cvideo');
  files.forEach(item => {
    if(item >=config.min && item <=config.max ){
      let arrVideoDir = fs.readdirSync(`./cvideo/${item}`);
      arrVideoDir.forEach(videoItem => {
        // console.log(videoItem);
        // fs.mkdir(`./cvideo2/${item}`,{recursive:true},(err)=>{

        // });
        let outputName = videoItem.split('.mpg');
        let output_suffix = outputName[0];
        let code_name = output_suffix.split('-');
        output_suffix = code_name[0];
        if(!output_suffix.endsWith('.mp4')){
          output_suffix = `${output_suffix}.mp4`
        }
        let input= `./cvideo/${item}/${videoItem}`;
        let output = `./cvideo2/${item}/${output_suffix}`;
        video.transferVideo({input,output});
  
      })
    }
    
  })
  
}catch(err){
  console.log(err)
}


