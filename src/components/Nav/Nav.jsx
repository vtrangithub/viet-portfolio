// ============================================================
//  Nav.jsx — Navigation with Dark/Light Mode Toggle
//
//  PROPS:
//  - active: currently visible section id
//  - onResumeOpen: opens resume modal
//  - theme: "dark" | "light"
//  - onThemeToggle: toggles the theme
// ============================================================

import React, { useState } from 'react';
import './Nav.css';
import scrollTo from '../../utils/scrollTo';

const NAV_IDS = ['hero', 'skills', 'projects', 'mission-control', 'career', 'blog', 'hobbies', 'music', 'contact'];
const NAV_LABELS = {
  hero: 'Home', skills: 'Skills', projects: 'Projects',
  'mission-control': 'Mission', career: 'Career',
  blog: 'Blog', hobbies: 'Hobbies', music: 'Music', contact: 'Contact',
};

function Nav({ active, onResumeOpen, theme, onThemeToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleNavClick(id) { scrollTo(id); setMenuOpen(false); }
  function handleResumeClick() { onResumeOpen(); setMenuOpen(false); }
  function handleThemeClick() { onThemeToggle(); setMenuOpen(false); }

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo" onClick={() => handleNavClick('hero')}>
          <b>Viet</b>.dev
        </div>

        {/* Desktop links */}
        <ul className="nav-links">
          {NAV_IDS.map(id => (
            <li key={id}>
              <button className={`nav-btn ${active === id ? 'active' : ''}`} onClick={() => handleNavClick(id)}>
                {NAV_LABELS[id]}
              </button>
            </li>
          ))}
          <li><button className="nav-resume-btn" onClick={handleResumeClick}>Resume</button></li>
          {/* Dark/Light toggle */}
          <li>
            <button className="theme-btn" onClick={onThemeToggle} title="Toggle theme">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </li>
        </ul>

        {/* Hamburger — mobile only */}
        <button
          className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(p => !p)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`nav-drawer ${menuOpen ? 'open' : ''}`}>
        {NAV_IDS.map(id => (
          <button key={id} className={`nav-drawer-item ${active === id ? 'active' : ''}`} onClick={() => handleNavClick(id)}>
            {NAV_LABELS[id]}
          </button>
        ))}
        <button className="nav-drawer-resume" onClick={handleResumeClick}>View Resume</button>
        <button className="nav-drawer-theme" onClick={handleThemeClick}>
          {theme === 'dark' ? '☀️  Light Mode' : '🌙  Dark Mode'}
        </button>
      </div>
    </>
  );
}

export default Nav;
