// ============================================================
//  useTypingEffect.js — Typing Animation Hook
//
//  Cycles through an array of text strings with a typewriter
//  effect — types forward, pauses, then deletes and moves
//  to the next string.
//
//  USAGE:
//  const displayed = useTypingEffect(["Role 1", "Role 2", "Role 3"]);
//  Then render: <span>{displayed}<span className="cursor" /></span>
// ============================================================

import { useState, useEffect } from 'react';

function useTypingEffect(texts, speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    let timeout;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx(i => i + 1);
      }, charIdx === current.length ? pause : speed);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx(i => i - 1);
      }, speed / 2);
    }

    if (!deleting && charIdx > current.length) setDeleting(true);
    if (deleting && charIdx < 0) {
      setDeleting(false);
      setTextIdx(i => (i + 1) % texts.length);
      setCharIdx(0);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts, speed, pause]);

  return displayed;
}

export default useTypingEffect;
