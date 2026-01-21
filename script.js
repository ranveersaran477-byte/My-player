<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>4K लोकल वीडियो प्लेयर - एडवांस फीचर्स</title>
  <!-- Video.js CDN -->
  <link href="https://vjs.zencdn.net/8.10.0/video-js.css" rel="stylesheet" />
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <div class="container">
    <h1>एडवांस 4K लोकल वीडियो प्लेयर</h1>

    <!-- मुख्य प्लेयर -->
    <div class="player-section">
      <video id="my-video" class="video-js vjs-big-play-centered" controls preload="auto" width="100%" height="500" poster="poster.jpg">
        <!-- डिफॉल्ट सोर्स (टेस्ट के लिए, लोकल अपलोड के बाद चेंज होगा) -->
        <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4">
        <!-- मल्टीपल क्वालिटी ऐड करने का एक्जाम्पल (अपनी HD/4K फाइल्स डालो - अच्छी क्वालिटी के लिए) -->
        <!-- <source src="videos/my-video-4k.mp4" type="video/mp4" label="4K" res="2160"> -->
        <!-- <source src="videos/my-video-hd.mp4" type="video/mp4" label="HD" res="1080"> -->
        <!-- <source src="videos/my-video-720.mp4" type="video/mp4" label="720p" res="720"> -->
        <!-- डिफॉल्ट सबटाइटल (अपना VTT डालो) -->
        <track kind="subtitles" src="https://example.com/subtitles.vtt" srclang="hi" label="हिंदी" default>
        <p class="vjs-no-js">वीडियो प्लेयर सपोर्ट नहीं करता।</p>
      </video>

      <!-- कस्टम कंट्रोल्स -->
      <div class="custom-controls">
        <label>लोकल वीडियो अपलोड (एक साथ कई):</label>
        <input type="file" id="video-upload" accept="video/mp4" multiple>
        <button id="load-video">लोड करो</button>

        <label>कस्टम सबटाइटल अपलोड:</label>
        <input type="file" id="subtitle-upload" accept=".vtt,.srt">
        <button id="add-subtitle">ऐड करो</button>

        <label>प्लेबैक स्पीड:</label>
        <select id="speed-select">
          <option value="0.25">0.25x</option>
          <option value="0.5">0.5x</option>
          <option value="1" selected>1x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
          <option value="4">4x</option>
          <option value="8">8x</option>
        </select>

        <button id="fullscreen-btn">फुल स्क्रीन</button>
      </div>

      <!-- क्रेडिट -->
      <p class="credit">Made by Bhai Gouri Shankar</p>

      <!-- वार्निंग बॉक्स -->
      <div class="warning-box">
        लक्ष्य अश्लील वीडियो मत चलाना 😄
      </div>
    </div>

    <!-- प्लेलिस्ट (ऑप्शनल, मल्टीपल वीडियो) -->
    <div class="playlist">
      <h2>वीडियो लिस्ट</h2>
      <ul id="videoList">
        <li class="active" data-src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4">टेस्ट वीडियो 1 (HD)</li>
        <li data-src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4">वीडियो 2</li>
        <!-- अपलोडेड फाइल्स यहाँ ऑटो ऐड होंगी -->
      </ul>
    </div>
  </div>

  <!-- Video.js स्क्रिप्ट -->
  <script src="https://vjs.zencdn.net/8.10.0/video.min.js"></script>
  <script src="script.js"></script>
</body>
</html>
