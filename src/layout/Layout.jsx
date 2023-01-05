import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import NavLinks from '../components/NavLinks'

const Layout = ({ children }) => {
  return (
    <>
      <NavLinks />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
