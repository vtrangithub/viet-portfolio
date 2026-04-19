// ============================================================
//  Blog.jsx — Blog & Insights Section
//
//  Shows filterable blog post cards. Click a card to open
//  the full post in a modal.
//
//  TO ADD A NEW POST:
//  Go to src/data.js → find the "blog" array → add a new object
//  following the same format as the existing posts.
// ============================================================

import React, { useState } from 'react';
import './Blog.css';
import DATA from '../../data';

const CATEGORIES = ['All', 'Tech & Coding', 'Aerospace Engineering', 'Medical Devices'];

function BlogModal({ post, onClose }) {
  React.useEffect(() => {
    function handleKey(e) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="blog-modal-overlay" onClick={onClose}>
      <div className="blog-modal-box" onClick={e => e.stopPropagation()}>
        <button className="blog-modal-close" onClick={onClose}>✕ Close</button>
        <div className="blog-modal-cat">{post.icon} {post.category}</div>
        <div className="blog-modal-title">{post.title}</div>
        <div className="blog-modal-meta">{post.date} · {post.readTime}</div>
        <div className="blog-modal-body">{post.content}</div>
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

      {/* Category filters */}
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

      {/* Blog post cards */}
      <div className="blog-grid">
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
