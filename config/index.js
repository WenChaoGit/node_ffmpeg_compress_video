module.exports={
  //压缩参数配置
  ffmpeg:{
    videoBitrate:'256',
    size:'1280x720p',
    fps:30,
    audioBitrate:'96k',
    audioCodec:'aac',
    format:'gif',
  },
  //共用配置
  common:{
    input_dir:'./bvideo',//待处理的视频文件夹目录
    output_dir:'./output_video',//压缩后的输出目录,
  }
}