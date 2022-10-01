import { createOffer, fetchOffer, fetchOffers } from './requests'
import { getOffer, getOffers } from './selectors'

import { useMutation, useQuery } from '@tanstack/react-query'

export const useGetOffers = () => useQuery(['offers'], fetchOffers, { select: getOffers })

export const useGetOfferById = ({ offerId }) => useQuery(['offer', offerId], fetchOffer, { select: getOffer })

export const useCreateOffer = ({ options } = {}) => {
  return useMutation(createOffer, { ...options })
}
