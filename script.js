// Video.js इनिशियलाइज
const player = videojs('my-video', {
  fluid: true,  // रेस्पॉन्सिव
  controls: true,
  playbackRates: [0.25, 0.5, 1, 1.5, 2, 4, 8],  // स्पीड ऑप्शन
  techOrder: ['html5'],  // HTML5 प्राथमिक
});

// प्लेलिस्ट हैंडलिंग
const videoItems = document.querySelectorAll('#videoList li');
videoItems.forEach(item => {
  item.addEventListener('click', function() {
    videoItems.forEach(i => i.classList.remove('active'));
    this.classList.add('active');
    const src = this.getAttribute('data-src');
    player.src({ type: 'video/mp4', src: src });
    player.play();
  });
});

// कस्टम सबटाइटल अपलोड
const subtitleUpload = document.getElementById('subtitle-upload');
const addSubtitleBtn = document.getElementById('add-subtitle');
addSubtitleBtn.addEventListener('click', () => {
  const file = subtitleUpload.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    player.addRemoteTextTrack({
      kind: 'subtitles',
      label: 'कस्टम सबटाइटल',
      srclang: 'hi',
      src: url,
      default: true
    }, false);
    alert('सबटाइटल ऐड हो गया!');
  }
});

// स्पीड चेंज (सेलेक्ट से)
const speedSelect = document.getElementById('speed-select');
speedSelect.addEventListener('change', () => {
  player.playbackRate(parseFloat(speedSelect.value));
});

// फुल स्क्रीन बटन
const fullscreenBtn = document.getElementById('fullscreen-btn');
fullscreenBtn.addEventListener('click', () => {
  if (player.isFullscreen()) {
    player.exitFullscreen();
  } else {
    player.requestFullscreen();
  }
});

// ओरिएंटेशन लॉक (फोन तिरछा - लैंडस्केप)
const rotateBtn = document.getElementById('rotate-btn');
rotateBtn.addEventListener('click', async () => {
  if (!document.fullscreenElement) {
    await player.requestFullscreen();
  }
  if (screen.orientation && screen.orientation.lock) {
    try {
      await screen.orientation.lock('landscape');
      alert('स्क्रीन लैंडस्केप मोड में लॉक हो गया!');
    } catch (err) {
      console.error('ओरिएंटेशन लॉक फेल: ', err);
      alert('ओरिएंटेशन लॉक सपोर्ट नहीं करता ये डिवाइस/ब्राउजर।');
    }
  } else {
    alert('ओरिएंटेशन API सपोर्ट नहीं।');
  }
});

// ऑडियो ट्रैक चेंज (अगर वीडियो में मल्टीपल हों, Video.js ऑटो मेन्यू देता है)

// अगर क्वालिटी स्विच ऐड करना हो, Video.js quality-selector प्लगिन ऐड करो (एक्स्ट्रा CDN)
