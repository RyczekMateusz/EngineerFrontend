import { Formik, Field, Form } from 'formik'
import { forEach } from 'lodash'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { normaliseAddress } from '../../helpers/normaliser'
import { validationOfferSchema } from '../../helpers/validation'
import CustomInputComponent from '../CustomInputComponent'
import DropzoneComponent from '../DropzoneComponent/DropzoneComponent'
import RichTextEditor from '../RichTextEditor'

const OfferForm = ({ initialValues, onSubmitCall, withoutPhotos = false, redirectTo = '/' }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    const formData = new FormData()
    forEach(values, (value, fieldName) => {
      if (fieldName === 'isArchived') {
        return
      }
      if (fieldName === 'address') {
        const normalisedAddress = normaliseAddress(value)
        formData.append(fieldName, JSON.stringify(normalisedAddress))
        return
      }
      if (fieldName === 'location') {
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
              text={t('OFFER_NAME')}
              wrapperClass="add-offer-form__offer-input"
              errorClass="add-offer-form__offer-input__error-msg"
            />
          </div>

          <div className="add-offer-form__address">
            <div className="add-offer-form__address__city">
              <Field
                name="address.city"
                component={CustomInputComponent}
                text={t('CITY')}
                wrapperClass="add-offer-form__offer-input"
                errorClass="add-offer-form__offer-input__error-msg"
              />
            </div>

            <div className="add-offer-form__address__district">
              <Field
                name="address.district"
                component={CustomInputComponent}
                text={t('DISTRICT')}
                wrapperClass="add-offer-form__offer-input"
                errorClass="add-offer-form__offer-input__error-msg"
              />
            </div>

            <div className="add-offer-form__address__street">
              <Field
                name="address.street"
                component={CustomInputComponent}
                text={t('STREET')}
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
              text={t('PRICE')}
              wrapperClass="add-offer-form__offer-input"
              errorClass="add-offer-form__offer-input__error-msg"
            />
            <Field
              name="area"
              type="number"
              component={CustomInputComponent}
              text={t('LIVING_AREA')}
              wrapperClass="add-offer-form__offer-input"
              errorClass="add-offer-form__offer-input__error-msg"
            />
            <Field
              name="roomsNumber"
              type="number"
              component={CustomInputComponent}
              text={t('NUMBER_OF_ROOMS')}
              wrapperClass="add-offer-form__offer-input"
              errorClass="add-offer-form__offer-input__error-msg"
            />
          </div>

          <div className="add-offer-form__details">
            <Field
              name="details"
              component={RichTextEditor}
              text={t('ADDITIONAL_INFO')}
              wrapperClass="add-offer-form__offer-input"
              errorClass="add-offer-form__offer-input__error-msg"
            />
          </div>

          {!withoutPhotos && (
            <div>
              <Field
                name="photos"
                component={DropzoneComponent}
                text={t('PHOTOS')}
                wrapperClass="add-offer-form__offer-input"
                errorClass="add-offer-form__offer-input__error-msg"
              />
            </div>
          )}
          <button type="submit" disabled={isSubmitting} className="add-offer-form__submit-button">
            {t('SUBMIT')}
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default OfferForm
