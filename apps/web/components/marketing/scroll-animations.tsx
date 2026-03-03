'use client';

import { useEffect } from 'react';

export function ScrollAnimations() {
  useEffect(() => {
    // Scroll progress bar
    const progressBar = document.getElementById('scrollProgress');
    const nav = document.getElementById('mainNav');

    const handleScroll = () => {
      const s = window.scrollY;
      const d = document.documentElement.scrollHeight - window.innerHeight;
      if (progressBar) {
        progressBar.style.width = (s / d * 100) + '%';
      }
      if (nav) {
        nav.classList.toggle('scrolled', s > 60);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal-up, .reveal-scale, .stat-cell').forEach((el) => {
      observer.observe(el);
    });

    // Counter animations
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          if (el.dataset.counted) return;
          el.dataset.counted = 'true';

          const target = parseFloat(el.dataset.target || '0');
          const suffix = el.dataset.suffix || '';
          const duration = 2000;
          const start = performance.now();

          function animate(now: number) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            el.textContent = Math.round(target * eased) + suffix;
            if (progress < 1) requestAnimationFrame(animate);
          }
          requestAnimationFrame(animate);
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('[data-counter]').forEach((el) => {
      counterObserver.observe(el);
    });

    // Drag scroll on features track
    const track = document.querySelector('.features-track') as HTMLElement | null;
    if (track) {
      let isDragging = false;
      let startX = 0;
      let scrollLeft = 0;

      track.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
        track.style.cursor = 'grabbing';
      });

      track.addEventListener('mouseleave', () => {
        isDragging = false;
        track.style.cursor = '';
      });

      track.addEventListener('mouseup', () => {
        isDragging = false;
        track.style.cursor = '';
      });

      track.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        track.scrollLeft = scrollLeft - (e.pageX - track.offsetLeft - startX) * 1.5;
      });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      counterObserver.disconnect();
    };
  }, []);

  return null;
}
