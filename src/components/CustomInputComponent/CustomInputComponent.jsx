import { ErrorMessage } from 'formik'

const CustomInputComponent = ({ field, form: { touched, errors }, ...props }) => (
  // console.log(field) || (
  <div className="add-offer-form__offer-input">
    <label>{props.text}</label>
    <br />
    <input {...field} {...props} />
    <br />
    <div className="add-offer-form__offer-input__error-msg">
      <ErrorMessage name={field.name} />
    </div>
  </div>
)
// )

export default CustomInputComponent
