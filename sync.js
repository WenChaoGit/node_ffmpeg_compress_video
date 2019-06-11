const { Upload,getVideoDuration } = require('./lib/upload')
const path = require('path')
const { Resource } = require('./models/resource')
const shell = require('shelljs')
let objUpload = new Upload()
const dir_prefix = './cvideo'

const resolve = url => path.join(__dirname,url);
;(async () => {
    let dirs = shell.ls(dir_prefix);
    for (let dir  of dirs){
        let arr_url = {};
        let first_url = {};
        let videos = shell.ls(resolve(`${dir_prefix}/${dir}`));
        for(let video of videos){
            let res = await objUpload.putFile(`${dir_prefix}/${dir}/${video}`)
            let {url} = res;
            if(!url){ 
                console.log(`上传失败{$item}`);
                break;
            }
            console.log(`编号:${dir} 组:${video} url:${url} 上传成功`);
            let video_key = video.split('.').shift();
            let duration = await getVideoDuration(url);
            arr_url[video_key] = {
                url:url.split('.com/').pop(),
                duration:parseInt(duration)
            }    
        }
       
        // 连接数据库更新资源
        // console.log(arr_url)
        let arr_url_value = Object.values(arr_url)
        let {url,duration} = arr_url_value[0];
        let http_url =`https://img00.yuanxinkangfu.com/${url}`; 
        let objResource = await Resource.update({
           arr_url:JSON.stringify(arr_url),
           url:http_url,
           duration,
           cover_img:getVideoCoverImg(http_url)
        },{
            where:{
                id:dir
            }
        });
        console.log(dir +'处理成功');
    }

    function getVideoCoverImg(url){
        return `${url}?vframe/png/offset/1`;
    }   
})()






