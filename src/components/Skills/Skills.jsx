// ============================================================
//  Skills.jsx — Technical Skills Section
//
//  Renders a grid of skill cards.
//  Each card has a category name, icon, and a list of skill pills.
//  Data comes from DATA.skills in src/data.js
// ============================================================

import React from 'react';
import './Skills.css';
import DATA from '../../data';

function Skills() {
  return (
    <section id="skills">
      <p className="s-label">02. technical stack</p>
      <h2 className="s-title">Skills &amp; <em>Tools</em></h2>

      <div className="skills-grid">
        {/* Loop through each skill category and render a card */}
        {DATA.skills.map((skillGroup, index) => (
          <div
            className="sk-card fu"
            key={index}
            style={{ transitionDelay: `${index * 0.08}s` }} /* stagger the animation */
          >
            {/* Card header: icon + category name */}
            <div className="sk-head">
              <span className="sk-icon">{skillGroup.icon}</span>
              {skillGroup.category}
            </div>

            {/* Individual skill pills */}
            <div className="sk-pills">
              {skillGroup.items.map((skill, i) => (
                <span className="sk-pill" key={i}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
