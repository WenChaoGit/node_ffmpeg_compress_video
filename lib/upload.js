const qiniu = require('qiniu')
const qiniuConfig = require('../config/qiniu')
module.exports = {
  uploadFiles
}
/**
* 上传文件
 */
function uploadFiles(upfile){
  // 获取上传token
  let {accessKey,secretKey,bucket,expires} = qiniuConfig;
  qiniu.conf.ACCESS_KEY = accessKey
  qiniu.conf.SECRET_KEY = secretKey
  //开始上传
  let extra = new qiniu.io.PutExtra();
  let key = getUploadKey(upfile);
  let uptoken = uptoken(bucket,)
  qiniu.io.putFile(uptoken, key, upfile, extra, function(err, ret) {
    if(!err) {
      // 上传成功， 处理返回值
      console.log(ret.hash, ret.key, ret.persistentId);       
    } else {
      // 上传失败， 处理返回代码
      console.log(err);
  }
}


function getUploadKey(upfile){
  let type_arr = upfile.split("/");
  let type = type_arr[1];
  let myDate = new Date();
  let year= myDate.getFullYear();
  year = year.toString();
  let month = parseInt(myDate.getMonth())+1;
  month = month.toString();
  let key = "file/resource/"+year+month+"/"+myDate.getTime()+'.'+type;
  return key;
}

function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
  return putPolicy.token();
}