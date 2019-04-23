const video = require('./video')
const config = require('./config')
const shell = require('shelljs');
let input_path = config.common.input_dir;
let output_path = config.common.output_dir;


//使用shell-js
shell.ls(input_path).forEach(async (item,itemIndex) =>{
  if(itemIndex > 0 && itemIndex % 5 === 0){
    video.sleep(1000*5);//5秒
    console.log(`文件${item}将休息5秒后执行`)
  }
  shell.ls(`${input_path}/${item}`).forEach((itemChild)=>{
    console.log(itemChild);return;
    let params = getOutputName(item,itemChild);
    video.transferVideo(params);
  })
})


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


