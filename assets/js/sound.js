const volumeControl = document.getElementById('volume-control');
const gainNode = audioCtx.createGain();
let audioCtx, buffer, source;
let songPlaying = false;
let songToggled = true;


async function loadAudio() {
  try {
    // Load an audio file
    const response = await fetch("assets/music/132garaaj.mp3");
    // Decode it
    buffer = await audioCtx.decodeAudioData(await response.arrayBuffer());
    const max = Math.floor(buffer.duration);
    // loopstartControl.setAttribute("max", max);
    // loopendControl.setAttribute("max", max);
  } catch (err) {
    console.error(`Unable to fetch the audio file. Error: ${err.message}`);
  }
}

async function playSong() {
  if (!audioCtx) {
    audioCtx = new AudioContext();
    await loadAudio();
  }
  source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.connect(gainNode).connect(audioCtx.destination);
  source.loop = true;
  console.log(source)
  // source.loopStart = 
  // source.loopEnd = loopendControl.value;
  source.start(0);
  songPlaying = true;
};

volumeControl.addEventListener(
  "input",
  () => {
    gainNode.gain.value = volumeControl.value;
    localStorage.setItem('volume', volumeControl.value);
  },
  false,
);