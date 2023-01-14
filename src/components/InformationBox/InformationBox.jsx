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
  )
}

export default InformationBox
