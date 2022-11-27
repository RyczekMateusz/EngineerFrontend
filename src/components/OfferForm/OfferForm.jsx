import { Formik, Field, Form } from 'formik'
import { forEach } from 'lodash'
import { validationOfferSchema } from '../../helpers/validation'
import CustomInputComponent from '../CustomInputComponent'
import DropzoneComponent from '../DropzoneComponent/DropzoneComponent'
import RichTextEditor from '../RichTextEditor'

const userData = JSON.parse(localStorage.getItem('loggedUser'))

const OfferForm = ({ initialValues, onSubmitCall, withoutPhotos = false }) => {
  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    const formData = new FormData()
    forEach(values, (value, fieldName) => {
      if (fieldName === 'address') {
        formData.append(fieldName, JSON.stringify(value))
        return
      }
      if (fieldName === 'photos') {
        forEach(value, photoLink => {
          formData.append(fieldName, photoLink)
        })
        return
      }
      formData.append(fieldName, value)
    })
    onSubmitCall(formData)
  }

  if (!initialValues) {
    return null
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationOfferSchema} onSubmit={onSubmit}>
      {({ isSubmitting, setFieldValue }) => (
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
            <Field name={'details'} component={RichTextEditor} text={'Informacje dodatkowe'} />
          </div>

          {!withoutPhotos && (
            <div>
              <Field name={'photos'} component={DropzoneComponent} text={'Zdjęcia'} />
            </div>
          )}

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default OfferForm
