import { Outlet } from 'react-router-dom'
import NavLinks from '../components/NavLinks'

const Layout = ({ children }) => {
  return (
    <div>
      <NavLinks />
      <Outlet />
    </div>
  )
}

export default Layout
