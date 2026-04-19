// ============================================================
//  Contact.jsx — Contact Section with Formspree form
//
//  HOW TO ACTIVATE EMAIL:
//  1. Go to https://formspree.io and sign up free
//  2. Create a new form → copy your form ID (e.g. "xpzgkwqr")
//  3. Replace "YOUR_FORM_ID" below with your actual ID
// ============================================================

import React, { useState } from 'react';
import './Contact.css';
import DATA from '../../data';

const FORMSPREE_ID = "YOUR_FORM_ID"; // ← replace after signing up at formspree.io

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact">
      <div className="contact-wrap">
        <p className="s-label" style={{ justifyContent: "center" }}>06. contact</p>
        <h2 className="s-title">Let's <em>Connect</em></h2>
        <p className="contact-sub">
          Open to new software engineering roles, collaboration, or just a conversation
          about full stack development, aerospace, or building cool things.
        </p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="subject">Subject</label>
            <input id="subject" name="subject" type="text" placeholder="What's this about?" value={form.subject} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} placeholder="Your message..." value={form.message} onChange={handleChange} required />
          </div>
          {status === "success" && (
            <div className="form-status success">✓ Message sent! I'll get back to you soon.</div>
          )}
          {status === "error" && (
            <div className="form-status error">Something went wrong. Please email me directly at {DATA.email}</div>
          )}
          <button type="submit" className="btn btn-primary btn-full" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send Message →"}
          </button>
        </form>
        <p className="contact-email-line">
          Or email directly: <a href={`mailto:${DATA.email}`}>{DATA.email}</a>
        </p>
        <div className="contact-links">
          <a href={DATA.linkedin} className="c-link" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={DATA.github} className="c-link" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
