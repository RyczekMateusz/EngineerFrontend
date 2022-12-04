import axios from 'axios'

export const client = axios.create({
  baseURL: 'http://localhost:8000',
})

client.interceptors.request.use(config => {
  const token = localStorage.getItem('loggedUser')
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})
