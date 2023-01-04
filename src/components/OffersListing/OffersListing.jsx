import SingleOffer from './SingleOffer'

const OffersListing = ({ offers }) => {
  return (
    <div className="offers-page__offers-listing-wrapper">
      {offers.map(offer => (
        <SingleOffer offer={offer} key={offer._id} />
      ))}
    </div>
  )
}

export default OffersListing
