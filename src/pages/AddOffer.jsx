import { Formik, Field, Form, ErrorMessage } from 'formik'
import { useCreateOffer } from '../api/offers/hooks'
import validationSchema from '../helpers/validation'

const initialValues = {
  offerName: '',
  address: {
    city: '',
    street: '',
    district: '',
  },
  price: 0,
  area: 0,
  roomsNumber: 0,
  details: '',
}

const CustomInputComponent = ({ field, form: { touched, errors }, ...props }) => (
  <div className="add-offer-form__offer-input">
    <label>{props.text}</label>
    <br />
    <input {...field} {...props} />
    <br />
    <div className="add-offer-form__offer-input__error-msg">
      <ErrorMessage name={field.name} />
    </div>
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
          <Form className="add-offer-form">
            <div className="add-offer-form__offerName">
              <Field name={'offerName'} component={CustomInputComponent} text={'Nazwa oferty'} />
            </div>

            <div className="add-offer-form__address">
              <div className="add-offer-form__address__city">
                <Field name={'address.city'} component={CustomInputComponent} text={'Miasto'} />
              </div>

              <div className="add-offer-form__address__district">
                <Field name={'address.district'} component={CustomInputComponent} text={'Dzielnica'} />
              </div>

              <div className="add-offer-form__address__street">
                <Field name={'address.street'} component={CustomInputComponent} text={'Ulica'} />
              </div>
            </div>

            <div className="add-offer-form__basics">
              <Field name={'price'} type={'number'} component={CustomInputComponent} text={'Cena'} />
              <Field name={'area'} type={'number'} component={CustomInputComponent} text={'Powierzchnia'} />
              <Field name={'roomsNumber'} type={'number'} component={CustomInputComponent} text={'Liczba pokoi'} />
            </div>

            <div className="add-offer-form__details">
              <Field name={'details'} component={CustomInputComponent} text={'Informacje dodatkowe'} />
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

export default AddOffer
