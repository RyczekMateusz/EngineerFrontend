import { Formik, Field, Form } from 'formik'
import { useNavigate } from 'react-router'
import { useLogUser } from '../api/users'
import CustomInputComponent from '../components/CustomInputComponent'
import useLoginUser from '../hooks/useLoginUser'

const initialValues = {
  password: '',
  email: '',
}

const LoginPage = () => {
  const navigate = useNavigate()
  const { setStorage } = useLoginUser()

  const { mutate: logUser } = useLogUser({
    onSuccess: data => {
      setStorage('loggedUser', data.data)
      navigate('/')
    },
  })

  const onSubmit = async (values, { setSubmitting }) => {
    logUser(values)
    setSubmitting(false)
  }

  return (
    <div className="">
      <h1 className="">Rejestracja</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form className="">
            <div className="">
              <Field name="email" component={CustomInputComponent} text="Email" />
            </div>
            <div className="">
              <Field name="password" component={CustomInputComponent} text="Hasło" type="password" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LoginPage
