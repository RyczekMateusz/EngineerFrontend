import SingleOffer from './SingleOffer'
import ReactPaginate from 'react-paginate'
import { useMedia } from 'react-use'

const OffersListing = ({ pageCount, offers, searchQuery, setSearchQuery, refetchOffers }) => {
  const isMobile = useMedia('(max-width: 599px)')

  return (
    <div className="offers-listing">
      {pageCount !== 1 && (
        <ReactPaginate
          marginPagesDisplayed={isMobile ? 1 : 3}
          containerClassName="offers-listing__pagination-wrapper"
          breakLabel="..."
          nextLabel=">"
          onPageChange={async ({ selected }) => {
            await setSearchQuery({ ...searchQuery, page: selected + 1 })
            refetchOffers()
          }}
          pageRangeDisplayed={isMobile ? 1 : 2}
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
