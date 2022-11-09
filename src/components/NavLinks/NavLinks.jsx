import { max } from 'lodash'
import { Link, NavLink } from 'react-router-dom'

const NavLinks = () => {
  const linksArray = [
    {
      name: 'Main Page',
      path: '/',
    },
    {
      name: 'Offers',
      path: '/offers',
    },
    {
      name: 'Add Offer',
      path: '/addOffers',
    },
  ]

  return (
    <nav className="navbar">
      <Link to="/">
        <img src="/images/logo.png" alt="logo" className="navbar__logo" />
      </Link>
      <ul className="navbar__links">
        {linksArray.map(link => (
          <li key={link.name}>
            <NavLink className={({ isActive }) => (isActive ? 'single-link-active' : 'single-link')} to={link.path}>
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavLinks
