import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)

// Google Analytics & Meta Pixel (only when env vars are set)
useEffect(() => {
  if (import.meta.env.VITE_GA_ID) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_ID}`
    script.onload = () => {
      ;(window.dataLayer = window.dataLayer || []).push = function () {
        ;(window.dataLayer = window.dataLayer || []).push(arguments)
      }
      function gtag() {
        ;(window.dataLayer = window.dataLayer || []).push(arguments)
      }
      gtag('js', new Date())
      gtag('config', import.meta.env.VITE_GA_ID)
    }
    document.head.appendChild(script)
  }
  if (import.meta.env.VITE_META_PIXEL_APP_ID) {
    const fbScript = document.createElement('script')
    fbScript.async = true
    fbScript.id = 'facebook-sdk'
    fbScript.src = `https://connect.facebook.net/en_US/${import.meta.env.VITE_META_PIXEL_APP_ID}/sdk.js`
    document.head.appendChild(fbScript)
  }
}, [])
