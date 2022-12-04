import { Link, NavLink } from 'react-router-dom'

const NavLinks = ({ isUserLogged }) => {
  const linksArray = [
    {
      name: 'Main Page',
      path: '/',
    },
    {
      name: 'Offers',
      path: '/offers',
    },
    isUserLogged && {
      name: 'Add Offer',
      path: '/addOffers',
    },
    isUserLogged && { name: 'My Profile', path: '/myProfile' },
    !isUserLogged && { name: 'Login', path: '/login' },
    !isUserLogged && { name: 'Register', path: '/register' },
  ]

  return (
    <nav className="navbar">
      <Link to="/">
        <img src="/images/logo.png" alt="logo" className="navbar__logo" />
      </Link>
      <ul className="navbar__links">
        {linksArray.map((link, index) => (
          <li key={index}>
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
