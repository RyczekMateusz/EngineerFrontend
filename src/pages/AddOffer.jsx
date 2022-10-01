import { Formik, Field, Form, ErrorMessage } from 'formik'
import { useCreateOffer } from '../api/offers/hooks'
import validationSchema from '../helpers/validation'

const initialValues = {
  offerName: '',
  address: {
    city: '',
    street: '',
    houseNumber: '',
  },
  price: 0,
}

const CustomInputComponent = ({ field, form: { touched, errors }, ...props }) => (
  <div className="add-offer-form__offer-input">
    <label>{props.text}</label>
    <br />
    <input {...field} {...props} />
    <br />
    <ErrorMessage name={field.name} />
  </div>
)

const AddOffer = () => {
  const { mutate: addOffer } = useCreateOffer()

  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    addOffer(values)
    resetForm(initialValues)
    setSubmitting(false)
  }

  return (
    <div className="add-offer-wrapper">
      <h1 className="add-offer-wrapper__header">Dodaj nową ofertę</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <Field name={'offerName'} component={CustomInputComponent} text={'Nazwa oferty'} />
            <Field name={'address.city'} component={CustomInputComponent} text={'Miasto'} />
            <Field name={'address.street'} component={CustomInputComponent} text={'Ulica'} />
            <Field name={'address.houseNumber'} component={CustomInputComponent} text={'Numer mieszkania'} />
            <Field name={'price'} type={'number'} component={CustomInputComponent} text={'Cena'} />
            <button disabled={isSubmitting}>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AddOffer
