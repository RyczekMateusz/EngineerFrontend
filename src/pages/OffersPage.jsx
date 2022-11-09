import { useMemo } from 'react'
import { useLocation } from 'react-router'
import { useGetOffers } from '../api/offers/hooks'
import OffersFilters from '../components/OffersFilters'
import OffersListing from '../components/OffersListing'

const OffersPage = () => {
  const location = useLocation()
  const searchQuery = useMemo(() => new URLSearchParams(location.search).get('city') || '', [location])

  const { data, isSuccess } = useGetOffers({ searchQuery })

  if (!isSuccess) {
    return null
  }

  return (
    <div>
      <OffersListing offers={data} /> <OffersFilters />
    </div>
  )
}

export default OffersPage
