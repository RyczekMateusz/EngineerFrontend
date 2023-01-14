import { forEach, trimEnd } from 'lodash'
import { client } from '../client'

export const fetchOffers = async searchQuery => {
  let requestParams = `?`
  forEach(searchQuery, function (value, key) {
    if (value) {
      return (requestParams = requestParams.concat(`${key}=${value}&`))
    }
  })
  requestParams = trimEnd(requestParams, '&')

  const response = await client.get(`/offers${requestParams}`)

  if (!response) {
    return {}
  }
  return response
}

export const fetchOffersByOwner = async ({ queryKey }) => {
  const response = await client.get(`/offers/myOffers/${queryKey[1]}`)
  return response.data
}

export const fetchOffer = async ({ queryKey }) => {
  const response = await client.get(`/offers/${queryKey[1]}`)
  return response.data
}

export const createOffer = async data => {
  await client.post('/offers', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const updateOffer = async data => await client.patch(`/offers`, data)

export const archiveOffer = async offerId => await client.patch(`/offers/archiveOffer/${offerId}`)

export const deleteOffer = async offerId => {
  await client.delete(`/offers/${offerId}`)
}

export const fetchCities = async () => {
  const response = await client.get(`/availableCities`)

  if (!response) {
    return {}
  }
  return response
}

export const fetchDistrictsForCity = async searchQuery => {
  const response = await client.get(`/availableDistricts?city=${searchQuery['address.city']}`)

  if (!response) {
    return {}
  }
  return response
}
