import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useCreateOffer } from '../../api/offers'
//import { addOffer } from '../fetures/offers'

const initialValues = {
  offerName: '',
  address: {
    city: '',
    street: '',
    houseNumber: '',
  },
  price: 0,
}

//const onSubmit = values => addOffer(values)

const validationSchema = Yup.object({
  offerName: Yup.string().required('Pole obowiązkowe!'),
  address: Yup.object({
    city: Yup.string().required('Pole obowiązkowe!'),
    street: Yup.string().required('Pole obowiązkowe!'),
    houseNumber: Yup.string().required('Pole obowiązkowe!'),
  }),
  price: Yup.number().required('Pole obowiązkowe!'),
})

const AddOffer = () => {
  const { mutate: addOffer } = useCreateOffer()

  const onSubmit = values => addOffer(values)

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
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
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  )
}

export default AddOffer
