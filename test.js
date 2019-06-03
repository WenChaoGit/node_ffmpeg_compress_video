// const {getVideoDuration} =  require('./lib/upload')
  let url = 'https://img00.yuanxinkangfu.com/avthumb2/file/resource/201904/1555232924.mp4';

// ;(async ()=>{
//   let url = 'https://img00.yuanxinkangfu.com/avthumb2/file/resource/201904/1555232924.mp4';
//   let res = await getVideoDuration(url);
//   console.log(res);
// })()
// console.log(new Date().getTime()

function getUploadKey(upfile) {
  let type_arr = upfile.split("/");
  let type = type_arr.pop()
  let myDate = new Date();
  let year = myDate.getFullYear();
  year = year.toString();
  let month = parseInt(myDate.getMonth()) + 1;
  month = month.toString();
  let key = "avthumb2/file/resource/" + year + month + "/" + myDate.getTime() + '.' + type.split('.').pop();
  return key;
}

let res = getUploadKey(url)
console.log(res);