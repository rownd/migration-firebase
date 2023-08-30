import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App.tsx';
import { RowndProvider } from '@rownd/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RowndProvider appKey='ROWND_APP_KEY'>
      <App />
    </RowndProvider>
  </React.StrictMode>
);
