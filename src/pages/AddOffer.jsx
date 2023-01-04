import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useCreateOffer } from '../api/offers/hooks'
import OfferForm from '../components/OfferForm'
import { UserContext } from '../context/UserContext'

const AddOffer = () => {
  const { mutate: addOffer } = useCreateOffer()
  const { user } = useContext(UserContext)
  const { t } = useTranslation()

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
    mainPhoto: 'https://via.placeholder.com/140x100',
    photos: [],
    ownerId: user['_id'] || 0,
  }

  return (
    <div className="add-offer-wrapper">
      <h1 className="add-offer-wrapper__header">{t('ADD_NEW_OFFER')}</h1>
      <OfferForm initialValues={initialValues} onSubmitCall={addOffer} redirectTo="/offers" />
    </div>
  )
}

export default AddOffer
