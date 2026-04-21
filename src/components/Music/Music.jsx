// ============================================================
//  Music.jsx — Minimal audio player section
//  Plays an MP3 from your /public folder.
//  Edit the track info in data.js (the "music" object).
// ============================================================

import { useEffect, useRef, useState } from "react";
import DATA from "../../data";

export default function Music() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { title, artist, description, src } = DATA.music;

  // Toggle play/pause when the button is clicked
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

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnd);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnd);
      audio.removeEventListener("error", onError);
    };
  }, []);

  // Animated waveform bars — 32 vertical bars that pulse when playing
  const bars = Array.from({ length: 32 });

  return (
    <section id="music" className="music-section">
      <div className="music-container">
        <div className="music-eyebrow">— Favorite Audio —</div>
        <h2 className="music-heading">My Fav Track</h2>

        <div className="music-card">
          {/* Hidden native audio element — we control it via the button */}
          <audio ref={audioRef} src={src} preload="metadata" />

          <div className="music-row">
            {/* Play / pause button */}
            <button
              type="button"
              className={`music-play-btn ${isPlaying ? "is-playing" : ""}`}
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              disabled={hasError}
            >
              {isPlaying ? (
                // Pause icon (two bars)
                <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                  <rect x="2" y="2" width="4" height="16" rx="1" fill="currentColor" />
                  <rect x="12" y="2" width="4" height="16" rx="1" fill="currentColor" />
                </svg>
              ) : (
                // Play icon (triangle)
                <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                  <path d="M3 2 L16 10 L3 18 Z" fill="currentColor" />
                </svg>
              )}
            </button>

            {/* Track info + waveform */}
            <div className="music-info">
              <div className="music-title">{title}</div>
              <div className="music-artist">{artist}</div>

              <div
                className={`music-waveform ${isPlaying ? "is-playing" : ""}`}
                aria-hidden="true"
              >
                {bars.map((_, i) => (
                  <span
                    key={i}
                    className="music-bar"
                    style={{ animationDelay: `${(i % 8) * 0.08}s` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <p className="music-description">{description}</p>

          {hasError && (
            <p className="music-error">
              Couldn't load the audio file. Make sure the file exists in your{" "}
              <code>/public</code> folder and the <code>src</code> path in{" "}
              <code>data.js</code> matches the filename.
            </p>
          )}
        </div>
      </div>

      {/* Inline styles so this drops in without touching your CSS file */}
      <style>{`
        .music-section {
          padding: 96px 24px;
          background:
            radial-gradient(ellipse at 50% 0%, rgba(56, 189, 248, 0.06), transparent 60%),
            #0a0f1a;
          color: #e5e7eb;
        }
        .music-container {
          max-width: 760px;
          margin: 0 auto;
          text-align: center;
        }
        .music-eyebrow {
          font-size: 12px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #38bdf8;
          margin-bottom: 12px;
        }
        .music-heading {
          font-size: clamp(28px, 4vw, 40px);
          margin: 0 0 32px;
          background: linear-gradient(120deg, #fff 0%, #94a3b8 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .music-card {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(56, 189, 248, 0.15);
          border-radius: 16px;
          padding: 28px;
          backdrop-filter: blur(8px);
          text-align: left;
          box-shadow: 0 0 40px rgba(56, 189, 248, 0.05);
        }
        .music-row {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .music-play-btn {
          flex-shrink: 0;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 1px solid rgba(56, 189, 248, 0.4);
          background: linear-gradient(135deg, #0ea5e9, #0369a1);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.15s ease, box-shadow 0.2s ease;
          box-shadow: 0 0 20px rgba(56, 189, 248, 0.25);
        }
        .music-play-btn:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(56, 189, 248, 0.45);
        }
        .music-play-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .music-play-btn.is-playing {
          box-shadow: 0 0 30px rgba(56, 189, 248, 0.5);
        }
        .music-info {
          flex: 1;
          min-width: 0;
        }
        .music-title {
          font-size: 18px;
          font-weight: 600;
          color: #f1f5f9;
        }
        .music-artist {
          font-size: 13px;
          color: #94a3b8;
          margin-bottom: 12px;
        }
        .music-waveform {
          display: flex;
          align-items: center;
          gap: 3px;
          height: 32px;
        }
        .music-bar {
          flex: 1;
          background: linear-gradient(180deg, #38bdf8, #0369a1);
          border-radius: 2px;
          height: 20%;
          opacity: 0.4;
          transition: opacity 0.3s ease;
        }
        .music-waveform.is-playing .music-bar {
          opacity: 1;
          animation: musicPulse 0.9s ease-in-out infinite alternate;
        }
        @keyframes musicPulse {
          0%   { height: 15%; }
          50%  { height: 80%; }
          100% { height: 35%; }
        }
        .music-description {
          margin: 20px 0 0;
          font-size: 14px;
          color: #94a3b8;
          line-height: 1.6;
        }
        .music-error {
          margin-top: 16px;
          padding: 12px 14px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 8px;
          font-size: 13px;
          color: #fca5a5;
        }
        .music-error code {
          background: rgba(0,0,0,0.3);
          padding: 1px 5px;
          border-radius: 4px;
          font-family: ui-monospace, monospace;
        }
        @media (max-width: 480px) {
          .music-section { padding: 64px 16px; }
          .music-card { padding: 20px; }
          .music-row { gap: 14px; }
          .music-play-btn { width: 48px; height: 48px; }
        }
      `}</style>
    </section>
  );
}
