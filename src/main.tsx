import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Make sure you have an App.jsx in your src folder
import './index.css'; // If you have styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
