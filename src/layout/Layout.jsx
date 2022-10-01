import { Link, Outlet } from 'react-router-dom'

//TODO: nav do osobnego komponentu
//TODO: linki jako array. Generwoać w mapie.

const Layout = ({ children }) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Strona główna</Link>
          </li>
          <li>
            <Link to="/offers">Oferty</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}

export default Layout
