import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import NavLinks from '../components/NavLinks'

const Layout = ({ children }) => {
  return (
    <>
      <NavLinks />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
