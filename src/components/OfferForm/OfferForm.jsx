import { Formik, Field, Form } from 'formik'
import { forEach } from 'lodash'
import { useNavigate } from 'react-router'
import { validationOfferSchema } from '../../helpers/validation'
import CustomInputComponent from '../CustomInputComponent'
import DropzoneComponent from '../DropzoneComponent/DropzoneComponent'
import RichTextEditor from '../RichTextEditor'

const OfferForm = ({ initialValues, onSubmitCall, withoutPhotos = false, redirectTo = '/' }) => {
  const navigate = useNavigate()

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
    navigate(redirectTo)
  }

  if (!initialValues) {
    return null
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationOfferSchema} onSubmit={onSubmit}>
      {({ isSubmitting, setFieldValue }) => (
        <Form className="add-offer-form">
          <div className="add-offer-form__offerName">
            <Field
              name="offerName"
              component={CustomInputComponent}
              text="Nazwa oferty"
              wrapperClass="add-offer-form__offer-input"
              errorClass="add-offer-form__offer-input__error-msg"
            />
          </div>

          <div className="add-offer-form__address">
            <div className="add-offer-form__address__city">
              <Field
                name="address.city"
                component={CustomInputComponent}
                text="Miasto"
                wrapperClass="add-offer-form__offer-input"
                errorClass="add-offer-form__offer-input__error-msg"
              />
            </div>

            <div className="add-offer-form__address__district">
              <Field
                name="address.district"
                component={CustomInputComponent}
                text="Dzielnica"
                wrapperClass="add-offer-form__offer-input"
                errorClass="add-offer-form__offer-input__error-msg"
              />
            </div>

            <div className="add-offer-form__address__street">
              <Field
                name="address.street"
                component={CustomInputComponent}
                text="Ulica"
                wrapperClass="add-offer-form__offer-input"
                errorClass="add-offer-form__offer-input__error-msg"
              />
            </div>
          </div>

          <div className="add-offer-form__basics">
            <Field
              name="price"
              type="number"
              component={CustomInputComponent}
              text="Cena"
              wrapperClass="add-offer-form__offer-input"
              errorClass="add-offer-form__offer-input__error-msg"
            />
            <Field
              name="area"
              type="number"
              component={CustomInputComponent}
              text="Powierzchnia"
              wrapperClass="add-offer-form__offer-input"
              errorClass="add-offer-form__offer-input__error-msg"
            />
            <Field
              name="roomsNumber"
              type="number"
              component={CustomInputComponent}
              text="Liczba pokoi"
              wrapperClass="add-offer-form__offer-input"
              errorClass="add-offer-form__offer-input__error-msg"
            />
          </div>

          <div className="add-offer-form__details">
            <Field
              name="details"
              component={RichTextEditor}
              text="Informacje dodatkowe"
              wrapperClass="add-offer-form__offer-input"
              errorClass="add-offer-form__offer-input__error-msg"
            />
          </div>

          {!withoutPhotos && (
            <div>
              <Field
                name="photos"
                component={DropzoneComponent}
                text="Zdjęcia"
                wrapperClass="add-offer-form__offer-input"
                errorClass="add-offer-form__offer-input__error-msg"
              />
            </div>
          )}
          <button type="submit" disabled={isSubmitting} className="add-offer-form__submit-button">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default OfferForm
