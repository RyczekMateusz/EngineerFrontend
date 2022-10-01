import { Link } from 'react-router-dom'

const SingleOffer = ({ offer }) => {
  return (
    <div className="offer-wrapper">
      <Link to={`/offers/${offer.id}`}>
        <div className="single-offer">
          {/* <img src={offer.photo} alt="" className="single-offer__offer-img" /> */}
          <img src="https://via.placeholder.com/150" alt="" className="single-offer__offer-img" />
          <div className="single-offer__offer-desc">
            <h2 className="single-offer__offer-desc__offer-title">{offer.offerName}</h2>
            <p className="single-offer__offer-desc__offer-details">
              {offer.address.city}, {offer.address.district}, {offer.address.street}
            </p>
          </div>
          <p className="single-offer__offer-price">{offer.price}zł/msc</p>
        </div>
      </Link>
    </div>
  )
}

export default SingleOffer
