// ============================================================
//  ResumeModal.jsx — Resume Popup Modal
//
//  Opens when the user clicks "Resume" in the nav or
//  "View Resume" in the Hero section.
//
//  PROPS:
//  - onClose (function): called when user closes the modal
//
//  HOW TO CLOSE:
//  - Click the "✕ Close" button
//  - Click the dark background overlay
//  - Press the Escape key
// ============================================================

import React, { useEffect } from 'react';
import './ResumeModal.css';
import DATA from '../../data';

function ResumeModal({ onClose }) {

  // Close on Escape key press
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Lock background scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    // Dark overlay — clicking it closes the modal
    <div className="modal-overlay" onClick={onClose}>

      {/* Modal box — stopPropagation prevents overlay click from firing */}
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>

        {/* Close button */}
        <button className="modal-close" onClick={onClose}>✕ Close</button>

        {/* ── Header ── */}
        <div className="resume-header">
          <div className="resume-name">{DATA.name}</div>
          <div className="resume-title">{DATA.role}</div>
          <div className="resume-contact">
            <span>{DATA.location}</span>
            <a href={`mailto:${DATA.email}`}>{DATA.email}</a>
            <a href={DATA.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={DATA.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </div>

        {/* ── Summary ── */}
        <div className="resume-section">
          <div className="resume-section-title">Summary</div>
          <p className="resume-summary">{DATA.bio}</p>
        </div>

        {/* ── Technical Skills ── */}
        <div className="resume-section">
          <div className="resume-section-title">Technical Skills</div>
          <div className="resume-skills-grid">
            {DATA.skills.map((s, i) => (
              <div className="resume-skill-row" key={i}>
                <span className="resume-skill-label">{s.category}:</span>
                <span className="resume-skill-value">{s.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Professional Experience ── */}
        <div className="resume-section">
          <div className="resume-section-title">Professional Experience</div>
          {DATA.career.map((job, i) => (
            <div className="resume-job" key={i}>
              <div className="resume-job-header">
                <div className="resume-job-role">{job.role}</div>
                <div className="resume-job-year">{job.year}</div>
              </div>
              <div className="resume-job-company">{job.company}</div>
              <ul className="resume-job-bullets">
                {job.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Education ── */}
        <div className="resume-section">
          <div className="resume-section-title">Education</div>
          {DATA.education.map((e, i) => (
            <div className="resume-edu-item" key={i}>
              <div>
                <div className="resume-edu-degree">{e.degree}</div>
                <div className="resume-edu-school">{e.school}</div>
              </div>
              <div className="resume-edu-year">{e.year}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default ResumeModal;
