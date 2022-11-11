import Select from 'react-select'
import { useGetAvailableCites, useGetAvailableDistricts } from '../../api/offers/hooks'

const OffersFilters = ({ cityParam }) => {
  const { data: citiesArray = [] } = useGetAvailableCites()
  const { data: districtsArray } = useGetAvailableDistricts({ cityParam, enabled: !!cityParam })

  const citiesSelectOptions = citiesArray.map(city => {
    return { value: city, label: city }
  })

  const districtsSelectOptions =
    districtsArray &&
    districtsArray.map(district => {
      return { value: district, label: district }
    })

  const cityParamOptionIndex = citiesSelectOptions.findIndex(option => option.value === cityParam)

  return (
    <div className="offers-page__offers-filters-wrapper">
      <p>OffersFilters</p>
      <div>
        <Select
          options={citiesSelectOptions}
          isClearable
          isSearchable
          defaultValue={cityParamOptionIndex === -1 ? null : citiesSelectOptions[cityParamOptionIndex]}
        />

        {!!districtsArray && <Select options={districtsSelectOptions} isClearable isSearchable />}
      </div>
    </div>
  )
}

export default OffersFilters
