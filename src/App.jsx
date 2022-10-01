import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import HomePage from './pages/HomePage'
import OffersPage from './pages/OffersPage'

import './styles/App.scss'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/offers',
          element: <OffersPage />,
        },
      ],
    },
    // {
    //   path: '/offers',
    //   element: <OffersPage />,
    // },
  ])

  return <RouterProvider router={router} />
}

export default App
