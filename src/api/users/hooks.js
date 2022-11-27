import { useMutation } from '@tanstack/react-query'
import { createUser, logUser } from './requests'

export const useCreateUser = ({ options } = {}) => {
  return useMutation(createUser, { ...options })
}

export const useLogUser = (options = {}) => {
  return useMutation(logUser, { mutationKey: 'logUser', ...options })
}
