import { useRef } from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Select from 'react-select'
import Button from '../Button/Button'
import { useGetAvailableCites, useGetAvailableDistricts } from '../../api/offers/hooks'

const OffersFilters = ({ refetchOffers, searchQuery, setSearchQuery }) => {
  const { t } = useTranslation()
  const { data: citiesArray = [] } = useGetAvailableCites()
  const { data: districtsArray } = useGetAvailableDistricts({ searchQuery, enabled: !!searchQuery['address.city'] })
  const ref = useRef(null)

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
    <div className="offers-filters">
      <div className="offers-filters__filter-box">
        <span>{t('CITY')}</span>
        <Select
          onChange={event => {
            ref.current.setValue(null)
            event
              ? setSearchQuery(prev => ({ ...prev, 'address.city': event?.value }))
              : setSearchQuery(prev => ({ ...prev, 'address.city': null, 'address.district': null }))
          }}
          options={citiesSelectOptions}
          isClearable
          isSearchable
          aria-label="city search"
          defaultValue={cityParamOptionIndex === -1 ? null : citiesSelectOptions[cityParamOptionIndex]}
        />
      </div>

      <div className="offers-filters__filter-box">
        <span>{t('DISTRICT')}</span>
        <Select
          ref={ref}
          aria-label="district search"
          isDisabled={isDistrictDisabled}
          onChange={event => setSearchQuery(prev => ({ ...prev, 'address.district': event?.value }))}
          options={districtsSelectOptions}
          isClearable
          isSearchable
        />
      </div>

      <div className="offers-filters__filter-box">
        <span>{t('PRICE')}</span>
        <input
          aria-label="min price search"
          className="offers-filters__filter-box__input"
          type="number"
          onChange={event => setSearchQuery(prev => ({ ...prev, minPrice: event.target.value }))}
          placeholder="min"
        />
        <input
          aria-label="max price search"
          className="offers-filters__filter-box__input"
          type="number"
          onChange={event => setSearchQuery(prev => ({ ...prev, maxPrice: event.target.value }))}
          placeholder="max"
        />
      </div>
      <Button onClick={refetchOffers} customClass="offers-filters__button" label={t('SEARCH')} />
    </div>
  )
}

export default OffersFilters
