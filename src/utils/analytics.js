// ============================================================
//  analytics.js — Google Analytics Utility
//
//  HOW TO ACTIVATE:
//  1. Go to https://analytics.google.com
//  2. Sign in with your Google account
//  3. Click "Start measuring" → create an account & property
//  4. Choose "Web" → enter your domain (viethungtranwebdev.com)
//  5. Copy the Measurement ID (looks like "G-XXXXXXXXXX")
//  6. Paste it into DATA.analyticsId in src/data.js
//
//  This file injects the Google Analytics script automatically.
//  No other setup needed once you add your ID.
// ============================================================

export function initAnalytics(id) {
  if (!id || id === 'G-XXXXXXXXXX') return; // skip if not configured

  // Load the GA script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script1);

  // Initialize GA
  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', '${id}');
  `;
  document.head.appendChild(script2);
}
