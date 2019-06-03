const { Upload,getVideoDuration } = require('./lib/upload')
const path = require('path')
const shell = require('shelljs')
let objUpload = new Upload()
const dir_prefix = './cvideo'

const resolve = url => path.join(__dirname,url);
;(async () => {
    let dirs = shell.ls(dir_prefix);
    for (let dir  of dirs){
        let arr_url = {};
        let videos = shell.ls(resolve(`${dir_prefix}/${dir}`));
        for(let video of videos){
            let res = await objUpload.putFile(`${dir_prefix}/${dir}/${video}`)
            let {url} = res;
            if(!url){ 
                console.log(`上传失败{$item}`);
                break;
            }
            console.log(`编号:${dir}  url:${url} 上传成功`);
            let video_url = {}
            video_url.url =url.split('.com/').pop();
            video_url.duration = getVideoDuration(url);
            arr_url[video] = video_url;            
        }
        console.log(arr_url);
        // console.log(resolve(dir+'/'));return;
    }
   
})()






