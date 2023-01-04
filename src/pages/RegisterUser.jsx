import { Formik, Field, Form, ErrorMessage } from 'formik'
import { omit } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useCreateUser } from '../api/users'
import CustomInputComponent from '../components/CustomInputComponent'
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
  const { t } = useTranslation()
  const { mutate: createUser } = useCreateUser()

  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    values = omit(values, 'rePassword')
    createUser(values)
    resetForm(initialValues)
    setSubmitting(false)
  }

  return (
    <div className="register-page-wrapper">
      <div className="register-page">
        <span className="register-page__title">{t('CREATE_NEW_ACCOUNT')}</span>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {/* <Formik
        initialValues={initialValues}
        validationSchema={validationUserSchema}
        onSubmit={onSubmit}> */}
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
