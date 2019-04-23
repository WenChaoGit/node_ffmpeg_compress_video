// const shell = require('shelljs')
const fs = require('fs-extra')
const {common} = require('./config')
let input_path = common.input_dir;
try{
  let files =  fs.readdirSync(input_path);
  files.forEach(item => {
    let arrVideoDir = fs.readdirSync(`${input_path}/${item}`);
    arrVideoDir.forEach( async (videoItem) => {
      videoItemSplit = videoItem.split('-');
      let srcpath = `${input_path}/${item}/${videoItem}`;
      let dstpath = `${input_path}/${item}/${videoItemSplit[0]}.mp4`;
      try {
        await fs.move(srcpath,dstpath,{overwrite:true})
      } catch (error) {
        console.log(error);
      }
    })
  })
  
}catch(err){
  console.log(err)
}