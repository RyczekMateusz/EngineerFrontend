import axios from 'axios'

export const fetchOffers = async () => {
  const response = await axios.get('http://localhost:8000/offers')

  if (!response) {
    return {}
  }
  return response
}

export const fetchOffer = async ({ queryKey }) => {
  const response = await axios.get(`http://localhost:8000/offers/${queryKey[1]}`)
  return response.data
}

export const createOffer = async data => {
  await axios.post('http://localhost:8000/offers', data)
}
