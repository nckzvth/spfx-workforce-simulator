import React from 'react';
import ReactDOM from 'react-dom/client';
import { SharePointShell } from './simulator/SharePointShell';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SharePointShell />
  </React.StrictMode>
);
