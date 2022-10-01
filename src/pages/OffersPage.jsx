import { useGetOffers } from '../api/offers/hooks'
import OffersFilters from '../components/OffersFilters'
import OffersListing from '../components/OffersListing'

const OffersPage = () => {
  const { data } = useGetOffers()

  return (
    <div>
      <OffersListing /> <OffersFilters />
    </div>
  )
}

export default OffersPage
