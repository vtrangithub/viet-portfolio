// ============================================================
//  Projects.jsx — Project Portfolio Section
//
//  Renders a grid of clickable project cards.
//  Each card links to the project's GitHub repo.
//  Data comes from DATA.projects in src/data.js
// ============================================================

import React from 'react';
import './Projects.css';
import DATA from '../../data';

function Projects() {
  return (
    <section id="projects">
      <p className="s-label">03. project portfolio</p>
      <h2 className="s-title">What I've <em>Built</em></h2>

      <div className="proj-grid">
        {DATA.projects.map((project, index) => (
          // The whole card is an <a> tag so clicking anywhere opens the repo
          <a
            className="proj-card fu"
            href={project.url}
            target="_blank"        /* opens in a new tab */
            rel="noreferrer"       /* security best practice for external links */
            key={index}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            {/* Top row: project title + arrow icon */}
            <div className="proj-top">
              <div className="proj-title">{project.title}</div>
              <span className="proj-arrow">↗</span>
            </div>

            {/* Category tag e.g. "Full Stack" */}
            <div className="proj-tag">{project.tag}</div>

            {/* Short description */}
            <div className="proj-desc">{project.desc}</div>

            {/* Tech stack chips at the bottom of the card */}
            <div className="proj-stack">
              {project.stack.map((tech, i) => (
                <span className="proj-chip" key={i}>{tech}</span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Projects;
