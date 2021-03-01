export default class Model {
  constructor() {
    this._soundOn = true;
    this._musicOn = true;
    this._bgMusicPlaying = false;
  }

  get gameOptions() {
    return {
      backgroundHeight: 793,
      backgroundOffset: -185,
      playerStartPositionX: 100,
      playerStartPositionY: 510,
      leftPlayerOffset: 270,
      rightPlayerOffset: 50,
      playerVelocity: 160,
      playerScale: 0.2,
      url: 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/o6CKpBlLsn3JiOcASy7Z/scores',
    };
  }

  set musicOn(value) {
    this._musicOn = value;
  }

  get musicOn() {
    return this._musicOn;
  }

  set soundOn(value) {
    this._soundOn = value;
  }

  get soundOn() {
    return this._soundOn;
  }

  set bgMusicPlaying(value) {
    this._bgMusicPlaying = value;
  }

  get bgMusicPlaying() {
    return this._bgMusicPlaying;
  }
}