import SingleOffer from './SingleOffer'
import ReactPaginate from 'react-paginate'

const OffersListing = ({ pageCount, offers, searchQuery, setSearchQuery, refetchOffers }) => {
  return (
    <div className="offers-page__offers-listing-wrapper">
      {pageCount !== 1 && (
        <ReactPaginate
          containerClassName="offers-page__pagination-wrapper"
          breakLabel="..."
          nextLabel=">"
          onPageChange={async ({ selected }) => {
            await setSearchQuery({ ...searchQuery, page: selected + 1 })
            refetchOffers()
          }}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<"
        />
      )}
      {offers.map(offer => (
        <SingleOffer offer={offer} key={offer._id} />
      ))}
    </div>
  )
}

export default OffersListing
