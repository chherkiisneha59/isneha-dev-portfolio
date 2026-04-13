import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { WeatherProvider } from './context/WeatherContext';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <WeatherProvider>
        <App />
      </WeatherProvider>
    </ThemeProvider>
  </React.StrictMode>
);
