import { forEach } from 'lodash'
import { useGetOfferById, useUpdateOffer } from '../../api/offers/hooks'
import OfferForm from '../OfferForm'

const userData = JSON.parse(localStorage.getItem('loggedUser'))

const EditOffer = ({ offerId = '636ed697acd34f89e02a1985' }) => {
  const { data } = useGetOfferById({ offerId })
  const { mutate: updateOffer } = useUpdateOffer()

  return (
    <div className="add-offer-wrapper">
      <h1 className="add-offer-wrapper__header">Edytuj ofertę</h1>
      <OfferForm initialValues={data} onSubmitCall={updateOffer} />
    </div>
  )
}

export default EditOffer
