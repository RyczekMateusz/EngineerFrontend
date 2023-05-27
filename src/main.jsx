import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import UserProvider from './context/UserContext'
import './i18n'
import axios from 'axios'
import * as Sentry from '@sentry/react'

// Sentry.init({
//   dsn: `https://${import.meta.env.VITE_SENTRY_KEY}.ingest.sentry.io/4505256499281920`,
//   environment: import.meta.env.VITE_SENTRY_ENV,
//   enableInExpoDevelopment: true,
//   debug: true,
// })

Sentry.init({
  environment: import.meta.env.VITE_SENTRY_ENV,
  dsn: `https://${import.meta.env.VITE_SENTRY_KEY}.ingest.sentry.io/4505256673738752`,
  integrations: [
    new Sentry.BrowserTracing({
      // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ['localhost', /^https:\/\/engineerbackend-production\.up\.railway\.app/],
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
})

const devURL = 'http://localhost:8000'
const prodURL = 'https://engineerbackend-production.up.railway.app/'

const baseURL = import.meta.env.DEV ? devURL : prodURL

axios.defaults.baseURL = baseURL

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
)
