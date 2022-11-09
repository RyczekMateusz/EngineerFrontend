import * as Yup from 'yup'

Yup.setLocale({
  mixed: {
    required: 'Pole obowiązkowe!',
  },
})

export const validationSchema = Yup.object({
  offerName: Yup.string().required(),
  address: Yup.object({
    city: Yup.string().required(),
    street: Yup.string().required(),
    district: Yup.string().required(),
  }),
  price: Yup.number().moreThan(0, 'Cena nie może być <=0').required(),
  area: Yup.number().moreThan(0, 'Podaj powierzchnie').required(),
  roomsNumber: Yup.number().moreThan(0, 'Podaj liczbę pokoi').required(),
  // details: Yup.string().required(),
})

export default validationSchema
