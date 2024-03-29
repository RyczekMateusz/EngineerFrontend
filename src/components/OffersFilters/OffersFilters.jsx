import { useEffect, useRef } from 'react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Select from 'react-select'
import { useGetAvailableCites, useGetAvailableDistricts } from '../../api/offers/hooks'

import React from 'react'

const OffersFilters = ({ refetchOffers, searchQuery, setSearchQuery }) => {
  const { t } = useTranslation()
  const { data: citiesArray = [] } = useGetAvailableCites()
  const { data: districtsArray, refetch } = useGetAvailableDistricts({
    searchQuery,
    enabled: !!searchQuery['address.city'],
  })
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

  useEffect(() => {
    refetch()
  }, [searchQuery])

  return (
    <div className="offers-page__offers-filters-wrapper">
      <>
        <div className="offers-page__offers-filter-box">
          <span>{t('CITY')}</span>
          <Select
            onChange={event => {
              ref.current.setValue(event.value)
              event
                ? setSearchQuery(prev => ({ ...prev, 'address.city': event.value }))
                : setSearchQuery(prev => ({ ...prev, 'address.city': null, 'address.district': null }))
            }}
            options={citiesSelectOptions}
            isClearable
            isSearchable
            aria-label="city search"
            defaultValue={cityParamOptionIndex === -1 ? null : citiesSelectOptions[cityParamOptionIndex]}
          />
        </div>

        <div className="offers-page__offers-filter-box">
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

        <div className="offers-page__offers-filter-box">
          <span>{t('PRICE')}</span>
          <input
            aria-label="min price search"
            className="offers-page__input"
            type="number"
            onChange={event => setSearchQuery(prev => ({ ...prev, minPrice: event.target.value }))}
            placeholder="min"
          />
          <input
            aria-label="max price search"
            className="offers-page__input"
            type="number"
            onChange={event => setSearchQuery(prev => ({ ...prev, maxPrice: event.target.value }))}
            placeholder="max"
          />
        </div>
      </>
      <input
        aria-label="Search offer button"
        className="offers-page__button"
        value="Search"
        type="button"
        onClick={refetchOffers}
      />
    </div>
  )
}

export default OffersFilters
