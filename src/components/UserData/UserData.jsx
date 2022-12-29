import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useDeleteOffer, useGetOffersByOwnerId } from '../../api/offers/hooks'
import { UserContext } from '../../context/UserContext'
import SingleOffer from '../OffersListing/SingleOffer'

const UserData = ({ openEditMode }) => {
  const { user } = useContext(UserContext)
  const { data, isLoading, refetch } = useGetOffersByOwnerId({ ownerId: user['_id'] })
  const { mutate: deleteOffer } = useDeleteOffer({ onSuccess: () => refetch() })

  const handleDeleteOffer = offerId => {
    deleteOffer(offerId)
  }

  return (
    <div className="user-profile-wrapper">
      <h1>Twoje dane</h1>
      <button onClick={() => openEditMode(true)}>Edytuj dane</button>
      <h1>Twoje oferty</h1>

      <div>
        {!isLoading &&
          data.map(offer => (
            <div key={offer._id} className="user-profile__offers">
              <SingleOffer offer={offer} wrapperClass="user-profile__single-offer" offerBaseClass="user-profile" />
              <div className="user-profile__offer-buttons">
                <Link to={`edit`} state={{ offerId: offer._id }} className="user-profile__offer-button">
                  Edytuj Ofertę
                </Link>
                <button onClick={() => handleDeleteOffer(offer._id)} className="user-profile__offer-button">
                  Delete offer
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default UserData
