import { useMemo } from 'react'
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

  const isDistrictDisabled = useMemo(
    () => !searchQuery['address.city'] || !districtsArray,
    [districtsArray, searchQuery],
  )

  return (
    <div className="offers-page__offers-filters-wrapper">
      <>
        <div className="offers-page__offers-filter-box">
          <span>City</span>
          <Select
            onChange={event =>
              event
                ? setSearchQuery(prev => ({ ...prev, 'address.city': event?.value }))
                : setSearchQuery(prev => ({ ...prev, 'address.city': null, 'address.district': null }))
            }
            options={citiesSelectOptions}
            isClearable
            isSearchable
            defaultValue={cityParamOptionIndex === -1 ? null : citiesSelectOptions[cityParamOptionIndex]}
          />
        </div>

        <div className="offers-page__offers-filter-box">
          <span>District</span>
          <Select
            isDisabled={isDistrictDisabled}
            onChange={event => setSearchQuery(prev => ({ ...prev, 'address.district': event?.value }))}
            options={districtsSelectOptions}
            isClearable
            isSearchable
          />
        </div>

        <div className="offers-page__offers-filter-box">
          <span>Price</span>
          <input
            className="offers-page__input"
            type="number"
            onChange={event => setSearchQuery(prev => ({ ...prev, minPrice: event.target.value }))}
            placeholder="min"
          />
          <input
            className="offers-page__input"
            type="number"
            onChange={event => setSearchQuery(prev => ({ ...prev, maxPrice: event.target.value }))}
            placeholder="max"
          />
        </div>
      </>
      <input className="offers-page__button" value="Search" type="button" onClick={refetchOffers} />
    </div>
  )
}

export default OffersFilters
