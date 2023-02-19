import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios'

const promise = axios.get('http://localhost:3001/persons')
//console.log(promise);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);