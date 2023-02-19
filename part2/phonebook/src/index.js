import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios'

const promise = axios.get('https://blogs.msdn.microsoft.com/powershell/feed/')
console.log(promise);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);