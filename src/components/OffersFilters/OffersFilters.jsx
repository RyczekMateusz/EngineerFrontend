import { useGetAvailableCites, useGetAvailableDistricts } from '../../api/offers/hooks'

const OffersFilters = ({ cityParam }) => {
  console.log(!!cityParam)
  const { data } = useGetAvailableCites()
  const { data: district } = useGetAvailableDistricts({ cityParam, enabled: !!cityParam })

  return <div className="offers-page__offers-filters-wrapper">OffersFilters</div>
}

export default OffersFilters
