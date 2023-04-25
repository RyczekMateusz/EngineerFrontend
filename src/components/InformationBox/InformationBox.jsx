import { useTranslation } from 'react-i18next'
import { ReactComponent as LocationIcon } from '../../svg/location.svg'
import { ReactComponent as PriceIcon } from '../../svg/pricetag2.svg'
import { ReactComponent as AreaIcon } from '../../svg/arrows-diagonals.svg'
import { ReactComponent as BedIcon } from '../../svg/bed.svg'
import { ReactComponent as UserIcon } from '../../svg/user.svg'
import { ReactComponent as EmailIcon } from '../../svg/email.svg'
import { ReactComponent as PhoneIcon } from '../../svg/phone.svg'

const InformationBox = ({ owner, offer }) => {
  const { t } = useTranslation()

  return (
    <div className="info-box">
      <h4 className="info-box__heading">{t('CONTACT_DETAILS')}</h4>
      <p className="info-box__detail">
        <UserIcon className="info-box__icon" />
        {owner.firstName}
      </p>
      <p className="info-box__detail">
        <EmailIcon className="info-box__icon" />
        {owner.email}
      </p>
      <p className="info-box__detail">
        <PhoneIcon className="info-box__icon" />
        {owner.phoneNumber}
      </p>

      <h4 className="info-box__heading">{t('OFFER_DETAILS')}</h4>
      <p className="info-box__location-detail">
        <LocationIcon className="info-box__icon" />
        {offer?.address.city}, {offer?.address.district}, {offer?.address.street}
      </p>

      <p className="info-box__detail">
        <PriceIcon className="info-box__icon" />
        {t('RENT_ZL_PER_MONTH', { price: offer.price })}
      </p>
      <p className="info-box__detail">
        <AreaIcon className="info-box__icon" />
        {t('LIVING_AREA_NUMBER', { area: offer.area })}
      </p>
      <p className="info-box__detail">
        <BedIcon className="info-box__icon" />
        {t('NUMBER_OF_ROOMS_NUMBER', { number: offer?.roomsNumber })}
      </p>
    </div>
  )
}

export default InformationBox
