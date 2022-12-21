import { Formik, Field, Form } from 'formik'
import { useNavigate } from 'react-router'
import { NavLink } from 'react-router-dom'
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
    <div className="login-page-wrapper">
      <div className="login-page">
        <span className="login-page__title">Sign in to your account</span>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form className="login-page__form">
              <Field name="email" component={CustomInputComponent} wrapperClass="login-page__input" text="Email" />
              <Field
                name="password"
                component={CustomInputComponent}
                wrapperClass="login-page__input"
                text="Password"
                type="password"
              />
              <input value="Login" type="submit" disabled={isSubmitting} className="login-page__button" />
            </Form>
          )}
        </Formik>
      </div>
      <span className="create-account">
        Don't have an account? <NavLink to="/register">Sign up</NavLink>
      </span>
    </div>
  )
}

export default LoginPage
