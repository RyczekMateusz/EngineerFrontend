import { Field, Form, Formik } from 'formik'
import { omit } from 'lodash'
import { useState } from 'react'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { useArchiveOffer, useDeleteOffer, useGetOffersByOwnerId } from '../api/offers/hooks'
import { useUpdateUser } from '../api/users'
import CustomInputComponent from '../components/CustomInputComponent'
import SingleOffer from '../components/OffersListing/SingleOffer'
import { UserContext } from '../context/UserContext'

const UserProfilePage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { user, setUser } = useContext(UserContext)
  const [isEditMode, setIsEditMode] = useState(false)
  const { data, isLoading, refetch } = useGetOffersByOwnerId({ ownerId: user?._id })
  const { mutate: deleteOffer } = useDeleteOffer({ onSuccess: () => refetch() })
  const { mutate: archiveOffer } = useArchiveOffer({
    onSuccess: () => refetch(),
  })

  const { mutate: updateUser } = useUpdateUser({
    onSuccess: newData => {
      const newUserData = { ...user, ...newData.data }
      setUser(newUserData)
      setIsEditMode(false)
    },
  })

  const handleDeleteOffer = offerId => {
    deleteOffer(offerId)
  }

  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    updateUser({ values, userId: user['_id'] })
  }

  if (!user) {
    navigate('/login')
  }

  return (
    <div className="user-profile-wrapper">
      <h1>{t('YOUR_INFORMATION')}</h1>
      <div className="user-profile-info">
        <Formik initialValues={omit(user, ['token', '_id', 'email'])} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form className="">
              <div className="">
                <Field
                  name="firstName"
                  component={CustomInputComponent}
                  text={t('FIRST_NAME')}
                  wrapperClass="user-profile-info__info-input"
                  disabled={!isEditMode}
                />
              </div>
              <div className="">
                <Field
                  name="lastName"
                  component={CustomInputComponent}
                  text={t('LAST_NAME')}
                  wrapperClass="user-profile-info__info-input"
                  disabled={!isEditMode}
                />
              </div>
              <div className="">
                <Field
                  name="phoneNumber"
                  component={CustomInputComponent}
                  text={t('PHONE_NUMBER')}
                  wrapperClass="user-profile-info__info-input"
                  disabled={!isEditMode}
                />
              </div>

              {isEditMode && (
                <>
                  <button
                    aria-label="cancel"
                    className="user-profile-info__info-button"
                    onClick={() => setIsEditMode(false)}>
                    {t('CANCEL')}
                  </button>
                  <button
                    aria-label="save"
                    className="user-profile-info__info-button"
                    type="submit"
                    disabled={isSubmitting}>
                    {t('SAVE')}
                  </button>
                </>
              )}
            </Form>
          )}
        </Formik>
      </div>
      {!isEditMode && (
        <button aria-label="edit" onClick={() => setIsEditMode(true)} className="user-profile-info__info-button">
          {t('EDIT')}
        </button>
      )}

      <h1>{t('YOUR_OFFERS')}</h1>

      <div className="offers">
        {!isLoading &&
          data.map(offer => (
            <div key={offer._id}>
              <SingleOffer
                offer={offer}
                wrapperClass={`user-profile-offers__single-offer${
                  offer.isArchived ? ' user-profile-offers__single-offer--archived' : ''
                }`}
                offerBaseClass="user-profile-offers"
              />
              <div className="user-profile-offers__offer-buttons">
                <Link
                  aria-label="edit offer"
                  to={`edit`}
                  state={{ offerId: offer._id }}
                  className="user-profile-offers__offer-button">
                  {t('EDIT_OFFER')}
                </Link>
                <button
                  aria-label="delete offer"
                  onClick={() => handleDeleteOffer(offer._id)}
                  className="user-profile-offers__offer-button">
                  {t('DELETE_OFFER')}
                </button>
                <button
                  aria-label={offer.isArchived ? t('ACTIVATE_OFFER') : t('ARCHIVE_OFFER')}
                  onClick={() => archiveOffer(offer._id)}
                  className="user-profile-offers__offer-button">
                  {offer.isArchived ? t('ACTIVATE_OFFER') : t('ARCHIVE_OFFER')}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default UserProfilePage
