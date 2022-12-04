import { useContext, useCallback } from 'react'
import { UserContext } from '../context/UserContext'

function useLoginUser() {
  const { user, setUser } = useContext(UserContext)

  const setStorage = useCallback(
    (name, data) => {
      console.log(name, data)
      localStorage.setItem(`${name}`, data.token)
      setUser(data)
    },
    [setUser],
  )

  const removeStorage = useCallback(
    name => {
      localStorage.removeItem(name)
      setUser(null)
    },
    [setUser],
  )

  const getStorage = useCallback(name => {
    return localStorage.getItem(name)
  }, [])

  return { setStorage, removeStorage, getStorage }
}

export default useLoginUser
