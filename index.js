const video = require('./video')
const config = require('./config')
const shell = require('shelljs');
let input_path = config.common.input_dir;
let output_path = config.common.output_dir;


//使用shell-js
shell.ls(input_path).forEach(async (item,itemIndex) =>{
  if(itemIndex > 0 && itemIndex % 5 === 0){
    console.log(`文件${item}将休息5秒后执行`)
    video.sleep(1000*5);//5秒
  }
  //创建文件夹
  shell.mkdir('-p',`${output_path}/${item}`);
  shell.ls(`${input_path}/${item}`).forEach((itemChild)=>{
    // let params = getOutputName(item,itemChild);
    video.transferVideo({
      input:`${input_path}/${item}/${itemChild}`,
      output:`${output_path}/${item}/${itemChild}.gif`
    });
  })
})


function getOutputName(item,videoItem,input_ext='mpg',output_ext=''){
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


