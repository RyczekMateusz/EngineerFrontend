import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'
import { useGetOfferById, useUpdateOffer } from '../../api/offers/hooks'
import { UserContext } from '../../context/UserContext'
import OfferForm from '../OfferForm'

const EditOffer = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const location = useLocation()
  const offerId = location.state.offerId
  const { data } = useGetOfferById({ offerId })
  const { mutate: updateOffer } = useUpdateOffer()
  const { t } = useTranslation()

  if (!user) {
    navigate('/login')
  }

  return (
    <div className="add-offer-wrapper">
      <h1 className="add-offer-wrapper__header">{t('EDIT_OFFER')}</h1>
      <OfferForm initialValues={data} onSubmitCall={updateOffer} withoutPhotos redirectTo="/myProfile" />
    </div>
  )
}

export default EditOffer
