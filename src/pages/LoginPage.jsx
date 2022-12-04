import axios from 'axios'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { forEach, omit } from 'lodash'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useCreateOffer } from '../api/offers/hooks'
import { useLogUser } from '../api/users'
import CustomInputComponent from '../components/CustomInputComponent'
import DropzoneComponent from '../components/DropzoneComponent/DropzoneComponent'
import RichTextEditor from '../components/RichTextEditor'
import { validationUserLoginSchema } from '../helpers/validation'

const initialValues = {
  password: '',
  email: '',
}

const LoginPage = () => {
  const navigate = useNavigate()

  const { mutate: logUser } = useLogUser({
    onSuccess: data => {
      localStorage.setItem('loggedUser', JSON.stringify(data.data))
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
