import { Link } from 'react-router-dom'

const SingleOffer = ({ offer }) => {
  return (
    <div>
      <Link to={`/offers/${offer.id}`}>{offer.offerName}</Link>
      <img src={offer.photo} alt="" />
    </div>
  )
}
export default SingleOffer
