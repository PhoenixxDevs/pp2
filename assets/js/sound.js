///// Check out - https://github.com/mdn/webaudio-examples/blob/main/audio-buffer-source-node/loop/script.js

const volumeControl = document.getElementById('volume-control');
let audioCtx, buffer, source, gainNode;
let songPlaying = false;
let songToggled = true;


async function loadAudio() {
  try {
    // Load an audio file
    const response = await fetch("assets/music/132garaaj.mp3");
    // Decode it
    buffer = await audioCtx.decodeAudioData(await response.arrayBuffer());
    const max = Math.floor(buffer.duration);
  } catch (err) {
    console.error(`Unable to fetch the audio file. Error: ${err.message}`);
  }
}

async function playSong() {
  if (!audioCtx) {
    audioCtx = new AudioContext();
    gainNode = audioCtx.createGain();
    await loadAudio();
  }
  gainNode.gain.value = localStorage.getItem("volume") || 1;
  // bpm * amount of bars * beats per bar
  let bpm = (60 / 132);
  let startOfLoop = bpm * (8 * 4) + 0.02;
  let lengthOfLoop = bpm * (88 * 4);
  source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.connect(gainNode).connect(audioCtx.destination);
  source.loop = true;
  source.loopStart = startOfLoop;
  source.loopEnd = startOfLoop + lengthOfLoop;
  source.start(0);
  songPlaying = true;
}

volumeControl.addEventListener(
  "input",
  () => {
    gainNode.gain.value = volumeControl.value;
    localStorage.setItem('volume', volumeControl.value);
  },
  false,
);