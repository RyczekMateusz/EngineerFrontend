import { client } from '../client'

export const createUser = async data => {
  await client.post('/registerUser', data)
}

export const updateUser = async ({ values, userId }) => await client.patch(`/updateUser/${userId}`, values)

export const logUser = async data => await client.post('/logUser', data)

export const fetchUserById = async ownerId => await client.get(`/user/${ownerId}`)
