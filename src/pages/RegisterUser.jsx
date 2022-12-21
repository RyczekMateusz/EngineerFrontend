import { Formik, Field, Form, ErrorMessage } from 'formik'
import { omit } from 'lodash'
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
        <span className="register-page__title">Create new account</span>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {/* <Formik
        initialValues={initialValues}
        validationSchema={validationUserSchema}
        onSubmit={onSubmit}> */}
          {({ isSubmitting }) => (
            <Form className="register-page__form">
              <Field name="email" component={CustomInputComponent} wrapperClass="register-page__input" text="Email" />
              <Field
                name="password"
                component={CustomInputComponent}
                wrapperClass="register-page__input"
                text="Password"
                type="password"
              />
              <Field
                name="rePassword"
                component={CustomInputComponent}
                wrapperClass="register-page__input"
                text="Re-type password"
                type="password"
              />
              <Field
                name="firstName"
                component={CustomInputComponent}
                wrapperClass="register-page__input"
                text="First name"
              />
              <Field
                name="lastName"
                component={CustomInputComponent}
                wrapperClass="register-page__input"
                text="Last name"
              />
              <Field
                name="phoneNumber"
                component={CustomInputComponent}
                wrapperClass="register-page__input"
                text="Phone number"
              />

              <input value="Sing up" type="submit" disabled={isSubmitting} className="register-page__button" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default RegisterUser
