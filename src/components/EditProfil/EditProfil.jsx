import { Field, Form, Formik } from 'formik'
import { omit } from 'lodash'
import { useUpdateUser } from '../../api/users'
import CustomInputComponent from '../CustomInputComponent'

// const CustomInputComponent = ({ field, form: { touched, errors }, ...props }) => (
//   <div className="add-offer-form__offer-input">
//     <label>{props.text}</label>
//     <br />
//     <input {...field} {...props} />
//     <br />
//     <div className="add-offer-form__offer-input__error-msg">{/* <ErrorMessage name={field.name} /> */}</div>
//   </div>
// )

const EditProfil = ({ exitEditMode }) => {
  const userData = JSON.parse(localStorage.getItem('loggedUser'))
  const { mutate: updateUser } = useUpdateUser({
    onSuccess: newData => {
      const newUserData = { ...userData, ...newData.data }
      localStorage.setItem('loggedUser', JSON.stringify(newUserData))
      exitEditMode(false)
    },
  })

  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    updateUser({ values, userId: userData['_id'] })
  }

  return (
    <div>
      <Formik initialValues={omit(userData, ['token', '_id', 'email'])} onSubmit={onSubmit}>
        {/* <Formik
        initialValues={initialValues}
        validationSchema={validationUserSchema}
        onSubmit={onSubmit}> */}
        {({ isSubmitting }) => (
          <Form className="">
            <div className="">
              <Field name="firstName" component={CustomInputComponent} text="Imię" />
            </div>
            <div className="">
              <Field name="lastName" component={CustomInputComponent} text="Nazwisko" />
            </div>
            <div className="">
              <Field name="phoneNumber" component={CustomInputComponent} text="Numer telefonu" />
            </div>

            <button type="submit" onClick={() => exitEditMode(false)}>
              Zamknij
            </button>
            <button type="submit" disabled={isSubmitting}>
              Zapisz dane
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default EditProfil
