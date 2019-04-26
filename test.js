const video = require('./video')
const config = require('./config')
const shell = require('shelljs');
const {uploadFiles} = require('./lib/upload')
let input_path = config.common.input_dir;
let output_path = config.common.output_dir;

let res = uploadFiles('../7/1833/1.mp4');
console.log(res)