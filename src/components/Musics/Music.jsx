// ============================================================
//  Music.jsx — My Suno Tracks Section
//
//  Renders a playlist of AI-generated tracks from DATA.music.
//  Features:
//  - Track list with animated waveform on active track
//  - Persistent player bar with progress scrubbing
//  - Only one track plays at a time (shared audio instance)
//
//  Data comes from DATA.music in src/data.js
// ============================================================

import React, { useRef, useState, useEffect, useCallback } from 'react';
import './Music.css';
import DATA from '../../data';

function fmt(s) {
  if (!isFinite(s) || isNaN(s)) return '0:00';
  return Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
}

function Music() {
  const audioRef = useRef(null);
  const animRef  = useRef(null);

  const [currentIdx, setCurrentIdx] = useState(-1);
  const [isPlaying,  setIsPlaying]  = useState(false);
  const [progress,   setProgress]   = useState(0);       // 0–100
  const [currentTime, setCurrentTime] = useState('0:00');
  const [totalTime,   setTotalTime]   = useState('0:00');
  const [durations,   setDurations]   = useState({});    // { idx: '3:42' }
  const [error,       setError]       = useState(false);

  // Pre-load durations for all tracks so the list shows them
  useEffect(() => {
    DATA.music.forEach((track, i) => {
      const a = new Audio();
      a.preload = 'metadata';
      a.onloadedmetadata = () => {
        setDurations(prev => ({ ...prev, [i]: fmt(a.duration) }));
      };
      a.src = track.src;
    });
  }, []);

  const tick = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    setProgress(pct);
    setCurrentTime(fmt(audio.currentTime));
    animRef.current = requestAnimationFrame(tick);
  }, []);

  const stopTick = useCallback(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
  }, []);

  function selectTrack(idx) {
    if (idx === currentIdx) { togglePlay(); return; }

    stopTick();
    setError(false);

    const audio = audioRef.current;
    if (audio) audio.pause();

    setCurrentIdx(idx);
    setProgress(0);
    setCurrentTime('0:00');
    setTotalTime(durations[idx] || '0:00');

    // src change triggers useEffect below
  }

  // When currentIdx changes, load + play the new track
  useEffect(() => {
    if (currentIdx < 0) return;
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = DATA.music[currentIdx].src;
    audio.load();
    audio.play()
      .then(() => { setIsPlaying(true); animRef.current = requestAnimationFrame(tick); })
      .catch(() => setError(true));
  }, [currentIdx]); // eslint-disable-line

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio || currentIdx < 0) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => setError(true));
    }
  }

  // Wire up audio element events once on mount
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay   = () => { setIsPlaying(true);  animRef.current = requestAnimationFrame(tick); };
    const onPause  = () => { setIsPlaying(false); stopTick(); };
    const onEnded  = () => { setIsPlaying(false); stopTick(); setProgress(100); };
    const onError  = () => { setIsPlaying(false); stopTick(); setError(true); };
    const onMeta   = () => setTotalTime(fmt(audio.duration));

    audio.addEventListener('play',             onPlay);
    audio.addEventListener('pause',            onPause);
    audio.addEventListener('ended',            onEnded);
    audio.addEventListener('error',            onError);
    audio.addEventListener('loadedmetadata',   onMeta);

    return () => {
      audio.removeEventListener('play',           onPlay);
      audio.removeEventListener('pause',          onPause);
      audio.removeEventListener('ended',          onEnded);
      audio.removeEventListener('error',          onError);
      audio.removeEventListener('loadedmetadata', onMeta);
      stopTick();
    };
  }, [tick, stopTick]);

  function seekTo(e) {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct  = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = pct * audio.duration;
  }

  const activeTrack = currentIdx >= 0 ? DATA.music[currentIdx] : null;

  return (
    <section id="music">
      <audio ref={audioRef} preload="none" />

      <p className="s-label">06. creative side</p>
      <h2 className="s-title">My Suno <em>Tracks</em></h2>
      <p className="music-intro">
        AI-generated music I made with Suno — hip-hop, lo-fi, neo soul, and more.
        Click any track to play.
      </p>

      {/* ── Track list ── */}
      <div className="music-track-list">
        {DATA.music.map((track, i) => {
          const isActive = i === currentIdx;
          return (
            <div
              key={i}
              className={`music-track-row fu ${isActive ? 'active' : ''} ${isActive && !isPlaying ? 'paused' : ''}`}
              style={{ transitionDelay: `${i * 0.06}s` }}
              onClick={() => selectTrack(i)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && selectTrack(i)}
              aria-label={`Play ${track.title}`}
            >
              {/* Index / waveform */}
              <div className="music-track-num">
                {isActive ? (
                  <div className="music-waveform" aria-hidden="true">
                    <span className="mbar" /><span className="mbar" />
                    <span className="mbar" /><span className="mbar" />
                  </div>
                ) : (
                  <span>{i + 1}</span>
                )}
              </div>

              {/* Title + genre */}
              <div className="music-track-info">
                <div className="music-track-title">{track.title}</div>
                <div className="music-track-genre">{track.genre}</div>
              </div>

              {/* Vibe badge */}
              <span className="music-vibe-badge">{track.vibe}</span>

              {/* Duration */}
              <span className="music-track-dur">{durations[i] || '—'}</span>
            </div>
          );
        })}
      </div>

      {/* ── Sticky player bar ── */}
      <div className="music-player-bar">
        <div className="music-player-top">
          {/* Play / Pause button */}
          <button
            className={`music-play-btn ${isPlaying ? 'is-playing' : ''}`}
            onClick={togglePlay}
            disabled={currentIdx < 0}
            aria-label={isPlaying ? 'Pause' : 'Play'}
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

          {/* Now playing info */}
          <div className="music-now-playing">
            <div className="music-now-title">
              {error ? 'Error loading track' : activeTrack ? activeTrack.title : 'Select a track'}
            </div>
            <div className="music-now-meta">
              {activeTrack ? `${activeTrack.genre} · ${activeTrack.vibe}` : '—'}
            </div>
          </div>

          <span className="music-suno-tag">made with Suno</span>
        </div>

        {/* Progress bar */}
        <div className="music-progress-track" onClick={seekTo} role="progressbar" aria-valuenow={Math.round(progress)}>
          <div className="music-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="music-time-row">
          <span>{currentTime}</span>
          <span>{totalTime}</span>
        </div>
      </div>
    </section>
  );
}

export default Music;
