// ============================================================
//  scrollTo.js — Scroll Utility
//
//  PURPOSE:
//  Smoothly scrolls the page to a section by its HTML id.
//  Used by the Nav buttons and Hero CTA buttons.
//
//  EXAMPLE:
//  scrollTo('projects')  → page scrolls to <section id="projects">
// ============================================================

function scrollTo(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default scrollTo;
