import axios from 'axios'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { forEach, omit } from 'lodash'
import { useCreateOffer } from '../api/offers/hooks'
import { useCreateUser } from '../api/users'
import CustomInputComponent from '../components/CustomInputComponent'
import DropzoneComponent from '../components/DropzoneComponent/DropzoneComponent'
import RichTextEditor from '../components/RichTextEditor'
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
    <div className="">
      <h1 className="">Rejestracja</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {/* <Formik
        initialValues={initialValues}
        validationSchema={validationUserSchema}
        onSubmit={onSubmit}> */}
        {({ isSubmitting }) => (
          <Form className="">
            <div className="">
              <Field name="email" component={CustomInputComponent} text="Email" />
            </div>
            <div className="">
              <Field name="password" component={CustomInputComponent} text="Hasło" type="password" />
            </div>
            <div className="">
              <Field name="rePassword" component={CustomInputComponent} text="Powtórz hasło" type="password" />
            </div>
            <div className="">
              <Field name="firstName" component={CustomInputComponent} text="Imię" />
            </div>
            <div className="">
              <Field name="lastName" component={CustomInputComponent} text="Nazwisko" />
            </div>
            <div className="">
              <Field name="phoneNumber" component={CustomInputComponent} text="Numer telefonu" />
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

export default RegisterUser
