import { useParams } from 'react-router-dom'
import { useGetOfferById } from '../api/offers/hooks'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { useGetUserByOwnerId } from '../api/users/hooks'
import { ReactComponent as LocationIcon } from '../svg/location.svg'
import { ReactComponent as PriceIcon } from '../svg/pricetag2.svg'
import { ReactComponent as AreaIcon } from '../svg/arrows-diagonals.svg'
import { ReactComponent as BedIcon } from '../svg/bed.svg'
import { ReactComponent as UserIcon } from '../svg/user.svg'
import { ReactComponent as EmailIcon } from '../svg/email.svg'
import { ReactComponent as PhoneIcon } from '../svg/phone.svg'
import { useTranslation } from 'react-i18next'

const OfferDetails = () => {
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
          <div dangerouslySetInnerHTML={{ __html: offer?.details }} />
        </div>

        <div className="offer-details__info_box">
          <div>
            <h4>{t('CONTACT_DETAILS')}</h4>
            <p>
              <UserIcon className="offer-details__icon" />
              {owner.firstName}
            </p>
            <p>
              <EmailIcon className="offer-details__icon" />
              {owner.email}
            </p>
            <p>
              <PhoneIcon className="offer-details__icon" />
              {owner.phoneNumber}
            </p>
          </div>

          <div>
            <h4>{t('OFFER_DETAILS')}</h4>
            <p className="offer-details__location-wrapper">
              <LocationIcon className="offer-details__icon" />
              {offer?.address.city}, {offer?.address.district}, {offer?.address.street}
            </p>

            <p>
              <PriceIcon className="offer-details__icon" />
              {t('RENT_ZL_PER_MONTH', { price: offer.price })}
            </p>
            <p>
              <AreaIcon className="offer-details__icon" />
              {t('LIVING_AREA_NUMBER', { area: offer.area })}
            </p>
            <p>
              <BedIcon className="offer-details__icon" />
              {t('NUMBER_OF_ROOMS_NUMBER', { number: offer?.roomsNumber })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OfferDetails
