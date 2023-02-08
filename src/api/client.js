import axios from 'axios'

const devURL = 'http://localhost:8000'
const prodURL = 'https://engineerbackend-production.up.railway.app'

export const baseURL = import.meta.env.DEV ? devURL : prodURL

export const client = axios.create({
  baseURL,
})

client.interceptors.request.use(config => {
  const token = localStorage.getItem('loggedUser')
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})
