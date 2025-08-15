import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// Force include of CastingManager so window.CastingManager is available in all builds
import './services/CastingManager';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
