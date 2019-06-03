const {getVideoDuration} =  require('./lib/upload')

;(async ()=>{
  let url = 'https://img00.yuanxinkangfu.com/avthumb2/file/resource/201904/1555232924.mp4';
  let res = await getVideoDuration(url);
  console.log(res);
})()
