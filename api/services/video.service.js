const ytdl = require('ytdl-core');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const fetch = async params => {
  try {
    const { url } = params;

    const info = await ytdl.getInfo(url);

    if (info.length_seconds >= 600)
      throw new Error('Video duration must not be higher than 10 minutes.');

    return {
      id: info.video_id,
      title: info.title,
      duration: parseInt(info.length_seconds, 10)
    };
  } catch (err) {
    throw err;
  }
};

const process = async params => {
  try {
    const { id, startTime, endTime, removeSilence, normalizeVolume, audioBitrate } = params;

    const start = Date.now();

    const stream = ytdl(id, {
      // filter: format => format.encoding && format.audioEncoding,
      // quality: 'highestaudio'
    });

    // stream.on('info', (info, format) => console.log('STREAM INFO: ', format));
    // stream.on('error', (err) => console.log('STREAM ERROR: ', err.message));

    const output = ffmpeg(stream)
      .format('mp3')
      .audioBitrate(audioBitrate)
      .complexFilter(
        [
          `atrim=${startTime}:${endTime}[output]`,
          removeSilence &&
            '[output]silenceremove=start_periods=1:start_duration=0:start_threshold=-60dB:detection=peak,areverse,silenceremove=start_periods=1:start_duration=0:start_threshold=-60dB:detection=peak,areverse[output]',
          // removeSilence &&
          //   '[output]silenceremove=start_periods=1:start_duration=1:start_threshold=-60dB:detection=peak,aformat=dblp,areverse,silenceremove=start_periods=1:start_duration=1:start_threshold=-60dB:detection=peak,aformat=dblp,areverse[output]',
          normalizeVolume && '[output]loudnorm[output]'
        ].filter(Boolean),
        'output'
      )
      .on('start', () => console.log('FFMPEG START: ', (Date.now() - start) / 1000))
      .on('end', () => console.log('FFMPEG END: ', (Date.now() - start) / 1000))
      .on('error', err => console.log('FFMPEG ERROR: ', err.message))
      .pipe();

    return output;
  } catch (err) {
    throw err;
  }
};

const videoService = {
  fetch,
  process
};

module.exports = videoService;
