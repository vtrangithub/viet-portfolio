// ============================================================
//  App.js — Root Component
//
//  Manages global state:
//  - theme (dark/light)
//  - resumeOpen (resume modal)
//  - scrollProgress (top progress bar)
//  - Google Analytics initialization
// ============================================================

import React, { useState, useEffect } from 'react';
import './App.css';
import DATA from './data';

// Hooks
import useActiveSection from './hooks/useActiveSection';
import useFadeUp from './hooks/useFadeUp';
import useScrollProgress from './hooks/useScrollProgress';

// Utilities
import { initAnalytics } from './utils/analytics';

// Components
import Background    from './components/Background/Background';
import Nav           from './components/Nav/Nav';
import Hero          from './components/Hero/Hero';
import Skills        from './components/Skills/Skills';
import Projects      from './components/Projects/Projects';
import Career        from './components/Career/Career';
import Blog          from './components/Blog/Blog';
import Hobbies       from './components/Hobbies/Hobbies';
import Contact       from './components/Contact/Contact';
import ResumeModal   from './components/ResumeModal/ResumeModal';

const SECTION_IDS = ['hero', 'skills', 'projects', 'career', 'blog', 'hobbies', 'contact'];

function App() {
  const [theme, setTheme] = useState('dark');
  const [resumeOpen, setResumeOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);
  const scrollProgress = useScrollProgress();

  useFadeUp();

  // Initialize Google Analytics
  useEffect(() => {
    initAnalytics(DATA.analyticsId);
  }, []);

  // Apply theme to <html> element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(t => t === 'dark' ? 'light' : 'dark');
  }

  return (
    <div>
      {/* Scroll progress bar at the very top */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <Background />

      <Nav
        active={activeSection}
        onResumeOpen={() => setResumeOpen(true)}
        theme={theme}
        onThemeToggle={toggleTheme}
      />

      <main>
        <Hero onResumeOpen={() => setResumeOpen(true)} />
        <Skills />
        <Projects />
        <Career />
        <Blog />
        <Hobbies />
        <Contact />
        <footer className="site-footer">
          © {new Date().getFullYear()} Viet H Tran · Software Development Engineer & Engineering Specialist · Renton, Washington
        </footer>
      </main>

      {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
    </div>
  );
}

export default App;
