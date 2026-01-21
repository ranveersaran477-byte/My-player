// Video.js इनिशियलाइज
const player = videojs('my-video', {
  fluid: true,  // रेस्पॉन्सिव (Android ऑप्टिमाइज)
  controls: true,
  playbackRates: [0.25, 0.5, 1, 1.5, 2, 4, 8],
  techOrder: ['html5'],
  preload: 'metadata'  // बड़े वीडियो के लिए फिक्स
});

// Seek थंबनेल प्रिव्यू ऐड (स्प्राइट इमेज यूज करो – अपना URL बदलो)
player.spriteThumbnails({
  interval: 1,  // हर सेकंड का थंबनेल
  url: 'https://example.com/thumbnails-sprite.jpg',  // अपना स्प्राइट इमेज URL (FFmpeg से बना लो)
  width: 160,   // थंबनेल विड्थ
  height: 90    // थंबनेल हाइट
});

// प्लेलिस्ट हैंडलिंग
const videoList = document.getElementById('videoList');
function addToPlaylist(name, src) {
  const li = document.createElement('li');
  li.textContent = name;
  li.setAttribute('data-src', src);
  li.addEventListener('click', function() {
    videoList.querySelectorAll('li').forEach(i => i.classList.remove('active'));
    this.classList.add('active');
    player.src({ type: 'video/mp4', src: this.getAttribute('data-src') });
    player.play();
  });
  videoList.appendChild(li);
}

// मौजूदा प्लेलिस्ट आइटम्स पर क्लिक हैंडलर
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

// लोकल वीडियो अपलोड (मल्टीपल + 500MB लिमिट)
const videoUpload = document.getElementById('video-upload');
const loadVideoBtn = document.getElementById('load-video');
const MAX_SIZE = 500 * 1024 * 1024;
loadVideoBtn.addEventListener('click', () => {
  const files = videoUpload.files;
  if (files.length === 0) return;

  let totalSize = 0;
  const validFiles = [];

  for (let file of files) {
    totalSize += file.size;
    if (totalSize > MAX_SIZE) {
      alert('टोटल साइज 500MB से ज्यादा हो गया! बाकी फाइल्स लोड नहीं होंगी।');
      break;
    }
    validFiles.push(file);
  }

  validFiles.forEach(file => {
    const url = URL.createObjectURL(file);
    addToPlaylist(file.name, url);
  });

  if (validFiles.length > 0) {
    player.src({ type: 'video/mp4', src: URL.createObjectURL(validFiles[0]) });
    player.play();
    alert(`${validFiles.length} वीडियो लोड हो गए! (टोटल साइज: ${(totalSize / 1024 / 1024).toFixed(2)} MB)`);
  }
});

// सबटाइटल अपलोड
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

// स्पीड चेंज
const speedSelect = document.getElementById('speed-select');
speedSelect.addEventListener('change', () => {
  player.playbackRate(parseFloat(speedSelect.value));
});

// फुल स्क्रीन
const fullscreenBtn = document.getElementById('fullscreen-btn');
fullscreenBtn.addEventListener('click', () => {
  if (player.isFullscreen()) {
    player.exitFullscreen();
  } else {
    player.requestFullscreen();
  }
});

// रोटेट फिक्स (Android लैंडस्केप लॉक)
const rotateBtn = document.getElementById('rotate-btn');
rotateBtn.addEventListener('click', async () => {
  if (!document.fullscreenElement) {
    await player.requestFullscreen();
  }
  if (screen.orientation && screen.orientation.lock) {
    try {
      await screen.orientation.lock('landscape');
      alert('स्क्रीन लैंडस्केप मोड में लॉक हो गया! (Android पर अच्छा काम करेगा)');
    } catch (err) {
      console.error('ओरिएंटेशन लॉक फेल: ', err);
      alert('ओरिएंटेशन लॉक सपोर्ट नहीं करता ये डिवाइस/ब्राउजर।');
    }
  } else {
    alert('ओरिएंटेशन API सपोर्ट नहीं।');
  }
});
