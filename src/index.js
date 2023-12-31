import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);