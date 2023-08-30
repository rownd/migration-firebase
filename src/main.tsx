import React from 'react';
import ReactDOM from 'react-dom/client';
import FirebaseAuth from './FirebaseAuth/FirebaseAuth.tsx';
import './index.css';

import { RowndProvider } from '@rownd/react';
import RowndAuth from './RowndAuth/RowndAuth.tsx';

const REPLACE_WITH_ROWND = false;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <>
      {REPLACE_WITH_ROWND ? (
        <RowndProvider appKey="ROWND_APP_KEY">
          <RowndAuth />
        </RowndProvider>
      ) : (
        <FirebaseAuth />
      )}
    </>
  </React.StrictMode>
);
