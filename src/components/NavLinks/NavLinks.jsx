import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

const NavLinks = () => {
  const { user } = useContext(UserContext)
  const linksArray = [
    {
      name: 'Main Page',
      path: '/',
    },
    {
      name: 'Offers',
      path: '/offers',
    },
    !!user && {
      name: 'Add Offer',
      path: '/addOffers',
    },
    !!user && { name: 'My Profile', path: '/myProfile' },
    !user && { name: 'Login', path: '/login' },
    !user && { name: 'Register', path: '/register' },
  ].filter(Boolean)

  return (
    <nav className="navbar">
      <Link to="/">
        <img src="/images/logo.png" alt="logo" className="navbar__logo" />
      </Link>
      <div className="navbar__links">
        {linksArray.map((link, index) => (
          <NavLink key={index} className="single-link" to={link.path}>
            {link.name}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default NavLinks
