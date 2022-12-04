import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import NavLinks from '../components/NavLinks'

const Layout = ({ children, isUserLogged }) => {
  return (
    <div>
      <NavLinks isUserLogged={isUserLogged} />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
