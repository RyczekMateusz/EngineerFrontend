import { useState } from 'react'
import { useLocation } from 'react-router'
import { useGetOffers } from '../api/offers/hooks'
import OffersFilters from '../components/OffersFilters'
import OffersListing from '../components/OffersListing'

const OffersPage = () => {
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    'address.city': location?.state?.data || null,
    'address.district': null,
    minPrice: null,
    maxPrice: null,
  })

  const { data: { offersCount, offersList, limit } = {}, isSuccess, refetch } = useGetOffers({ searchQuery })

  const pageCount = Math.ceil(offersCount / limit)

  if (!isSuccess) {
    return null
  }

  return (
    <div className="offers-page-wrapper">
      <OffersFilters refetchOffers={refetch} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <OffersListing
        pageCount={pageCount}
        offers={offersList}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        refetchOffers={refetch}
      />
    </div>
  )
}

export default OffersPage
