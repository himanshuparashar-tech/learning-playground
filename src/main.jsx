import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './main.css'
import { LoaderProvider } from './context/LoaderContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoaderProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </LoaderProvider>
  </StrictMode>,
)
  