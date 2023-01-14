import * as Yup from 'yup'

Yup.setLocale({
  mixed: {
    required: 'Pole obowiązkowe!',
  },
})

export const validationOfferSchema = Yup.object({
  offerName: Yup.string().required(),
  address: Yup.object({
    city: Yup.string().required(),
    street: Yup.string().required(),
    district: Yup.string().required(),
  }),
  price: Yup.number().moreThan(0, 'Cena nie może być mniejsza lub równa 0zł').required(),
  area: Yup.number().moreThan(0, 'Podaj powierzchnie').required(),
  roomsNumber: Yup.number().moreThan(0, 'Podaj liczbę pokoi').required(),
  details: Yup.string().required(),
  photos: Yup.array().min(1, 'Wymagane jest co najmniej jedno zdjęcie'),
})

export const validationUserSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
  rePassword: Yup.string()
    .min(8)
    .required()
    .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  phoneNumber: Yup.number().min(9).max(9).required(),
})

export const validationUserLoginSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
})
