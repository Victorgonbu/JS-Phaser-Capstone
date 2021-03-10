export default class Model {
  constructor() {
    this.soundOnVariable = true;
    this.musicOnVariable = true;
    this.bgMusicPlayingVariable = false;
    this.url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/o6CKpBlLsn3JiOcASy7Z/scores';
  }

  gameOptions() {
    return {
      backgroundHeight: 793,
      backgroundOffset: -185,
      playerStartPositionX: 100,
      playerStartPositionY: 510,
      leftPlayerOffset: 270,
      rightPlayerOffset: 50,
      playerVelocity: 160,
      playerScale: 0.2,
      url: this.url,
      tileLength: 19200,
    };
  }

  set musicOn(value) {
    this.musicOnVariable = value;
  }

  get musicOn() {
    return this.musicOnVariable;
  }

  set soundOn(value) {
    this.soundOnVariable = value;
  }

  get soundOn() {
    return this.soundOnVariable;
  }

  set bgMusicPlaying(value) {
    this.bgMusicPlayingVariable = value;
  }

  get bgMusicPlaying() {
    return this.bgMusicPlayingVariable;
  }
}