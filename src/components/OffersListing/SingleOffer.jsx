import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const SingleOffer = ({ offer, wrapperClass = 'offer-wrapper', offerBaseClass = 'single-offer' }) => {
  const { t } = useTranslation()
  const imgUrl = offer?.mainPhotoUrl ? offer?.mainPhotoUrl : offer?.mainPhoto
  return (
    // <div className={wrapperClass}>
    <Link to={`/offers/${offer._id}`} className={offerBaseClass}>
      <img src={imgUrl} alt="" className={`${offerBaseClass}__offer-img`} />
      <div className={`${offerBaseClass}__offer-desc`}>
        <h2 className={`${offerBaseClass}__offer-desc__offer-title`}>{offer.offerName}</h2>
        <p className={`${offerBaseClass}__offer-desc__offer-details`}>
          {offer.address.city}, {offer.address.district}, {offer.address.street}
        </p>
      </div>
      <p className={`${offerBaseClass}__offer-price`}>{t('ZL_PER_MONTH', { price: offer.price })}</p>
    </Link>
    // </div>
  )
}

export default SingleOffer
