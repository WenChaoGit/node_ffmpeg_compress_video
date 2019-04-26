const qiniu = require('qiniu')
cosnt qiniuConfig = require('../config/qiniu')
module.exports = {
  uploadFiles
}
/**
* 上传文件
 */
function uploadFiles(upfile){
  // 获取上传token
  let {accessKey,secretKey,bucket,expires} = qiniuConfig;
  let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  let options = {
      scope: bucket,
      expires: expires
  };
  let putPolicy = new qiniu.rs.PutPolicy(options);
  let uploadToken=putPolicy.uploadToken(mac);
  //开始上传
  let formUploader = new qiniu.form_up.FormUploader(config);
  let putExtra = new qiniu.form_up.PutExtra();
  let key = getUploadKey(upfile);
  formUploader.putFile(uploadToken, key, upfile, putExtra, function(respErr,respBody, respInfo) {
    if respErr throw respErr
    if (respInfo.statusCode == 200) return {key,code:200,msg:`${upfile}上传成功`}
    return {code:400,key:'',msg:`${upfile}上传失败`}
});
}


function getUploadKey(upfile){
  let type_arr = upfile.type.split("/");
  let type = type_arr[1];
  let myDate = new Date();
  let year= myDate.getFullYear();
  year = year.toString();
  let month = parseInt(myDate.getMonth())+1;
  month = month.toString();
  let key = "file/resource/"+year+month+"/"+myDate.getTime()+'.'+type;
  return key;
}