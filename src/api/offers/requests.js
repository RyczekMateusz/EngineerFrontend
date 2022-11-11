import axios from 'axios'

export const fetchOffers = async searchQuery => {
  const cityParam = searchQuery ? `?address.city=${searchQuery}` : ''

  const response = await axios.get(`http://localhost:8000/offers${cityParam}`)

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

export const fetchDistrictsForCity = async cityParam => {
  const response = await axios.get(`http://localhost:8000/availableDistricts?city=${cityParam}`)

  if (!response) {
    return {}
  }
  return response
}
