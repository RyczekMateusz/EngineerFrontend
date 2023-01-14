import { startCase, trim } from 'lodash'

export const normaliseAddress = addressObj => {
  const city = startCase(trim(addressObj.city))
  const district = startCase(trim(addressObj.district))
  const street = startCase(trim(addressObj.street))
  return { city, district, street }
}
