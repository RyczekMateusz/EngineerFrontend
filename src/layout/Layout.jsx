import { max } from 'lodash'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import NavLinks from '../components/NavLinks'

const Layout = ({ children }) => {
  return (
    <div>
      <NavLinks />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
