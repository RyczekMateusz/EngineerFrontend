import { useState } from 'react'
import { useLocation } from 'react-router'
import { useGetOffers } from '../api/offers/hooks'
import OffersFilters from '../components/OffersFilters'
import OffersListing from '../components/OffersListing'

const OffersPage = () => {
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState({
    'address.city': location?.state?.data || null,
    'address.district': null,
    minPrice: null,
    maxPrice: null,
  })

  const { data, isSuccess, refetch } = useGetOffers({ searchQuery })

  if (!isSuccess) {
    return null
  }

  return (
    <div className="offers-page-wrapper">
      <OffersFilters refetchOffers={refetch} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <OffersListing offers={data} />
    </div>
  )
}

export default OffersPage
