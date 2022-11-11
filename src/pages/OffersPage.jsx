import { useState } from 'react'
import { useLocation } from 'react-router'
import { useGetOffers } from '../api/offers/hooks'
import OffersFilters from '../components/OffersFilters'
import OffersListing from '../components/OffersListing'

const OffersPage = () => {
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState(location?.state?.data || '')

  const { data, isSuccess } = useGetOffers({ searchQuery })

  if (!isSuccess) {
    return null
  }

  return (
    <div>
      <OffersListing offers={data} /> <OffersFilters cityParam={searchQuery} />
    </div>
  )
}

export default OffersPage
