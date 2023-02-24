import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BookContextProvider } from './context/BookContext';
import App from './App';
import { AuthContextProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BookContextProvider>
       <App />
      </BookContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

