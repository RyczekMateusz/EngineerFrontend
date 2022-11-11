import axios from 'axios'
import { forEach, trimEnd } from 'lodash'

export const fetchOffers = async searchQuery => {
  let requestParams = `?`
  forEach(searchQuery, function (value, key) {
    if (value) {
      return (requestParams = requestParams.concat(`${key}=${value}&`))
    }
  })
  requestParams = trimEnd(requestParams, '&')

  const response = await axios.get(`http://localhost:8000/offers${requestParams}`)

  if (!response) {
    return {}
  }
  return response
}

export const fetchOffer = async ({ queryKey }) => {
  const response = await axios.get(`http://localhost:8000/offers/${queryKey[1]}`)
  return response.data[0]
}

export const createOffer = async data => {
  await axios.post('http://localhost:8000/offers', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const fetchCities = async () => {
  const response = await axios.get(`http://localhost:8000/availableCities`)

  if (!response) {
    return {}
  }
  return response
}

export const fetchDistrictsForCity = async searchQuery => {
  const response = await axios.get(`http://localhost:8000/availableDistricts?city=${searchQuery['address.city']}`)

  if (!response) {
    return {}
  }
  return response
}
