import { useGetOffers } from '../api/offers/hooks'
import OffersFilters from '../components/OffersFilters'
import OffersListing from '../components/OffersListing'

const OffersPage = () => {
  const { data, isSuccess } = useGetOffers()

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
