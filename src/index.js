import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CrypContext from './context/CrypContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CrypContext>
    <App />
    </CrypContext>
  </React.StrictMode>
);
