import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

const NavLinks = () => {
  const { user } = useContext(UserContext)
  const { t } = useTranslation()
  const linksArray = [
    {
      name: 'MAIN_PAGE',
      path: '/',
    },
    {
      name: 'OFFERS',
      path: '/offers',
    },
    !!user && {
      name: 'ADD_OFFER',
      path: '/addOffers',
    },
    !!user && { name: 'MY_PROFILE', path: '/myProfile' },
    !user && { name: 'LOGIN', path: '/login' },
    !user && { name: 'REGISTER', path: '/register' },
  ].filter(Boolean)

  return (
    <nav className="navbar">
      <Link to="/">
        <img src="/images/logo.png" alt="logo" className="navbar__logo" />
      </Link>
      <div className="navbar__links">
        {linksArray.map((link, index) => (
          <NavLink key={index} className="single-link" to={link.path}>
            {t(link.name)}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default NavLinks
