
const  ffmpeg = require('fluent-ffmpeg');
let videoConfig  = require('./config/video')
module.exports = {
  transferVideo
}

function transferVideo({
  input,
  output
}) {
  try {
    var command = new ffmpeg({
      source:input
    })
    // set video bitrate
    .videoBitrate(videoConfig.videoBitrate)
    // set aspect ratio
    // set size in percent
    .size(videoConfig.size)
    // set fps
    .fps(videoConfig.fps)
    // set audio bitrate
    .audioBitrate(videoConfig.audioBitrate)
    // set audio codec
    .audioCodec(videoConfig.audioCodec)
    // set number of audio channels
    // .audioChannels(2)
    // set custom option
    // .addOption('-vtag', 'DIVX')
    // set output format to force
    .format(videoConfig.format)
    .saveToFile(output,(code,err)=>{
      console.log(`文件:${output} has been save succesfully`);
    })
    // setup event handlers
    .on('end', function() {
      console.log(`文件:${output} has been save succesfully`);

      // console.log('file has been converted succesfully');
    })
    .on('error', function(err) {
      console.log('an error happened: ' + err.message);
    })
  } catch (error) {
    console.log(error)
  }
   
}

