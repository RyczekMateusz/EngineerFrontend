import axios from 'axios'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { forEach, omit } from 'lodash'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useCreateOffer } from '../api/offers/hooks'
import { useLogUser } from '../api/users'
import DropzoneComponent from '../components/DropzoneComponent/DropzoneComponent'
import RichTextEditor from '../components/RichTextEditor'
import { validationUserLoginSchema } from '../helpers/validation'

const initialValues = {
  password: '',
  email: '',
}

// const CustomInputComponent = ({ field, form: { touched, errors }, ...props }) => (
//   <div className="add-offer-form__offer-input">
//     <label>{props.text}</label>
//     <br />
//     <input {...field} {...props} />
//     <br />
//     <div className="add-offer-form__offer-input__error-msg">
//       <ErrorMessage name={field.name} />
//     </div>
//   </div>
// )

const LoginPage = () => {
  const navigate = useNavigate()

  const { mutate: logUser } = useLogUser({
    onSuccess: data => {
      localStorage.setItem('loggedUser', JSON.stringify(data.data))
      // navigate('/', { state: data.data })
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
        {/* <Formik
        initialValues={initialValues}
        validationSchema={validationUserLoginSchema}
        onSubmit={onSubmit}> */}
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
