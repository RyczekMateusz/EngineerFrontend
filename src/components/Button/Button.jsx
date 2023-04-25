import clsx from 'clsx'
import { NavLink } from 'react-router-dom'

const Button = ({ linkTo = null, label, onClick = () => {}, customClass, state = {}, key = 1 }) => {
  if (!linkTo) {
    return (
      <button key={key} className={clsx('defaultButton', customClass)} onClick={onClick}>
        {label}
      </button>
    )
  }
  return (
    <NavLink key={key} state={state} className={clsx('defaultButton', customClass)} onClick={onClick} to={linkTo}>
      {label}
    </NavLink>
  )
}

export default Button
