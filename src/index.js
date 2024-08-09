import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
