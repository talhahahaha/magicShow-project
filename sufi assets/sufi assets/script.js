(() => {
  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Lightbox for images
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const gallery = document.getElementById('gallery-grid');

  function openLightbox(src, alt, caption) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || 'Preview';
    if (lightboxCaption) lightboxCaption.textContent = caption || alt || '';
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImg) return;
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.removeAttribute('src');
    document.body.style.overflow = '';
  }

  if (gallery) {
    gallery.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.tagName === 'IMG') {
        const figure = target.closest('figure');
        const captionEl = figure ? figure.querySelector('figcaption') : null;
        const captionText = captionEl ? captionEl.textContent : target.alt;
        openLightbox(target.src, target.alt, captionText);
      }
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // Image error handling: hide broken images and show placeholder caption
  if (gallery) {
    gallery.querySelectorAll('img').forEach((img) => {
      img.addEventListener('error', () => {
        img.style.display = 'none';
        const figure = img.closest('figure');
        if (figure) {
          const cap = figure.querySelector('figcaption');
          if (cap) cap.textContent = 'Image unavailable';
        }
      });
    });
  }

  // Smooth scroll for header links
  document.querySelectorAll('.header-actions a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Header shadow on scroll
  const header = document.getElementById('site-header');
  const applyHeaderShadow = () => {
    if (!header) return;
    if (window.scrollY > 4) {
      header.style.boxShadow = '0 10px 30px -15px rgba(0,0,0,.15)';
    } else {
      header.style.boxShadow = 'none';
    }
  };
  applyHeaderShadow();
  window.addEventListener('scroll', applyHeaderShadow);
})();


