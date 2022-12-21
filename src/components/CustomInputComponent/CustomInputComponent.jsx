import { ErrorMessage } from 'formik'

const CustomInputComponent = ({ field, form: { touched, errors }, wrapperClass = '', errorClass = '', ...props }) => (
  <div className={wrapperClass}>
    <label>{props.text}</label>
    <input {...field} {...props} />
    <div className={errorClass}>
      <ErrorMessage name={field.name} />
    </div>
  </div>
)

export default CustomInputComponent
