// ============================================================
//  Hobbies.jsx — Hobbies & Personal Life Section
//
//  Renders a grid of hobby cards, each with:
//  - An emoji icon
//  - A category tag (e.g. "Outdoor Adventure")
//  - A title and description
//  - If the card has an "audio" field in data.js, a mini player
//    is shown instead of the text body.
//
//  Data comes from DATA.hobbies in src/data.js
// ============================================================

import React, { useEffect, useRef, useState } from 'react';
import './Hobbies.css';
import DATA from '../../data';

// ---------- Mini audio player ----------
// A small play/pause button + animated waveform that fits inside a hobby card.
function HobbyAudioPlayer({ src }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => setHasError(true));
    }
  };

  // Keep React state in sync with the actual audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnd = () => setIsPlaying(false);
    const onError = () => setHasError(true);

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnd);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnd);
      audio.removeEventListener('error', onError);
    };
  }, []);

  // 24 little waveform bars
  const bars = Array.from({ length: 24 });

  return (
    <div className="hobby-audio">
      <audio ref={audioRef} src={src} preload="metadata" />

      <button
        type="button"
        className={`hobby-audio-btn ${isPlaying ? 'is-playing' : ''}`}
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause' : 'Play'}
        disabled={hasError}
      >
        {isPlaying ? (
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
            <rect x="1" y="1" width="3" height="12" rx="0.5" fill="currentColor" />
            <rect x="8" y="1" width="3" height="12" rx="0.5" fill="currentColor" />
          </svg>
        ) : (
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
            <path d="M2 1 L11 7 L2 13 Z" fill="currentColor" />
          </svg>
        )}
      </button>

      <div className={`hobby-waveform ${isPlaying ? 'is-playing' : ''}`} aria-hidden="true">
        {bars.map((_, i) => (
          <span
            key={i}
            className="hobby-bar"
            style={{ animationDelay: `${(i % 6) * 0.09}s` }}
          />
        ))}
      </div>

      {hasError && (
        <span className="hobby-audio-error">Couldn't load audio</span>
      )}
    </div>
  );
}

// ---------- Main Hobbies section ----------
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

            {/* Description paragraph (always shown if present) */}
            {hobby.body && <div className="hobby-body">{hobby.body}</div>}

            {/* Mini audio player — only if the card has an audio field */}
            {hobby.audio && <HobbyAudioPlayer src={hobby.audio.src} />}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Hobbies;
