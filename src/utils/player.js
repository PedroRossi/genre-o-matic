export default class Player {

  constructor(context, duration, instruments) {
    this.isPlaying = false;
    this.isPaused = false;
    this.duration = duration;
    this.audioContext = context;
    this.instrumentsTracks = {};
    for(let i in instruments)
      this.instrumentsTracks[i] = [];
  }

  addTrack(sample, instrument, trackBuffer) {
    this.removeTrack(sample, instrument)
    this.instrumentsTracks[instrument].push({key: sample, track: trackBuffer});
    this.instrumentsTracks[instrument].sort((a, b) => {
      if (a.key === b.key) return 0;
      if (a.key < b.key) return -1;
      return 1;
    });
  }

  removeTrack(sample, instrument) {
    this.instrumentsTracks[instrument] = this.instrumentsTracks[instrument].filter(val => val.key !== sample)
  }

  async play() {
    let audioBuffer = this.audioContext.createBuffer(1, this.duration, this.audioContext.sampleRate);
    for (let channel = 0; channel < audioBuffer.numberOfChannels ; ++channel) {
      let audioBufferData = audioBuffer.getChannelData(channel);
      for (let i in this.instrumentsTracks) {
        let t = this.instrumentsTracks[i];
        for (let j = 0; j < t.length; ++j) {
          const data = t[j].track.getChannelData(channel);
          const next = (t[j+1] && t[j+1].key) || audioBuffer.length;
          for (let k = 0; k < data.length && t[j].key + k < next; ++k) {
            const index = t[j].key + k;
            audioBufferData[index] += data[k];
          }
        }
      }
    }
    if (this.source) {
      try {
        if (this.isPaused) {
          this.audioContext.resume();
          this.isPlaying = true;
          this.isPaused = false;
          return;
        } else {
          this.source.stop();
        }
      } catch (e) {
        console.error(e);
      }
    }
    this.source = this.audioContext.createBufferSource();
    this.source.buffer = audioBuffer;
    this.source.connect(this.audioContext.destination);
    this.source.start();
    this.isPlaying = true;
    this.source.onendend = () => {
      this.isPlaying = false;
      this.isPaused = false;
    }
  }

  pause() {
    this.audioContext.suspend();
    this.isPlaying = false;
    this.isPaused = true;
  }

  stop() {
    if(this.source) {
      this.source.stop();
      this.isPaused = false;
      this.isPlaying = false;
    }
  }

  download() {
    // TODO return raw data
  }

}
