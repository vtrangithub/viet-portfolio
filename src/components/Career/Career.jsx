// ============================================================
//  Career.jsx — Work Experience & Education Section
//
//  Renders two parts:
//  1. A timeline of work experience (from DATA.career)
//  2. A list of education entries (from DATA.education)
//
//  Data comes from src/data.js
// ============================================================

import React from 'react';
import './Career.css';
import DATA from '../../data';

function Career() {
  return (
    <section id="career">
      <p className="s-label">04. career progression</p>
      <h2 className="s-title">Work <em>Experience</em></h2>

      {/* ── Work Timeline ── */}
      <div className="timeline">
        {DATA.career.map((job, index) => (
          <div
            className="t-item fu"
            key={index}
            style={{ transitionDelay: `${index * 0.08}s` }}
          >
            {/* Left column: date range */}
            <div className="t-year">{job.year}</div>

            {/* Right column: role details */}
            <div className="t-details">
              <div className="t-role">{job.role}</div>
              <div className="t-company">{job.company}</div>
              <ul className="t-bullets">
                {job.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* ── Education ── */}
      <div className="edu-section">
        <p className="s-label">education</p>
        <div className="edu-list">
          {DATA.education.map((edu, index) => (
            <div
              className="edu-item fu"
              key={index}
              style={{ transitionDelay: `${index * 0.07}s` }}
            >
              <div>
                <div className="edu-degree">{edu.degree}</div>
                <div className="edu-school">{edu.school}</div>
              </div>
              <div className="edu-year">{edu.year}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Career;
