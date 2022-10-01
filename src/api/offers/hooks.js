import { createOffer, fetchOffers } from './requests'
import { getOffers } from './selectors'

import { useMutation, useQuery } from '@tanstack/react-query'
import { entries } from 'lodash'

export const handleSelectors =
  (selectors, ...additionalParams) =>
  rawData => {
    return entries(selectors).reduce((acc, [selectorName, selector]) => {
      acc[selectorName] = selector(rawData, additionalParams)
      return acc
    }, {})
  }

export const useGetOffers = ({ selectors = { offers: getOffers }, ...options } = {}) =>
  useQuery(['offers'], fetchOffers, {
    select: handleSelectors(selectors),
    ...options,
  })

export const useCreateOffer = ({ options } = {}) => {
  return useMutation(createOffer, { ...options })
}
