document.addEventListener('DOMContentLoaded', () => {
  const images = [
    'maxresdefault.jpg',
    'aaaaaaaaaaaa.jpg',
    'jhj.jpg',
    'anime-meme-pfp-cnuq70iv0iccx8gt.jpg'
  ];

  // Cursor follower
  const cursor = document.getElementById('cursorFollow');
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
  });

  // Dankness counter
  let count = 0;
  const memeCount = document.getElementById('memeCount');
  const counterInterval = setInterval(() => {
    count++;
    memeCount.textContent = count;
    if (count >= 100) clearInterval(counterInterval);
  }, 30);

  // Random meme button
  document.getElementById('randomBtn').addEventListener('click', () => {
    const randomImg = images[Math.floor(Math.random() * images.length)];
    showBigMeme(randomImg);
  });

  // Dance mode toggle
  let danceOn = false;
  const danceMusic = document.getElementById('danceMusic');
  danceMusic.volume = 0.57;
  const danceVideo = document.getElementById('danceVideo');
  const danceVideoContainer = document.getElementById('danceVideoContainer');

  function startDance() {
    document.body.classList.add('dance-mode');
    danceVideoContainer.classList.add('active');
    danceVideo.play().catch(() => {});
    danceMusic.pause();
  }

  function stopDance() {
    document.body.classList.remove('dance-mode');
    danceVideoContainer.classList.remove('active');
    danceVideo.pause();
    danceVideo.currentTime = 0;
    danceMusic.pause();
    danceMusic.currentTime = 0;
  }

  document.getElementById('danceBtn').addEventListener('click', () => {
    danceOn = !danceOn;
    if (danceOn) {
      startDance();
    } else {
      stopDance();
    }
  });

  document.getElementById('closeDanceVideo').addEventListener('click', () => {
    danceOn = false;
    stopDance();
  });

  danceVideoContainer.addEventListener('click', (e) => {
    if (e.target.id === 'danceVideoContainer') {
      danceOn = false;
      stopDance();
    }
  });

  // Glitch mode toggle
  let glitchOn = false;
  document.getElementById('glitchBtn').addEventListener('click', () => {
    glitchOn = !glitchOn;
    document.body.classList.toggle('glitch-mode', glitchOn);
  });

  // Meme card click -> big meme
  document.querySelectorAll('.meme-card').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      if (img) showBigMeme(img.src);
    });
  });

  // Close big meme
  document.getElementById('closeMeme').addEventListener('click', hideBigMeme);
  document.getElementById('bigMeme').addEventListener('click', (e) => {
    if (e.target.id === 'bigMeme') hideBigMeme();
  });

  function showBigMeme(src) {
    const modal = document.getElementById('bigMeme');
    const img = document.getElementById('bigMemeImg');
    img.src = src;
    modal.classList.add('active');
  }

  function hideBigMeme() {
    document.getElementById('bigMeme').classList.remove('active');
  }

  // Konami code easter egg
  let konami = [];
  const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  document.addEventListener('keydown', (e) => {
    konami.push(e.key);
    konami = konami.slice(-10);
    if (konami.join(',') === konamiCode.join(',')) {
      document.body.classList.toggle('dance-mode');
      document.body.classList.toggle('glitch-mode');
      alert('秘密のミームモード発動！！');
    }
  });
});
