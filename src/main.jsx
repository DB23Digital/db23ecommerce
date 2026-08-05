import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'
import IndexV2 from './IndexV2.jsx'

const path = window.location.pathname;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      {path === '/indexv2' ? <IndexV2 /> : <App />}
    </HelmetProvider>
  </StrictMode>
)
