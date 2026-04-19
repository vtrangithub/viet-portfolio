// ============================================================
//  Hobbies.jsx — Hobbies & Personal Life Section
//
//  Renders a grid of hobby cards, each with:
//  - An emoji icon
//  - A category tag (e.g. "Outdoor Adventure")
//  - A title and description
//
//  Data comes from DATA.hobbies in src/data.js
// ============================================================

import React from 'react';
import './Hobbies.css';
import DATA from '../../data';

function Hobbies() {
  return (
    <section id="hobbies">
      <p className="s-label">05. beyond work</p>
      <h2 className="s-title">Hobbies &amp; <em>Life</em></h2>

      <div className="hobbies-grid">
        {DATA.hobbies.map((hobby, index) => (
          <div
            className="hobby-card fu"
            key={index}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            {/* Large emoji icon */}
            <span className="hobby-icon">{hobby.icon}</span>

            {/* Category label e.g. "Outdoor Adventure" */}
            <div className="hobby-tag">{hobby.tag}</div>

            {/* Card title */}
            <div className="hobby-title">{hobby.title}</div>

            {/* Description paragraph */}
            <div className="hobby-body">{hobby.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Hobbies;
