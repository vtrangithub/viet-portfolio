// ============================================================
//  Background.jsx — Decorative Background Elements
//
//  This component renders the visual background effects:
//  - A subtle grid of lines (like graph paper)
//  - Three soft glowing orbs (blurred color blobs)
//
//  These are purely decorative — they don't contain any content.
//  They are fixed to the screen so they stay in place while scrolling.
//  z-index: 0 keeps them behind all page content.
// ============================================================

import React from 'react';
import './Background.css';

function Background() {
  return (
    <>
      {/* Grid of faint horizontal and vertical lines */}
      <div className="bg-grid" />

      {/* Soft glowing color orbs — top-right purple, bottom-left cyan, center gold */}
      <div className="bg-orb orb-a" />
      <div className="bg-orb orb-b" />
      <div className="bg-orb orb-c" />
    </>
  );
}

export default Background;
