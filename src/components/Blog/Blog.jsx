// ============================================================
//  Blog.jsx — Blog & Insights Section
//
//  Fix: Modal now listens for nav clicks and closes itself,
//  so hamburger menu navigation works correctly on mobile.
// ============================================================

import React, { useState, useEffect } from 'react';
import './Blog.css';
import DATA from '../../data';

const CATEGORIES = ['All', 'Tech & Coding', 'Aerospace Engineering', 'Medical Devices'];

function BlogModal({ post, onClose }) {
  useEffect(() => {
    // Close on Escape key
    function handleKey(e) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', handleKey);

    // Lock background scroll
    document.body.style.overflow = 'hidden';

    // ── KEY FIX: close modal when any nav button is clicked ──
    // This ensures hamburger menu navigation works even when modal is open
    function handleNavClick(e) {
      const isNavBtn = e.target.closest('.nav-btn, .nav-drawer-item, .nav-logo, .nav-resume-btn, .nav-drawer-resume, .nav-drawer-theme');
      if (isNavBtn) onClose();
    }
    document.addEventListener('click', handleNavClick, true); // capture phase

    return () => {
      window.removeEventListener('keydown', handleKey);
      document.removeEventListener('click', handleNavClick, true);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="blog-modal-overlay" onClick={onClose}>
      <div className="blog-modal-box" onClick={e => e.stopPropagation()}>

        {/* Sticky header — always visible */}
        <div className="blog-modal-header">
          <div className="blog-modal-cat-small">{post.icon} {post.category}</div>
          <button className="blog-modal-close-btn" onClick={onClose}>
            ✕ Close
          </button>
        </div>

        {/* Scrollable content */}
        <div className="blog-modal-content">
          <div className="blog-modal-title">{post.title}</div>
          <div className="blog-modal-meta">{post.date} · {post.readTime}</div>
          <div className="blog-modal-body">{post.content}</div>
        </div>

        {/* Bottom back button — easy thumb reach on mobile */}
        <div className="blog-modal-footer">
          <button className="blog-modal-close-bottom" onClick={onClose}>
            ← Back to Blog
          </button>
        </div>

      </div>
    </div>
  );
}

function Blog() {
  const [filter, setFilter] = useState('All');
  const [selectedPost, setSelectedPost] = useState(null);

  const filtered = filter === 'All'
    ? DATA.blog
    : DATA.blog.filter(p => p.category === filter);

  return (
    <section id="blog">
      <p className="s-label">05. tech notes</p>
      <h2 className="s-title">Blog &amp; <em>Insights</em></h2>

      {/* Category filter buttons */}
      <div className="blog-filters">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`blog-filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog cards */}
      <div className="blog-grid" key={filter}>
        {filtered.map((post, i) => (
          <div
            className="blog-card fu"
            key={post.id}
            style={{ transitionDelay: `${i * 0.08}s` }}
            onClick={() => setSelectedPost(post)}
          >
            <div className="blog-card-top">
              <div className="blog-category">{post.icon} {post.category}</div>
              <div className="blog-meta">{post.readTime}</div>
            </div>
            <div className="blog-title">{post.title}</div>
            <div className="blog-excerpt">{post.excerpt}</div>
            <div className="blog-read">Read more →</div>
          </div>
        ))}
      </div>

      {/* Post modal */}
      {selectedPost && (
        <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </section>
  );
}

export default Blog;
