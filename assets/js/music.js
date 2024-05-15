// for legacy browsers
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

// get the audio element
const audioElement = document.querySelector("audio");
// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);
const gainNode = audioContext.createGain();
const volumeControl = document.querySelector("#volume");

let songPlaying = false;
let songToggled = true;

function musicInit() {
  track.connect(gainNode).connect(audioContext.destination);
  gainNode.gain.value = 1 || localStorage.setItem('volume', volumeControl.value);
  console.log(gainNode.gain.value, localStorage.getItem('volume'));
}

volumeControl.addEventListener(
  "input",
  () => {
    gainNode.gain.value = volumeControl.value;
    localStorage.setItem('volume', volumeControl.value);
  console.log(gainNode.gain.value, localStorage.getItem('volume'));

  },
  false,
);