import { useLocation } from 'react-router'
import { useGetOfferById, useUpdateOffer } from '../../api/offers/hooks'
import OfferForm from '../OfferForm'

const EditOffer = () => {
  const location = useLocation()
  const offerId = location.state.offerId
  const { data } = useGetOfferById({ offerId })
  const { mutate: updateOffer } = useUpdateOffer()

  return (
    <div className="add-offer-wrapper">
      <h1 className="add-offer-wrapper__header">Edytuj ofertę</h1>
      <OfferForm initialValues={data} onSubmitCall={updateOffer} withoutPhotos />
    </div>
  )
}

export default EditOffer
