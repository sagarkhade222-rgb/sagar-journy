/* ============================================
   SAGAR'S JOURNEY — JavaScript
   Animations, Particles, Easter Eggs, Music
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ========== NAVIGATION ==========
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const navLinksContainer = document.getElementById('navLinks');
  const hamburger = document.getElementById('navHamburger');

  // Scroll-based nav styling
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNav();
  });

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksContainer.classList.toggle('open');
  });

  // Close mobile nav on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksContainer.classList.remove('open');
    });
  });

  // Active nav based on scroll position
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Smooth scroll for "Start My Story" button
  const startBtn = document.getElementById('startStoryBtn');
  if (startBtn) {
    startBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector('#journey');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // ========== SCROLL REVEAL ==========
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const timelineItems = document.querySelectorAll('.timeline-item');
  const futureSection = document.querySelector('.future-section');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));
  timelineItems.forEach(el => revealObserver.observe(el));

  // Future section observer
  const futureObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.3 });

  if (futureSection) {
    futureObserver.observe(futureSection);
  }

  // ========== AMBIENT PARTICLES ==========
  const particlesCanvas = document.getElementById('particles-canvas');
  const pCtx = particlesCanvas.getContext('2d');
  let particles = [];

  function resizeParticlesCanvas() {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
  }

  resizeParticlesCanvas();
  window.addEventListener('resize', resizeParticlesCanvas);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * particlesCanvas.width;
      this.y = Math.random() * particlesCanvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.3 + 0.05;
      this.fadeSpeed = Math.random() * 0.005 + 0.002;
      this.growing = Math.random() > 0.5;

      // Warm pastel colors
      const colors = [
        'rgba(232, 160, 191,',  // rose
        'rgba(255, 218, 193,',  // peach
        'rgba(199, 206, 234,',  // lavender
        'rgba(246, 211, 101,',  // gold
        'rgba(181, 234, 215,',  // mint
        'rgba(255, 209, 220,',  // pink
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.growing) {
        this.opacity += this.fadeSpeed;
        if (this.opacity >= 0.35) this.growing = false;
      } else {
        this.opacity -= this.fadeSpeed;
        if (this.opacity <= 0.02) this.growing = true;
      }

      // Wrap around
      if (this.x < -10) this.x = particlesCanvas.width + 10;
      if (this.x > particlesCanvas.width + 10) this.x = -10;
      if (this.y < -10) this.y = particlesCanvas.height + 10;
      if (this.y > particlesCanvas.height + 10) this.y = -10;
    }

    draw() {
      pCtx.beginPath();
      pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      pCtx.fillStyle = `${this.color} ${this.opacity})`;
      pCtx.fill();
    }
  }

  // Create particles
  const particleCount = Math.min(80, Math.floor(window.innerWidth / 15));
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    pCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // ========== FIREFLIES ==========
  const firefliesCanvas = document.getElementById('fireflies-canvas');
  const fCtx = firefliesCanvas.getContext('2d');
  let fireflies = [];

  function resizeFirefliesCanvas() {
    firefliesCanvas.width = window.innerWidth;
    firefliesCanvas.height = window.innerHeight;
  }

  resizeFirefliesCanvas();
  window.addEventListener('resize', resizeFirefliesCanvas);

  class Firefly {
    constructor() {
      this.x = Math.random() * firefliesCanvas.width;
      this.y = Math.random() * firefliesCanvas.height;
      this.size = Math.random() * 2.5 + 1;
      this.angle = Math.random() * Math.PI * 2;
      this.speed = Math.random() * 0.4 + 0.1;
      this.wobble = Math.random() * 0.02 + 0.005;
      this.opacity = 0;
      this.maxOpacity = Math.random() * 0.6 + 0.2;
      this.phase = Math.random() * Math.PI * 2;
      this.glowSize = this.size * 4;
    }

    update() {
      this.angle += this.wobble * Math.sin(Date.now() * 0.001 + this.phase);
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;

      // Pulsing glow
      this.opacity = this.maxOpacity * (0.5 + 0.5 * Math.sin(Date.now() * 0.003 + this.phase));

      // Wrap around
      if (this.x < -20) this.x = firefliesCanvas.width + 20;
      if (this.x > firefliesCanvas.width + 20) this.x = -20;
      if (this.y < -20) this.y = firefliesCanvas.height + 20;
      if (this.y > firefliesCanvas.height + 20) this.y = -20;
    }

    draw() {
      // Outer glow
      const gradient = fCtx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.glowSize
      );
      gradient.addColorStop(0, `rgba(246, 211, 101, ${this.opacity * 0.6})`);
      gradient.addColorStop(0.4, `rgba(246, 211, 101, ${this.opacity * 0.2})`);
      gradient.addColorStop(1, 'rgba(246, 211, 101, 0)');

      fCtx.beginPath();
      fCtx.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2);
      fCtx.fillStyle = gradient;
      fCtx.fill();

      // Core
      fCtx.beginPath();
      fCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      fCtx.fillStyle = `rgba(255, 245, 200, ${this.opacity})`;
      fCtx.fill();
    }
  }

  const fireflyCount = Math.min(25, Math.floor(window.innerWidth / 60));
  for (let i = 0; i < fireflyCount; i++) {
    fireflies.push(new Firefly());
  }

  function animateFireflies() {
    fCtx.clearRect(0, 0, firefliesCanvas.width, firefliesCanvas.height);
    fireflies.forEach(f => {
      f.update();
      f.draw();
    });
    requestAnimationFrame(animateFireflies);
  }
  animateFireflies();

  // ========== SHOOTING STARS ==========
  const shootingCanvas = document.getElementById('shooting-stars-canvas');
  const sCtx = shootingCanvas.getContext('2d');
  let shootingStars = [];

  function resizeShootingCanvas() {
    shootingCanvas.width = window.innerWidth;
    shootingCanvas.height = window.innerHeight;
  }

  resizeShootingCanvas();
  window.addEventListener('resize', resizeShootingCanvas);

  class ShootingStar {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * shootingCanvas.width * 0.8;
      this.y = Math.random() * shootingCanvas.height * 0.3;
      this.length = Math.random() * 80 + 40;
      this.speed = Math.random() * 6 + 4;
      this.angle = (Math.random() * 30 + 20) * Math.PI / 180;
      this.opacity = 1;
      this.fadeRate = Math.random() * 0.02 + 0.01;
      this.active = true;
    }

    update() {
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      this.opacity -= this.fadeRate;

      if (this.opacity <= 0 || this.x > shootingCanvas.width || this.y > shootingCanvas.height) {
        this.active = false;
      }
    }

    draw() {
      if (!this.active) return;

      const tailX = this.x - Math.cos(this.angle) * this.length;
      const tailY = this.y - Math.sin(this.angle) * this.length;

      const gradient = sCtx.createLinearGradient(tailX, tailY, this.x, this.y);
      gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
      gradient.addColorStop(1, `rgba(255, 245, 220, ${this.opacity})`);

      sCtx.beginPath();
      sCtx.moveTo(tailX, tailY);
      sCtx.lineTo(this.x, this.y);
      sCtx.strokeStyle = gradient;
      sCtx.lineWidth = 1.5;
      sCtx.stroke();

      // Head glow
      sCtx.beginPath();
      sCtx.arc(this.x, this.y, 2, 0, Math.PI * 2);
      sCtx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      sCtx.fill();
    }
  }

  // Randomly spawn shooting stars
  setInterval(() => {
    if (Math.random() > 0.6) {
      const star = new ShootingStar();
      shootingStars.push(star);
    }
  }, 3000);

  function animateShootingStars() {
    sCtx.clearRect(0, 0, shootingCanvas.width, shootingCanvas.height);
    shootingStars = shootingStars.filter(s => s.active);
    shootingStars.forEach(s => {
      s.update();
      s.draw();
    });
    requestAnimationFrame(animateShootingStars);
  }
  animateShootingStars();

  // ========== FALLING LEAVES ==========
  const leavesContainer = document.getElementById('leaves-container');
  const leafEmojis = ['🍂', '🍃', '🌸', '🌿', '🍁'];

  function createLeaf() {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.textContent = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
    leaf.style.left = Math.random() * 100 + '%';
    leaf.style.fontSize = (Math.random() * 14 + 12) + 'px';
    leaf.style.animationDuration = (Math.random() * 15 + 15) + 's';
    leaf.style.animationDelay = Math.random() * 5 + 's';
    leaf.style.opacity = Math.random() * 0.4 + 0.2;
    leavesContainer.appendChild(leaf);

    // Remove after animation
    setTimeout(() => {
      if (leaf.parentNode) leaf.remove();
    }, 35000);
  }

  // Create initial leaves
  for (let i = 0; i < 8; i++) {
    setTimeout(createLeaf, i * 2000);
  }

  // Continuously create leaves
  setInterval(createLeaf, 4000);

  // ========== FUTURE SECTION STARS ==========
  const starsCanvas = document.getElementById('stars-canvas');
  if (starsCanvas) {
    const stCtx = starsCanvas.getContext('2d');
    let futureStars = [];

    function resizeStarsCanvas() {
      starsCanvas.width = starsCanvas.parentElement.offsetWidth;
      starsCanvas.height = starsCanvas.parentElement.offsetHeight;
    }

    resizeStarsCanvas();
    window.addEventListener('resize', resizeStarsCanvas);

    class FutureStar {
      constructor() {
        this.x = Math.random() * starsCanvas.width;
        this.y = Math.random() * starsCanvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.opacity = 0;
        this.maxOpacity = Math.random() * 0.7 + 0.3;
        this.speed = Math.random() * 0.01 + 0.005;
        this.phase = Math.random() * Math.PI * 2;
      }

      update(sectionVisible) {
        if (sectionVisible) {
          this.opacity = Math.min(this.opacity + 0.005, this.maxOpacity);
        }
        this.opacity *= (0.7 + 0.3 * Math.sin(Date.now() * this.speed + this.phase));
      }

      draw() {
        stCtx.beginPath();
        stCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        stCtx.fillStyle = `rgba(246, 211, 101, ${this.opacity})`;
        stCtx.fill();

        // Tiny glow
        if (this.size > 1.5) {
          stCtx.beginPath();
          stCtx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
          stCtx.fillStyle = `rgba(246, 211, 101, ${this.opacity * 0.15})`;
          stCtx.fill();
        }
      }
    }

    for (let i = 0; i < 120; i++) {
      futureStars.push(new FutureStar());
    }

    function animateFutureStars() {
      stCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
      const isVisible = futureSection && futureSection.classList.contains('visible');
      futureStars.forEach(s => {
        s.update(isVisible);
        s.draw();
      });
      requestAnimationFrame(animateFutureStars);
    }
    animateFutureStars();
  }

  // ========== FRIEND CARD PARTICLES ==========
  document.querySelectorAll('.friend-card').forEach(card => {
    const particleContainer = card.querySelector('.friend-particles');
    if (!particleContainer) return;

    let friendParticles = [];

    card.addEventListener('mouseenter', () => {
      // Create particles
      for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.style.cssText = `
          position: absolute;
          width: ${Math.random() * 4 + 2}px;
          height: ${Math.random() * 4 + 2}px;
          border-radius: 50%;
          background: rgba(232, 160, 191, ${Math.random() * 0.5 + 0.2});
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          pointer-events: none;
          animation: friendParticleFloat ${Math.random() * 2 + 2}s ease-in-out infinite;
          animation-delay: ${Math.random() * 1}s;
        `;
        particleContainer.appendChild(p);
        friendParticles.push(p);
      }
    });

    card.addEventListener('mouseleave', () => {
      friendParticles.forEach(p => p.remove());
      friendParticles = [];
    });
  });

  // Add friend particle animation
  const friendParticleStyle = document.createElement('style');
  friendParticleStyle.textContent = `
    @keyframes friendParticleFloat {
      0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
      50% { transform: translateY(-20px) scale(1.5); opacity: 1; }
    }
  `;
  document.head.appendChild(friendParticleStyle);

  // ========== EASTER EGG STARS ==========
  document.querySelectorAll('.easter-egg-star').forEach(star => {
    star.addEventListener('click', () => {
      star.classList.add('found');

      // Create burst effect
      for (let i = 0; i < 8; i++) {
        const spark = document.createElement('div');
        const angle = (i / 8) * Math.PI * 2;
        const distance = 40;
        spark.style.cssText = `
          position: fixed;
          left: ${star.getBoundingClientRect().left + star.offsetWidth / 2}px;
          top: ${star.getBoundingClientRect().top + star.offsetHeight / 2}px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(246, 211, 101, 0.8);
          pointer-events: none;
          z-index: 1000;
          transition: all 0.6s ease-out;
        `;
        document.body.appendChild(spark);

        requestAnimationFrame(() => {
          spark.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
          spark.style.opacity = '0';
        });

        setTimeout(() => spark.remove(), 600);
      }

      // Show tooltip
      const tooltip = document.createElement('div');
      tooltip.textContent = star.title;
      tooltip.style.cssText = `
        position: fixed;
        left: ${star.getBoundingClientRect().left - 60}px;
        top: ${star.getBoundingClientRect().top - 40}px;
        background: rgba(255, 253, 249, 0.95);
        backdrop-filter: blur(10px);
        padding: 8px 16px;
        border-radius: 20px;
        font-family: 'Caveat', cursive;
        font-size: 14px;
        color: #5A5A72;
        box-shadow: 0 4px 20px rgba(232, 160, 191, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.4);
        z-index: 1001;
        pointer-events: none;
        opacity: 0;
        transition: all 0.4s ease;
        white-space: nowrap;
      `;
      document.body.appendChild(tooltip);

      requestAnimationFrame(() => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(-10px)';
      });

      setTimeout(() => {
        tooltip.style.opacity = '0';
        setTimeout(() => tooltip.remove(), 400);
      }, 2500);
    });
  });

  // ========== MUSIC PLAYER ==========
  const musicPlayer = document.getElementById('musicPlayer');
  const musicToggle = document.getElementById('musicToggle');
  let audioCtx = null;
  let isPlaying = false;
  let pianoInterval = null;

  // Simple piano synthesizer using Web Audio API
  function createPianoAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  }

  // Piano notes in a beautiful emotional progression
  const pianoNotes = [
    // Frequencies for a gentle emotional melody
    { freq: 523.25, dur: 0.8 },  // C5
    { freq: 659.25, dur: 0.6 },  // E5
    { freq: 783.99, dur: 0.8 },  // G5
    { freq: 698.46, dur: 0.6 },  // F5
    { freq: 659.25, dur: 1.0 },  // E5
    { freq: 523.25, dur: 0.6 },  // C5
    { freq: 587.33, dur: 0.8 },  // D5
    { freq: 523.25, dur: 1.2 },  // C5
    { freq: 392.00, dur: 0.8 },  // G4
    { freq: 440.00, dur: 0.6 },  // A4
    { freq: 523.25, dur: 0.8 },  // C5
    { freq: 493.88, dur: 0.6 },  // B4
    { freq: 440.00, dur: 1.0 },  // A4
    { freq: 392.00, dur: 0.8 },  // G4
    { freq: 349.23, dur: 0.6 },  // F4
    { freq: 329.63, dur: 1.2 },  // E4
  ];

  let currentNote = 0;

  function playNote(freq, duration) {
    if (!audioCtx || audioCtx.state === 'closed') return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    // Softer sine-like sound
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    // Gentle filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, audioCtx.currentTime);

    // Piano-like envelope
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.04, audioCtx.currentTime + duration * 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + duration);

    // Add harmonics for richness
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, audioCtx.currentTime);
    gain2.gain.setValueAtTime(0, audioCtx.currentTime);
    gain2.gain.linearRampToValueAtTime(0.02, audioCtx.currentTime + 0.05);
    gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration * 0.8);

    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.start(audioCtx.currentTime);
    osc2.stop(audioCtx.currentTime + duration);
  }

  function startMusic() {
    createPianoAudio();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    function playNextNote() {
      if (!isPlaying) return;
      const note = pianoNotes[currentNote];
      playNote(note.freq, note.dur);
      currentNote = (currentNote + 1) % pianoNotes.length;
      pianoInterval = setTimeout(playNextNote, note.dur * 1000 + 200);
    }

    playNextNote();
  }

  function stopMusic() {
    if (pianoInterval) {
      clearTimeout(pianoInterval);
      pianoInterval = null;
    }
  }

  musicToggle.addEventListener('click', () => {
    isPlaying = !isPlaying;

    if (isPlaying) {
      musicPlayer.classList.add('music-playing');
      musicToggle.querySelector('.music-off').style.display = 'none';
      musicToggle.querySelector('.music-on').style.display = 'block';
      startMusic();
    } else {
      musicPlayer.classList.remove('music-playing');
      musicToggle.querySelector('.music-off').style.display = 'block';
      musicToggle.querySelector('.music-on').style.display = 'none';
      stopMusic();
    }
  });

  // ========== PARALLAX MOVEMENT ==========
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function updateParallax() {
    const heroSunlight = document.querySelector('.hero-sunlight');
    if (heroSunlight) {
      heroSunlight.style.transform = `translate(${mouseX * 15}px, ${mouseY * 15}px)`;
    }

    requestAnimationFrame(updateParallax);
  }
  updateParallax();

  // ========== ANIMATED BIRDS (Easter Egg) ==========
  function createBird() {
    const bird = document.createElement('div');
    const startY = Math.random() * window.innerHeight * 0.4;
    const duration = Math.random() * 8 + 8;

    bird.textContent = '🕊️';
    bird.style.cssText = `
      position: fixed;
      left: -40px;
      top: ${startY}px;
      font-size: ${Math.random() * 8 + 14}px;
      opacity: ${Math.random() * 0.3 + 0.15};
      z-index: 1;
      pointer-events: none;
      transition: none;
      animation: birdCross ${duration}s linear forwards;
    `;
    document.body.appendChild(bird);

    setTimeout(() => bird.remove(), duration * 1000);
  }

  // Add bird animation
  const birdStyle = document.createElement('style');
  birdStyle.textContent = `
    @keyframes birdCross {
      0% { transform: translateX(0) translateY(0); }
      25% { transform: translateX(${window.innerWidth * 0.3}px) translateY(-30px); }
      50% { transform: translateX(${window.innerWidth * 0.6}px) translateY(10px); }
      75% { transform: translateX(${window.innerWidth * 0.85}px) translateY(-20px); }
      100% { transform: translateX(${window.innerWidth + 60}px) translateY(-40px); opacity: 0; }
    }
  `;
  document.head.appendChild(birdStyle);

  // Spawn birds periodically
  setInterval(() => {
    if (Math.random() > 0.5) {
      createBird();
      // Sometimes create a pair
      if (Math.random() > 0.6) {
        setTimeout(createBird, 800);
      }
    }
  }, 12000);

  // Initial birds
  setTimeout(createBird, 4000);
  setTimeout(createBird, 5500);

  // ========== WEATHER EFFECT: Gentle Rain (Hidden Easter Egg) ==========
  let rainActive = false;
  let rainDrops = [];

  // Double-click on any quote section to activate rain
  document.querySelectorAll('.quote-section').forEach(section => {
    section.addEventListener('dblclick', () => {
      rainActive = !rainActive;
      if (rainActive) {
        startRainEffect();
      } else {
        stopRainEffect();
      }
    });
  });

  function startRainEffect() {
    const rainContainer = document.createElement('div');
    rainContainer.id = 'rain-effect';
    rainContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 2;
      overflow: hidden;
    `;
    document.body.appendChild(rainContainer);

    function createRainDrop() {
      if (!rainActive) return;
      const drop = document.createElement('div');
      drop.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        top: -10px;
        width: 1px;
        height: ${Math.random() * 15 + 10}px;
        background: linear-gradient(to bottom, transparent, rgba(199, 206, 234, 0.3));
        animation: rainDrop ${Math.random() * 0.5 + 0.5}s linear forwards;
      `;
      rainContainer.appendChild(drop);
      setTimeout(() => drop.remove(), 1000);
    }

    const rainInterval = setInterval(() => {
      if (!rainActive) {
        clearInterval(rainInterval);
        return;
      }
      for (let i = 0; i < 5; i++) {
        createRainDrop();
      }
    }, 50);
  }

  function stopRainEffect() {
    const rainEl = document.getElementById('rain-effect');
    if (rainEl) rainEl.remove();
  }

  // Rain animation
  const rainStyle = document.createElement('style');
  rainStyle.textContent = `
    @keyframes rainDrop {
      to { transform: translateY(105vh); }
    }
  `;
  document.head.appendChild(rainStyle);

  // ========== CURSOR TRAIL (Subtle) ==========
  document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.92) {
      const trail = document.createElement('div');
      trail.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        border-radius: 50%;
        background: rgba(232, 160, 191, ${Math.random() * 0.3 + 0.1});
        pointer-events: none;
        z-index: 9999;
        transition: all 1s ease-out;
      `;
      document.body.appendChild(trail);

      requestAnimationFrame(() => {
        trail.style.transform = `translateY(-${Math.random() * 30 + 10}px)`;
        trail.style.opacity = '0';
      });

      setTimeout(() => trail.remove(), 1000);
    }
  });

  // ========== MEMORY NOTES ROTATION HOVER FIX ==========
  document.querySelectorAll('.memory-note').forEach(note => {
    const rotation = note.getAttribute('data-rotation') || 0;
    note.style.transform = `rotate(${rotation}deg)`;

    note.addEventListener('mouseenter', () => {
      note.style.transform = 'rotate(0deg) translateY(-8px)';
      note.style.boxShadow = '0 20px 50px rgba(232, 160, 191, 0.2)';
    });

    note.addEventListener('mouseleave', () => {
      note.style.transform = `rotate(${rotation}deg)`;
      note.style.boxShadow = '';
    });
  });

  // ========== RANDOM FLOATING EMOJIS (Easter Egg) ==========
  const floatingEmojis = ['✨', '💫', '🌟', '⭐', '🦋', '🌸'];

  setInterval(() => {
    if (Math.random() > 0.7) {
      const emoji = document.createElement('div');
      emoji.textContent = floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)];
      emoji.style.cssText = `
        position: fixed;
        left: ${Math.random() * window.innerWidth}px;
        bottom: -20px;
        font-size: ${Math.random() * 12 + 10}px;
        opacity: 0;
        pointer-events: none;
        z-index: 1;
        animation: floatUp ${Math.random() * 4 + 4}s ease-out forwards;
      `;
      document.body.appendChild(emoji);
      setTimeout(() => emoji.remove(), 8000);
    }
  }, 5000);

  const floatUpStyle = document.createElement('style');
  floatUpStyle.textContent = `
    @keyframes floatUp {
      0% { transform: translateY(0) rotate(0deg); opacity: 0; }
      20% { opacity: 0.4; }
      80% { opacity: 0.2; }
      100% { transform: translateY(-${window.innerHeight + 40}px) rotate(360deg); opacity: 0; }
    }
  `;
  document.head.appendChild(floatUpStyle);

  // ========== CONSOLE EASTER EGG ==========
  console.log('%c🌸 Sagar\'s Journey 🌸', 'font-size: 24px; font-family: serif; color: #E8A0BF;');
  console.log('%cA story still being written...', 'font-size: 14px; font-family: cursive; color: #8E8EA0;');
  console.log('%c💜 Thank you for visiting this journey. You are now part of the story.', 'font-size: 12px; color: #C7CEEA;');

});
