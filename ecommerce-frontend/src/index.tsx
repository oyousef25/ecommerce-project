import React from 'react';
import ReactDOM from 'react-dom/client';  // Updated import for React 18
import App from './App';
import './index.css';

const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container);  // Use createRoot instead of render
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element');
}