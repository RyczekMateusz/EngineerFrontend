import { trim } from 'lodash'
import Select from 'react-select'
import { useGetAvailableCites, useGetAvailableDistricts } from '../../api/offers/hooks'

const OffersFilters = ({ refetchOffers, searchQuery, setSearchQuery }) => {
  const { data: citiesArray = [] } = useGetAvailableCites()
  const { data: districtsArray } = useGetAvailableDistricts({ searchQuery, enabled: !!searchQuery['address.city'] })

  const citiesSelectOptions = citiesArray.map(city => {
    return { value: city, label: city }
  })

  const districtsSelectOptions =
    districtsArray &&
    districtsArray.map(district => {
      return { value: district, label: district }
    })

  const cityParamOptionIndex = citiesSelectOptions.findIndex(option => option.value === searchQuery['address.city'])

  const isDistrictDisabled = !districtsArray && !searchQuery['address.city']

  return (
    <div className="offers-page__offers-filters-wrapper">
      <p>OffersFilters</p>
      <div>
        <Select
          onChange={event => setSearchQuery(prev => ({ ...prev, 'address.city': event.value }))}
          options={citiesSelectOptions}
          isClearable
          isSearchable
          defaultValue={cityParamOptionIndex === -1 ? null : citiesSelectOptions[cityParamOptionIndex]}
        />

        <Select
          isDisabled={isDistrictDisabled}
          onChange={event => setSearchQuery(prev => ({ ...prev, 'address.district': event.value }))}
          options={districtsSelectOptions}
          isClearable
          isSearchable
        />
        <input type="number" onChange={event => setSearchQuery(prev => ({ ...prev, minPrice: event.target.value }))} />
        <input type="number" onChange={event => setSearchQuery(prev => ({ ...prev, maxPrice: event.target.value }))} />
      </div>
      <button type="button" onClick={refetchOffers}>
        Refetch
      </button>
    </div>
  )
}

export default OffersFilters
