import { useGetOffersByOwnerId } from '../../api/offers/hooks'

const UserData = ({ openEditMode }) => {
  const userData = JSON.parse(localStorage.getItem('loggedUser'))
  const { data } = useGetOffersByOwnerId({ ownerId: userData['_id'] })

  return (
    <div>
      <h1>Twoje dane</h1>
      <button onClick={() => openEditMode(true)}>Edytuj dane</button>
      <h1>Twoje oferty</h1>
    </div>
  )
}

export default UserData
