import React from 'react';
import { createRoot } from 'react-dom/client';
import Counter from './Counter';

const container = document.getElementById('root');
if (!container) throw new Error('Synthetic probe root missing');
createRoot(container).render(
  <React.StrictMode>
    <main><h1>Exile Nexus static runtime evaluation</h1><p>Original synthetic benchmark, no game data.</p><Counter /></main>
  </React.StrictMode>,
);
