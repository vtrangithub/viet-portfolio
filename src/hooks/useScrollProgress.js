// ============================================================
//  useScrollProgress.js — Scroll Progress Bar Hook
//
//  Returns a number from 0-100 representing how far the user
//  has scrolled down the page.
//  Used by the ScrollProgressBar component.
// ============================================================

import { useState, useEffect } from 'react';

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    }
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return progress;
}

export default useScrollProgress;
