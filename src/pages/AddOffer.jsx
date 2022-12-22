import { useContext } from 'react'
import { useCreateOffer } from '../api/offers/hooks'
import OfferForm from '../components/OfferForm'
import { UserContext } from '../context/UserContext'

const AddOffer = () => {
  const { mutate: addOffer } = useCreateOffer()
  const { user } = useContext(UserContext)

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
    photos: [
      'https://via.placeholder.com/140x100',
      'https://via.placeholder.com/140x100',
      'https://via.placeholder.com/140x100',
    ],
    ownerId: user['_id'] || 0,
  }

  return (
    <div className="add-offer-wrapper">
      <h1 className="add-offer-wrapper__header">Dodaj nową ofertę</h1>
      <OfferForm initialValues={initialValues} onSubmitCall={addOffer} />
    </div>
  )
}

export default AddOffer
