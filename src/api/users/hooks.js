import { useMutation, useQuery } from '@tanstack/react-query'
import { createUser, fetchUserById, logUser, updateUser } from './requests'

export const useCreateUser = ({ options } = {}) => {
  return useMutation(createUser, { ...options })
}

export const useUpdateUser = (options = {}) => {
  return useMutation(updateUser, { mutationKey: 'updateUser', ...options })
}

export const useLogUser = (options = {}) => {
  return useMutation(logUser, { mutationKey: 'logUser', ...options })
}

export const useGetUserByOwnerId = ({ ownerId, enabled = false }) =>
  useQuery(['ownerDetails', ownerId], () => fetchUserById(ownerId), { select: data => data.data, enabled })
