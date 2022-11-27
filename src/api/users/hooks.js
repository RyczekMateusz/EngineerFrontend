import { useMutation } from '@tanstack/react-query'
import { createUser, logUser, updateUser } from './requests'

export const useCreateUser = ({ options } = {}) => {
  return useMutation(createUser, { ...options })
}

export const useUpdateUser = (options = {}) => {
  return useMutation(updateUser, { mutationKey: 'updateUser', ...options })
}

export const useLogUser = (options = {}) => {
  console.log(options)

  return useMutation(logUser, { mutationKey: 'logUser', ...options })
}
