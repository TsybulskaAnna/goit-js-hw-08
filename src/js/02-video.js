
import '../css/common.css';
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const videoPlayer = new Player(document.querySelector('iframe#vimeo-player'));


timeOnVideo(videoPlayer, localStorage.getItem('videoplayer-current-time'));


videoPlayer.on('timeupdate', throttle(saveTime, 3000));

function saveTime({ seconds }) {
  localStorage.setItem('videoplayer-current-time', seconds);
}

function timeOnVideo(currentPlayer, currentTime) {
  if (currentTime) currentPlayer.setCurrentTime(currentTime);
}
