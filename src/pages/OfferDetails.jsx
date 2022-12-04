import { useParams } from 'react-router-dom'
import { useGetOfferById } from '../api/offers/hooks'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

const OfferDetails = () => {
  let { offerId } = useParams()

  const { data: offer } = useGetOfferById({ offerId })

  if (!offer) {
    return null
  }

  return (
    <div className="offer-details-wrapper">
      <h1>{offer?.offerName}</h1>
      <Carousel width="700px">
        {offer.photos.map((photo, index) => (
          <div key={index}>
            <img src={photo} />
          </div>
        ))}
      </Carousel>

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
