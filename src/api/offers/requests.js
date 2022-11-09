import axios from 'axios'

export const fetchOffers = async searchQuery => {
  const cityParam = searchQuery ? `?address.city=${searchQuery}` : ''

  console.log(searchQuery)

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
  await axios.post('http://localhost:8000/offers', data)
}
