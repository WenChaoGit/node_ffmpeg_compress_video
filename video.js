
const  ffmpeg = require('fluent-ffmpeg');
let config  = require('./config')
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
    .videoBitrate(config.ffmpeg.videoBitrate)
    // set aspect ratio
    // set size in percent
    .size(config.ffmpeg.size)
    // set fps
    .fps(config.ffmpeg.fps)
    // set audio bitrate
    .audioBitrate(config.ffmpeg.audioBitrate)
    // set audio codec
    .audioCodec(config.ffmpeg.audioCodec)
    // set number of audio channels
    // .audioChannels(2)
    // set custom option
    // .addOption('-vtag', 'DIVX')
    // set output format to force
    .format(config.ffmpeg.format)
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

