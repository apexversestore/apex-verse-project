import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/HomePage.tsx'
import './index.css'
import './i18n/index.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)