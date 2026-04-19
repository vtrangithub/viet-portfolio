// ============================================================
//  useFadeUp.js — Custom React Hook
//
//  PURPOSE:
//  Adds the "vis" CSS class to any element with className="fu"
//  when that element scrolls into view. This triggers the
//  fade-up animation defined in index.css (.fu and .fu.vis).
//
//  USAGE:
//  1. Add className="fu" to any element you want to animate
//  2. Call useFadeUp() once in App.js
//  3. The hook handles everything else automatically
// ============================================================

import { useEffect } from 'react';

function useFadeUp() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add "vis" class → triggers CSS transition in index.css
            entry.target.classList.add('vis');
          }
        });
      },
      { threshold: 0.08 } // trigger when 8% of the element is visible
    );

    // Watch all elements that have the "fu" class
    document.querySelectorAll('.fu').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

export default useFadeUp;
