import { useParams } from 'react-router-dom'
import { useGetOfferById } from '../api/offers/hooks'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { useGetUserByOwnerId } from '../api/users/hooks'
import { useTranslation } from 'react-i18next'
import { useMedia } from 'react-use'
import InformationBox from '../components/InformationBox'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useMap } from 'react-leaflet/hooks'
import { SearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import { useEffect } from 'react'

const OfferDetails = () => {
  const isMobile = useMedia('(max-width: 599px)')
  const { t } = useTranslation()
  let { offerId } = useParams()

  const { data: offer, isLoading: isLoadingOffer } = useGetOfferById({ offerId })

  const { data: owner, isLoading: isLoadingOwner } = useGetUserByOwnerId({ ownerId: offer?.ownerId, enabled: !!offer })

  if (isLoadingOffer || isLoadingOwner) {
    return null
  }

  const position = [offer.location.lat, offer.location.lng]

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
          <div className="offer-details__leaflet">
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
              <SearchField />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>{`${offer.address.city}, ${offer.address.street}`}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        {!isMobile && <InformationBox owner={owner} offer={offer} />}
      </div>
    </div>
  )
}

export default OfferDetails

const SearchField = () => {
  const provider = new OpenStreetMapProvider()

  const map = useMap()

  const searchControl = new SearchControl({
    style: 'button',
    position: 'topright',
    provider: new OpenStreetMapProvider(),
  })

  useEffect(() => {
    map.addControl(searchControl)
    return () => map.removeControl(searchControl)
  }, [])

  return null
}
