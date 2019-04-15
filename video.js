
var ffmpeg = require('fluent-ffmpeg');

let input = './cvideo/201/1.mpg';
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
    .videoBitrate(256)
    // set aspect ratio
    // set size in percent
    .size('1080x720')
    // set fps
    .fps(30)
    // set audio bitrate
    .audioBitrate(96)
    // set audio codec
    .audioCodec('aac')
    // set number of audio channels
    // .audioChannels(2)
    // set custom option
    // .addOption('-vtag', 'DIVX')
    // set output format to force
    .format('mp4')
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

