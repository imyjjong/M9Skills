import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './css/style.css';
import App from './App.jsx';
import { WeatherDataProvider } from './hooks/context/DataContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WeatherDataProvider>
      <App />
    </WeatherDataProvider>
  </StrictMode>,
)
