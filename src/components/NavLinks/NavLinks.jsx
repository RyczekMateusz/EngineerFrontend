import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { useMedia } from 'react-use'
import Hamburger from 'hamburger-react'
import { clsx } from 'clsx'

const NavLinks = () => {
  const isMobile = useMedia('(max-width: 599px)')
  const [isOpen, setOpen] = useState(false)
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
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

  const handleLogout = () => {
    localStorage.removeItem('loggedUser')
    setUser(null)
    navigate('/')
    setOpen(false)
  }

  if (isMobile) {
    return (
      <>
        <nav className="navbarMobile">
          <Link to="/">
            <img src="/images/logo.png" alt="logo" className="navbar__logo" />
          </Link>
          <Hamburger size={48} rounded distance="sm" className="navbar__icon" toggled={isOpen} toggle={setOpen} />
        </nav>

        <div className={clsx('navbarMobile__links', isOpen && 'navbarMobile__links--open')}>
          {linksArray.map((link, index) => (
            <NavLink onClick={() => setOpen(false)} key={index} className="single-link" to={link.path}>
              {t(link.name)}
            </NavLink>
          ))}
          {!!user && (
            <a className="single-link" onClick={handleLogout}>
              {t('LOG_OUT')}
            </a>
          )}
        </div>
      </>
    )
  }

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
        {!!user && (
          <button className="single-link" aria-label="Log out button" onClick={handleLogout}>
            {t('LOG_OUT')}
          </button>
        )}
      </div>
    </nav>
  )
}

export default NavLinks
