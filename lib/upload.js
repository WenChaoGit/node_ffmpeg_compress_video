const qiniuConfig = require('../config/qiniu')
const qn = require('qn')


class Upload {
  constructor(){
    let {accessKey,secretKey,bucket,expires} = qiniuConfig
    this.AK = accessKey
    this.SK = secretKey
    this.bucket = bucket
    this.expires = expires
  }

  putFile(file){
    let key = this.getUploadKey(file)
    var client = qn.create({
      accessKey: this.AK,
      secretKey: this.SK,
      bucket:this.bucket,
      origin: 'https://img00.yuanxinkangfu.com',
      // timeout: 3600000, // default rpc timeout: one hour, optional
      // if your app outside of China, please set `uploadURL` to `http://up.qiniug.com/`
      // uploadURL: 'http://up.qiniu.com/',
    });
    return new Promise((resolve,reject)=>{
      client.uploadFile(file, {key: key}, function (err, result) {
        if(err) reject(err)
        resolve(result)
      });
    })
    
  }

  getUploadKey(upfile){
    let type_arr = upfile.split("/");
    let type =type_arr.pop()
    let myDate = new Date();
    let year= myDate.getFullYear();
    year = year.toString();
    let month = parseInt(myDate.getMonth())+1;
    month = month.toString();
    let key = "avthumb2/file/resource/"+year+month+"/"+myDate.getTime()+'.'+type;
    return key;
  }
}
module.exports = {
  Upload
}
/**
* 上传文件
 */
// function uploadFiles(upfile){
//   // 获取上传token
//   let {accessKey,secretKey,bucket,expires} = qiniuConfig;
//   qiniu.conf.ACCESS_KEY = accessKey
//   qiniu.conf.SECRET_KEY = secretKey
//   //开始上传
//   let extra = new qiniu.io.PutExtra();
//   let key = getUploadKey(upfile);
//   let uptoken = uptoken(bucket,)
//   qiniu.io.putFile(uptoken, key, upfile, extra, function(err, ret) {
//     if(!err) {
//       // 上传成功， 处理返回值
//       console.log(ret.hash, ret.key, ret.persistentId);       
//     } else {
//       // 上传失败， 处理返回代码
//       console.log(err);
//   }
// },




// function uptoken(bucket, key) {
//   var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
//   return putPolicy.token();
// }