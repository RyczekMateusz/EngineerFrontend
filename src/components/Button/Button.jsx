import clsx from 'clsx'
import { NavLink } from 'react-router-dom'

const Button = ({ linkTo = null, label, onClick = () => {}, customClass, state = {} }) => {
  if (!linkTo) {
    return (
      <button className={clsx('btn', customClass)} onClick={onClick}>
        {label}
      </button>
    )
  }
  return (
    <NavLink state={state} className={clsx('btn', customClass)} onClick={onClick} to={linkTo}>
      {label}
    </NavLink>
  )
}

export default Button
