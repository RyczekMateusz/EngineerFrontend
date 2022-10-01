import axios from 'axios'

export const fetchOffers = async () => {
  const response = await axios.get('http://localhost:8000/offers')

  if (!response) {
    return {}
  }
  return response
}

export const createOffer = async data => {
  await axios.post('http://localhost:8000/offers', data)
}
