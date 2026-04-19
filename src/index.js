import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// This is the React entry point.
// It finds the <div id="root"> in public/index.html
// and renders the entire App component inside it.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
