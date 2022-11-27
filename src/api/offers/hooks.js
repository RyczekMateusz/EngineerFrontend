import {
  createOffer,
  fetchCities,
  fetchDistrictsForCity,
  fetchOffer,
  fetchOffers,
  fetchOffersByOwner,
} from './requests'
import { getNestedData, getSimpleData } from './selectors'

import { useMutation, useQuery } from '@tanstack/react-query'

export const useGetOffers = ({ searchQuery }) =>
  useQuery(['offers'], () => fetchOffers(searchQuery), { select: getNestedData })

export const useGetOffersByOwnerId = ({ ownerId }) => useQuery(['userOffers', ownerId], fetchOffersByOwner)

export const useGetOfferById = ({ offerId }) => useQuery(['offer', offerId], fetchOffer, { select: getSimpleData })

export const useCreateOffer = ({ options } = {}) => {
  return useMutation(createOffer, { ...options })
}

export const useGetAvailableCites = () => useQuery(['availableCities'], () => fetchCities(), { select: getNestedData })

export const useGetAvailableDistricts = ({ searchQuery, enabled = false }) =>
  useQuery(['availableDistricts'], () => fetchDistrictsForCity(searchQuery), { select: getNestedData, enabled })
