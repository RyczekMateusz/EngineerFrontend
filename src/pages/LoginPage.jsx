import { Formik, Field, Form } from 'formik'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setStorage } = useLoginUser()

  const {
    mutate: logUser,
    isError,
    error,
  } = useLogUser({
    onSuccess: data => {
      setStorage('loggedUser', data.data)
      navigate('/')
    },
  })

  const onSubmit = async (values, { setSubmitting }) => {
    logUser(values)
    setSubmitting(false)
  }

  const inputClassName = isError ? 'login-page__input login-page__input--error' : 'login-page__input'

  return (
    <div className="login-page-wrapper">
      <div className="login-page">
        <span className="login-page__title">{t('SIGN_IN_TO_YOUR_ACCOUNT')}</span>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form className="login-page__form">
              <Field name="email" component={CustomInputComponent} wrapperClass={inputClassName} text={t('EMAIL')} />
              <Field
                name="password"
                component={CustomInputComponent}
                wrapperClass={inputClassName}
                text={t('PASSWORD')}
                type="password"
              />
              {isError && <span className="login-page__errorMsg">{error.response.data.error}</span>}
              <input value={t('LOGIN')} type="submit" disabled={isSubmitting} className="login-page__button" />
            </Form>
          )}
        </Formik>
      </div>
      <span className="create-account">
        {t('DO_NOT_HAVE_ACCOUNT')} <NavLink to="/register">{t('SIGN_UP')}</NavLink>
      </span>
    </div>
  )
}

export default LoginPage
