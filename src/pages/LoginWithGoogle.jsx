import { fromPairs } from 'lodash'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import useLoginUser from '../hooks/useLoginUser'

const LoginWithGoogle = () => {
  const { user } = useContext(UserContext)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { setStorage } = useLoginUser()

  if (user) {
    navigate('/')
  }

  const entries = searchParams.entries()

  const params = []

  for (let entry of searchParams.entries()) {
    params.push(entry)
  }

  const data = fromPairs(params)

  useEffect(() => {
    setStorage('loggedUser', data)
  }, [])

  return <></>
}

export default LoginWithGoogle
