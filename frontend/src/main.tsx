import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'

// Google Analytics & Meta Pixel (only when env vars are set)
function initAnalytics() {
  const gaId = import.meta.env.VITE_GA_ID
  if (gaId) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
    script.onload = () => {
      window.dataLayer = window.dataLayer || []
      function gtag(...args: unknown[]) {
        window.dataLayer.push(args)
      }
      gtag('js', new Date())
      gtag('config', gaId)
    }
    document.head.appendChild(script)
  }

  const metaPixelId = import.meta.env.VITE_META_PIXEL_APP_ID
  if (metaPixelId) {
    const fbScript = document.createElement('script')
    fbScript.async = true
    fbScript.id = 'facebook-sdk'
    fbScript.src = `https://connect.facebook.net/en_US/${metaPixelId}/sdk.js`
    document.head.appendChild(fbScript)
  }
}

initAnalytics()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
