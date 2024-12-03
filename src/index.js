// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; // Import the App component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

ReactDOM.render(
  <React.StrictMode>
    <App /> {/* Render the App component */}
  </React.StrictMode>,
  document.getElementById('root')
);
