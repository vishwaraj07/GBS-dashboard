/* =============================================
   GBS AWARENESS DASHBOARD — SCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  // ============================================================
  // 1. NAVIGATION — Tab switching
  // ============================================================
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.section');

  function showSection(id) {
    sections.forEach(s => s.classList.remove('active'));
    navButtons.forEach(b => b.classList.remove('active'));

    const target = document.getElementById(id);
    if (target) target.classList.add('active');

    const btn = document.querySelector(`.nav-btn[data-section="${id}"]`);
    if (btn) btn.classList.add('active');

    // Close sidebar on mobile
    if (topnavLinks) topnavLinks.classList.remove('open');
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      showSection(this.dataset.section);
    });
  });

  // ============================================================
// 2. HAMBURGER MENU (top nav)
const hamburger = document.getElementById('hamburger');
const topnavLinks = document.getElementById('topnavLinks');

if (hamburger && topnavLinks) {
  hamburger.addEventListener('click', function () {
    topnavLinks.classList.toggle('open');
  });
}

  // ============================================================
  // 3. IMAGE SLIDER (Home page)
  // ============================================================
  const sliderTrack = document.getElementById('sliderTrack');
  const sliderPrev = document.getElementById('sliderPrev');
  const sliderNext = document.getElementById('sliderNext');
  const dotsContainer = document.getElementById('sliderDots');
  const slides = sliderTrack ? sliderTrack.querySelectorAll('.slide') : [];
  let currentSlide = 0;
  let sliderInterval = null;
  const totalSlides = slides.length;

  function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
  }

  function updateDots() {
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.slider-dot') : [];
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  }

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentSlide = index;
    if (sliderTrack) {
      sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    updateDots();
  }

  function startAutoPlay() {
    if (sliderInterval) clearInterval(sliderInterval);
    sliderInterval = setInterval(() => goToSlide(currentSlide + 1), 2000);
  }

  if (totalSlides > 0) {
    buildDots();
    startAutoPlay();

    sliderPrev.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
      startAutoPlay();
    });

    sliderNext.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
      startAutoPlay();
    });

    // Pause on hover
    sliderTrack.parentElement.addEventListener('mouseenter', () => clearInterval(sliderInterval));
    sliderTrack.parentElement.addEventListener('mouseleave', startAutoPlay);
  }

  // ============================================================
  // 4. SYMPTOMS — Interactive click cards
  // ============================================================


function attachSymptomListeners(gridId, panelId, textId) {
    const grid = document.getElementById(gridId);
    const panel = document.getElementById(panelId);
    const textEl = document.getElementById(textId);
    if (!grid || !panel || !textEl) return;

    let lastActive = null;

    grid.querySelectorAll('.symptom-card').forEach(card => {
      card.addEventListener('click', function () {
        if (lastActive === this) {
          this.classList.remove('active');
          panel.classList.remove('visible');
          lastActive = null;
          return;
        }
        grid.querySelectorAll('.symptom-card').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        lastActive = this;
        textEl.textContent = this.dataset.action;
        panel.classList.add('visible');
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    });

    const closeBtn = panel.querySelector('.close-action');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        panel.classList.remove('visible');
        grid.querySelectorAll('.symptom-card').forEach(c => c.classList.remove('active'));
        lastActive = null;
      });
    }
  }

attachSymptomListeners('symptomGrid', 'actionPanel1', 'actionText1');
attachSymptomListeners('emergencyGrid', 'actionPanel2', 'actionText2');


  // ============================================================
  // 5. PRECAUTION TABS
  // ============================================================
  const ptabs = document.querySelectorAll('.ptab');
  const ptabContents = document.querySelectorAll('.ptab-content');

  ptabs.forEach(tab => {
    tab.addEventListener('click', function () {
      ptabs.forEach(t => t.classList.remove('active'));
      ptabContents.forEach(c => c.classList.remove('active'));

      this.classList.add('active');
      const target = document.getElementById('ptab-' + this.dataset.ptab);
      if (target) target.classList.add('active');
    });
  });

  // ============================================================
  // 6. MYTH BUSTER — Accordion
  // ============================================================
  document.querySelectorAll('.myth-item').forEach(item => {
    const trigger = item.querySelector('.myth-trigger');
    if (trigger) {
      trigger.addEventListener('click', function () {
        const wasOpen = item.classList.contains('open');
        // Close all
        document.querySelectorAll('.myth-item').forEach(m => m.classList.remove('open'));
        // Toggle current
        if (!wasOpen) item.classList.add('open');
      });
    }
  });

  // ============================================================
  // 7. FAQ ACCORDION
  // ============================================================
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function () {
        const wasOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
      });
    }
  });

  // ============================================================
  // 8. MEDIA GALLERY — Dynamic image loading + Lightbox
  // ============================================================
// ============================================================
// 8. MEDIA GALLERY — Categories + Lightbox
// ============================================================

const galleryData = [
  // Comic Strips
  { src: 'images/gallery/comics/1.png', category: 'comics', caption: 'Comic Strip 1' },
  { src: 'images/gallery/comics/2.png', category: 'comics', caption: 'Comic Strip 2' },
  { src: 'images/gallery/comics/3.png', category: 'comics', caption: 'Comic Strip 3' },

  // Infographics
  { src: 'images/gallery/infographics/1.png', category: 'infographics', caption: 'Infographic 1' },
  { src: 'images/gallery/infographics/2.png', category: 'infographics', caption: 'Infographic 2' },
 
  // Nukkad Natak
  { src: 'images/gallery/nukkad/1.png', category: 'nukkad', caption: 'Nukkad Natak 1' },


  // Audio Materials

{ src: 'images/gallery/audio/1.mp3', category: 'audio', caption: 'Audio Material 1' },
{ src: 'images/gallery/audio/2.mp3', category: 'audio', caption: 'Audio Material 2' },
{ src: 'images/gallery/audio/3.mp3', category: 'audio', caption: 'Audio Material 3' },

  // Prevention Wall
  { src: 'images/gallery/prevention/1.png', category: 'prevention', caption: 'Prevention Wall 1' },

];

const galleryGrid = document.getElementById('galleryGrid');
const galleryTabs = document.querySelectorAll('.gtab');
let currentCategory = 'all';
let visibleImages = [];
let currentLightboxIndex = 0;

function buildGallery() {
  if (!galleryGrid) return;
  galleryGrid.innerHTML = '';

  const items = currentCategory === 'all'
    ? galleryData
    : galleryData.filter(item => item.category === currentCategory);

  visibleImages = [];

  if (items.length === 0) {
    galleryGrid.innerHTML = '<p style="color:var(--text-muted);font-size:0.9rem;padding:1rem 0;">No files in this category yet.</p>';
    return;
  }

  items.forEach((item) => {

    // AUDIO FILES
    if (item.src.endsWith('.mp3') || item.src.endsWith('.wav') || item.src.endsWith('.ogg')) {
      const div = document.createElement('div');
      div.className = 'gallery-item audio-card';
      div.innerHTML = `
        <div class="audio-card-inner">
          <div class="audio-icon">&#127925;</div>
          <p class="audio-title">${item.caption}</p>
          <audio controls>
            <source src="${item.src}" type="audio/mpeg">
            Your browser does not support audio.
          </audio>
        </div>`;
      galleryGrid.appendChild(div);
      return;
    }

    // IMAGE FILES
    const testImg = new Image();

    testImg.onload = function () {
      const idx = visibleImages.length;
      visibleImages.push({ src: item.src, caption: item.caption });

      const div = document.createElement('div');
      div.className = 'gallery-item';

      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.caption;
      img.loading = 'lazy';

      div.appendChild(img);
      div.addEventListener('click', () => openLightbox(idx));
      galleryGrid.appendChild(div);
    };

    testImg.onerror = function () {
      const div = document.createElement('div');
      div.className = 'gallery-item';
      div.innerHTML = `
        <div class="gallery-placeholder">
          <div class="gallery-placeholder-icon">&#128247;</div>
          <span>${item.caption}</span>
          <small>Add image to folder</small>
        </div>`;
      galleryGrid.appendChild(div);
    };

    testImg.src = item.src;
  });
}

galleryTabs.forEach(tab => {
  tab.addEventListener('click', function () {
    galleryTabs.forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    currentCategory = this.dataset.category;
    buildGallery();
  });
});

buildGallery();

// LIGHTBOX
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

function openLightbox(index) {
  if (!lightbox || visibleImages.length === 0) return;
  currentLightboxIndex = index;
  lightboxImg.src = visibleImages[index].src;
  lightboxCaption.textContent = visibleImages[index].caption + '  (' + (index + 1) + ' of ' + visibleImages.length + ')';
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function lightboxNavigate(direction) {
  if (visibleImages.length === 0) return;
  currentLightboxIndex = (currentLightboxIndex + direction + visibleImages.length) % visibleImages.length;
  lightboxImg.src = visibleImages[currentLightboxIndex].src;
  lightboxCaption.textContent = visibleImages[currentLightboxIndex].caption + '  (' + (currentLightboxIndex + 1) + ' of ' + visibleImages.length + ')';
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxPrev) lightboxPrev.addEventListener('click', () => lightboxNavigate(-1));
if (lightboxNext) lightboxNext.addEventListener('click', () => lightboxNavigate(1));

if (lightbox) {
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
}

document.addEventListener('keydown', function (e) {
  if (!lightbox || !lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lightboxNavigate(-1);
  if (e.key === 'ArrowRight') lightboxNavigate(1);
});

  // ============================================================
  // 9. TOUCH / SWIPE support for slider
  // ============================================================
  let touchStartX = 0;
  let touchEndX = 0;

  const sliderEl = document.querySelector('.slider-container');
  if (sliderEl) {
    sliderEl.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderEl.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        goToSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1);
        startAutoPlay();
      }
    }, { passive: true });
  }

}); // End DOMContentLoaded