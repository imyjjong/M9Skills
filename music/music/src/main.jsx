import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './css/style.css';
import { MusicDataProvider } from './hooks/context/DataContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MusicDataProvider>
      <App />
    </MusicDataProvider>
  </StrictMode>,
)
