import axios from 'axios'

export const createUser = async data => {
  await axios.post('http://localhost:8000/registerUser', data)
}

export const updateUser = async ({ values, userId }) =>
  await axios.patch(`http://localhost:8000/updateUser/${userId}`, values)

export const logUser = async data => await axios.post('http://localhost:8000/logUser', data)
