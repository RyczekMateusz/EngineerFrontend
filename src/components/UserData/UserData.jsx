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
    <div>
      <h1>Twoje dane</h1>
      <button onClick={() => openEditMode(true)}>Edytuj dane</button>
      <h1>Twoje oferty</h1>

      {!isLoading &&
        data.map(offer => (
          <div key={offer._id}>
            <SingleOffer offer={offer} />
            <Link to={`edit`} state={{ offerId: offer._id }}>
              Edytuj Ofertę
            </Link>
            <button onClick={() => handleDeleteOffer(offer._id)}>Delete offer</button>
          </div>
        ))}
    </div>
  )
}

export default UserData
