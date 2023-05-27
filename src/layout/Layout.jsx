import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import NavLinks from '../components/NavLinks'
import { ErrorBoundary } from 'react-error-boundary'

const Layout = ({ children }) => {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>} onError={() => console.log('error')}>
      <NavLinks />
      <main>
        <Outlet />
      </main>
      <Footer />
    </ErrorBoundary>
  )
}

export default Layout
