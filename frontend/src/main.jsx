import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { PlantProvider } from './context/PlantContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <PlantProvider>
        <App />
      </PlantProvider>
    </AuthProvider>
  </React.StrictMode>,
);
