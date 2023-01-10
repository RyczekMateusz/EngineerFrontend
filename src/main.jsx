import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import UserProvider from './context/UserContext'
import './i18n'
import axios from 'axios'

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
