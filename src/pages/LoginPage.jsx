import clsx from 'clsx'
import { Formik, Field, Form } from 'formik'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { NavLink } from 'react-router-dom'
import { useMedia } from 'react-use'
import { baseURL } from '../api/client'
import { useLogUser } from '../api/users'
import CustomInputComponent from '../components/CustomInputComponent'
import { UserContext } from '../context/UserContext'
import useLoginUser from '../hooks/useLoginUser'

const initialValues = {
  password: '',
  email: '',
}

const LoginPage = () => {
  const isMobile = useMedia('(max-width: 599px)')
  const { user } = useContext(UserContext)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setStorage } = useLoginUser()

  if (user) {
    navigate('/')
  }

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
      <div className={clsx('login-page', isMobile && 'login-page--mobile')}>
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
        <button
          className="login-page__button login-page__googleButton"
          onClick={() => window.open(`${baseURL}/auth/google`, '_self')}>
          {t('LOG_IN_WITH_GOOGLE')}
        </button>
      </div>
      <span className={clsx('create-account', isMobile && 'create-account--mobile')}>
        {t('DO_NOT_HAVE_ACCOUNT')} <NavLink to="/register">{t('SIGN_UP')}</NavLink>
      </span>
    </div>
  )
}

export default LoginPage
