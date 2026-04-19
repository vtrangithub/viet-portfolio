// ============================================================
//  Hero.jsx — Full-Screen Landing Section
//
//  Features:
//  - Profile photo (circular with glow animation)
//  - Typing animation cycling through roles
//  - Responsive: photo stacks above content on mobile
//
//  TO ADD YOUR PHOTO:
//  1. Copy your photo to the /public folder e.g. public/profile.jpg
//  2. In src/data.js change: photo: null → photo: "/profile.jpg"
// ============================================================

import React from 'react';
import './Hero.css';
import DATA from '../../data';
import scrollTo from '../../utils/scrollTo';
import useTypingEffect from '../../hooks/useTypingEffect';

function Hero({ onResumeOpen }) {
  const typedRole = useTypingEffect(DATA.roles);

  return (
    <section id="hero" className="hero-section">
      <div className="hero-layout">

        {/* Profile Photo */}
        <div className="hero-photo-wrap fu">
          {DATA.photo ? (
            <img src={DATA.photo} alt={DATA.name} className="hero-photo" />
          ) : (
            <div className="hero-photo-placeholder">👨‍💻</div>
          )}
        </div>

        {/* Hero Content */}
        <div className="hero-content">
          <p className="hero-greeting fu">hello, world — I'm</p>

          <h1 className="hero-name fu" style={{ transitionDelay: '0.08s' }}>
            Viet H
            <span className="hero-name-stroke">Tran</span>
          </h1>

          {/* Typing animation */}
          <p className="hero-role fu" style={{ transitionDelay: '0.16s' }}>
            // {typedRole}<span className="typing-cursor" />
          </p>

          <div className="hero-domains fu" style={{ transitionDelay: '0.22s' }}>
            {DATA.domains.map((domain, i) => (
              <span className="domain-tag" key={i}>{domain}</span>
            ))}
          </div>

          <p className="hero-bio fu" style={{ transitionDelay: '0.3s' }}>{DATA.bio}</p>

          <div className="hero-ctas fu" style={{ transitionDelay: '0.38s' }}>
            <button className="btn btn-primary" onClick={() => scrollTo('projects')}>View Projects</button>
            <button className="btn btn-ghost" onClick={() => scrollTo('contact')}>Get in touch</button>
            <button className="btn btn-outline-purple" onClick={onResumeOpen}>View Resume</button>
          </div>

          <div className="hero-meta fu" style={{ transitionDelay: '0.46s' }}>
            <span>{DATA.location}</span>
            <a href={`mailto:${DATA.email}`}>{DATA.email}</a>
            <a href={DATA.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={DATA.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
