import { useParams } from 'react-router-dom'
import { useGetOfferById } from '../api/offers/hooks'

const OfferDetails = () => {
  let { offerId } = useParams()

  const { data: offer } = useGetOfferById({ offerId })

  return (
    <div className="offer-details-wrapper">
      <h1>{offer?.offerName}</h1>
      <ul>
        <li>{offer?.address.city}</li>
        <li>{offer?.address.street}</li>
        <li>{offer?.address.district}</li>
      </ul>
      <p>{offer?.price}</p>
      <p>{offer?.area}</p>
      <p>{offer?.roomsNumber}</p>
      <p>{offer?.details}</p>
    </div>
  )
}

export default OfferDetails
