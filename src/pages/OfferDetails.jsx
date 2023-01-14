import { useParams } from 'react-router-dom'
import { useGetOfferById } from '../api/offers/hooks'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { useGetUserByOwnerId } from '../api/users/hooks'
import { useTranslation } from 'react-i18next'
import { useMedia } from 'react-use'
import InformationBox from '../components/InformationBox'

const OfferDetails = () => {
  const isMobile = useMedia('(max-width: 599px)')
  const { t } = useTranslation()
  let { offerId } = useParams()

  const { data: offer } = useGetOfferById({ offerId })

  const { data: owner } = useGetUserByOwnerId({ ownerId: offer?.ownerId, enabled: !!offer })

  if (!offer || !owner) {
    return null
  }

  return (
    <div className="offer-details-wrapper">
      <h1>{offer?.offerName}</h1>
      <div className="offer-details">
        <div className="offer-details__main-box">
          <Carousel className="offer-details__carousel">
            {offer.photos.map((photo, index) => (
              <div key={index}>
                <img src={photo} />
              </div>
            ))}
          </Carousel>
          {isMobile && <InformationBox owner={owner} offer={offer} />}
          <div dangerouslySetInnerHTML={{ __html: offer?.details }} />
        </div>

        {!isMobile && <InformationBox owner={owner} offer={offer} />}
      </div>
    </div>
  )
}

export default OfferDetails
