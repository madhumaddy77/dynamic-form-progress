// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App'; // Import the App component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

ReactDOM.render(
  <BrowserRouter basename="/dynamic-form-progress">
  <App />
</BrowserRouter>,
document.getElementById('root')
);
