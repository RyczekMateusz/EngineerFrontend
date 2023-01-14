import clsx from 'clsx'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { omit } from 'lodash'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { useMedia } from 'react-use'
import { useCreateUser } from '../api/users'
import CustomInputComponent from '../components/CustomInputComponent'
import { UserContext } from '../context/UserContext'
import { validationUserSchema } from '../helpers/validation'

const initialValues = {
  firstName: '',
  lastName: '',
  password: '',
  rePassword: '',
  email: '',
  phoneNumber: '',
}

const RegisterUser = () => {
  const isMobile = useMedia('(max-width: 599px)')
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { mutate: createUser } = useCreateUser()

  if (user) {
    navigate('/')
  }

  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    values = omit(values, 'rePassword')
    createUser(values)
    resetForm(initialValues)
    setSubmitting(false)
  }

  return (
    <div className="register-page-wrapper">
      <div className={clsx('register-page', isMobile && 'register-page--mobile')}>
        <span className="register-page__title">{t('CREATE_NEW_ACCOUNT')}</span>
        <Formik initialValues={initialValues} validationSchema={validationUserSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form className="register-page__form">
              <Field
                name="email"
                component={CustomInputComponent}
                wrapperClass="register-page__input"
                text={t('EMAIL')}
              />
              <Field
                name="password"
                component={CustomInputComponent}
                wrapperClass="register-page__input"
                text={t('PASSWORD')}
                type="password"
              />
              <Field
                name="rePassword"
                component={CustomInputComponent}
                wrapperClass="register-page__input"
                text={t('RE_TYPE_PASSWORD')}
                type="password"
              />
              <Field
                name="firstName"
                component={CustomInputComponent}
                wrapperClass="register-page__input"
                text={t('FIRST_NAME')}
              />
              <Field
                name="lastName"
                component={CustomInputComponent}
                wrapperClass="register-page__input"
                text={t('LAST_NAME')}
              />
              <Field
                name="phoneNumber"
                component={CustomInputComponent}
                wrapperClass="register-page__input"
                text={t('PHONE_NUMBER')}
              />

              <input value={t('SIGN_UP')} type="submit" disabled={isSubmitting} className="register-page__button" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default RegisterUser
