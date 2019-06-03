const qiniuConfig = require('../config/qiniu')
const qn = require('qn')
const axios = require('axios')

class Upload {
  constructor() {
    let { accessKey, secretKey, bucket, expires } = qiniuConfig
    this.AK = accessKey
    this.SK = secretKey
    this.bucket = bucket
    this.expires = expires
  }

  putFile(file) {
    let key = this.getUploadKey(file)
    var client = qn.create({
      accessKey: this.AK,
      secretKey: this.SK,
      bucket: this.bucket,
      origin: 'https://img00.yuanxinkangfu.com',
      // timeout: 3600000, // default rpc timeout: one hour, optional
      // if your app outside of China, please set `uploadURL` to `http://up.qiniug.com/`
      // uploadURL: 'http://up.qiniu.com/',
    });
    return new Promise((resolve, reject) => {
      client.uploadFile(file, { key: key }, function (err, result) {
        if (err) reject(err)
        resolve(result)
      });
    })

  }

  getUploadKey(upfile) {
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



}

/**
 * 获取视频时长
 * @param {*} url 
 */
const getVideoDuration = async url => {
  let req_url = `${url}?avinfo`;
  let {data} = await axios.get(req_url)
  return data && data.format && data.format.duration ? Number(data.format.duration) : 0;
}

module.exports = {
  Upload,
  getVideoDuration
}
