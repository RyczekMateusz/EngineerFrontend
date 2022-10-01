import { Link } from 'react-router-dom'

const NavLinks = () => {
  const linksArray = [
    {
      name: 'Main Page',
      path: '/',
    },
    {
      name: 'Offers',
      path: '/offers',
    },
    {
      name: 'Add Offer',
      path: '/addOffers',
    },
  ]
  return (
    <nav>
      <ul>
        {linksArray.map(link => (
          <li key={link.name}>
            <Link to={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavLinks
