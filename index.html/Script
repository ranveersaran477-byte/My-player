// Video.js इनिशियलाइज
const player = videojs('my-video', {
  fluid: true,
  controls: true,
  playbackRates: [0.25, 0.5, 1, 1.5, 2, 4, 8],
  techOrder: ['html5'],
  preload: 'metadata',
  aspectRatio: '16:9'  // YouTube जैसा
});

// Seek थंबनेल प्रिव्यू (पहले से ठीक है)
player.spriteThumbnails({
  interval: 1,
  url: 'https://example.com/thumbnails-sprite.jpg',  // अपना बदलो
  width: 160,
  height: 90
});

// प्लेलिस्ट हैंडलिंग
const videoList = document.getElementById('videoList');
let currentVideoIndex = 0;  // ट्रैक इंडेक्स

function addToPlaylist(name, src) {
  const li = document.createElement('li');
  li.textContent = name;
  li.setAttribute('data-src', src);
  li.addEventListener('click', function() {
    videoList.querySelectorAll('li').forEach((i, idx) => {
      i.classList.remove('active');
      if (i === this) currentVideoIndex = idx;
    });
    this.classList.add('active');
    player.src({ type: 'video/mp4', src: this.getAttribute('data-src') });
    player.play();
  });
  videoList.appendChild(li);
}

// मौजूदा प्लेलिस्ट आइटम्स अपडेट (इंडेक्स ऐड)
const videoItems = videoList.querySelectorAll('li');
videoItems.forEach((item, idx) => {
  item.addEventListener('click', () => {
    currentVideoIndex = idx;
    videoItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    player.src({ type: 'video/mp4', src: item.getAttribute('data-src') });
    player.play();
  });
});

// नेक्स्ट/प्रिवियस
const prevBtn = document.getElementById('prev-video');
const nextBtn = document.getElementById('next-video');
prevBtn.addEventListener('click', () => {
  if (currentVideoIndex > 0) {
    currentVideoIndex--;
    videoList.querySelectorAll('li')[currentVideoIndex].click();
  }
});
nextBtn.addEventListener('click', () => {
  if (currentVideoIndex < videoList.children.length - 1) {
    currentVideoIndex++;
    videoList.querySelectorAll('li')[currentVideoIndex].click();
  }
});

// लोकल वीडियो अपलोड (पहले वाला)
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
      alert('टोटल साइज 500MB से ज्यादा हो गया!');
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
    currentVideoIndex = videoList.children.length - validFiles.length;  // अपडेट इंडेक्स
    alert(`${validFiles.length} वीडियो लोड हो गए!`);
  }
});

// सबटाइटल, स्पीड, फुलस्क्रीन, रोटेट (पहले वाला रखा)

// PWA इंस्टॉल बटन
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('install-app-btn').style.display = 'block';
});

document.getElementById('install-app-btn').addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('ऐप इंस्टॉल हो गया!');
    }
    deferredPrompt = null;
  }
});
