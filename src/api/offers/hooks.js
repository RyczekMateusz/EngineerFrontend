import { createOffer, fetchOffer, fetchOffers } from './requests'
import { getOffer, getOffers } from './selectors'

import { useMutation, useQuery } from '@tanstack/react-query'

export const useGetOffers = ({ searchQuery }) =>
  useQuery(['offers'], () => fetchOffers(searchQuery), { select: getOffers })

export const useGetOfferById = ({ offerId }) => useQuery(['offer', offerId], fetchOffer, { select: getOffer })

export const useCreateOffer = ({ options } = {}) => {
  return useMutation(createOffer, { ...options })
}
