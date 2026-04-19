// ============================================================
//  useActiveSection.js — Custom React Hook
//
//  PURPOSE:
//  Watches which section is visible on screen and returns its id.
//  The Nav component uses this to highlight the active menu item.
//
//  HOW IT WORKS:
//  IntersectionObserver is a browser API that fires a callback
//  whenever a watched element enters or exits the viewport.
//  We watch all section ids and update `active` when one is visible.
// ============================================================

import { useState, useEffect } from 'react';

function useActiveSection(ids) {
  // `active` stores the id of the currently visible section
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    // rootMargin shrinks the detection zone so a section is only
    // "active" when it's roughly in the middle of the screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    // Attach the observer to each section element
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Cleanup: disconnect observer when component unmounts
    return () => observer.disconnect();
  }, []); // empty array = run only once on mount

  return active;
}

export default useActiveSection;
