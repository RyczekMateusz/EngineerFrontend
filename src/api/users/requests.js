import axios from 'axios'

export const createUser = async data => {
  await axios.post('http://localhost:8000/registerUser', data)
}

export const logUser = async data => await axios.post('http://localhost:8000/logUser', data)
