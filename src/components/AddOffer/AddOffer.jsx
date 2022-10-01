import { Formik, Field, Form, ErrorMessage } from 'formik'
import { useCreateOffer } from '../../api/offers'
import validationSchema from '../../helpers/validation'

const initialValues = {
  offerName: '',
  address: {
    city: '',
    street: '',
    houseNumber: '',
  },
  price: 0,
}

const AddOffer = () => {
  const { mutate: addOffer } = useCreateOffer()

  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    addOffer(values)
    resetForm({})
    setSubmitting(false)
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <label htmlFor="offerName">Nazwa oferty</label>
          <Field type="text" id="offerName" name="offerName"></Field>
          <ErrorMessage name="offerName" />
          <br />
          <label htmlFor="address.city">Miasto</label>
          <Field type="text" id="address.city" name="address.city"></Field>
          <ErrorMessage name="address.city" />
          <br />
          <label htmlFor="address.street">Ulica</label>
          <Field type="text" id="address.street" name="address.street"></Field>
          <ErrorMessage name="address.street" />
          <br />
          <label htmlFor="address.houseNumber">Numer mieszkania</label>
          <Field type="text" id="address.houseNumber" name="address.houseNumber"></Field>
          <ErrorMessage name="address.houseNumber" />
          <br />
          <label htmlFor="price">Cena wynajmu</label>
          <Field type="number" id="price" name="price"></Field>
          <ErrorMessage name="price" />
          <br />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default AddOffer
