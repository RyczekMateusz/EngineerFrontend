import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import AddOffer from './pages/AddOffer'
import Layout from './layout/Layout'
import HomePage from './pages/HomePage'
import OffersPage from './pages/OffersPage'

import './styles/App.scss'
import OfferDetails from './pages/OfferDetails'
import RegisterUser from './pages/RegisterUser'
import LoginPage from './pages/LoginPage'
import UserProfilePage from './pages/UserProfilePage'
import EditOffer from './components/EditOffer/EditOffer'
import { UserContext } from './context/UserContext'
import { useContext } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1500,
    },
  },
})

function App() {
  const { user } = useContext(UserContext)

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
        {
          path: '/offers/:offerId',
          element: <OfferDetails />,
        },

        !user && {
          path: '/register',
          element: <RegisterUser />,
        },
        !user && {
          path: '/login',
          element: <LoginPage />,
        },

        user && {
          path: '/addOffers',
          element: <AddOffer />,
        },
        user && { path: '/myProfile/edit', element: <EditOffer /> },
        user && {
          path: '/myProfile',
          element: <UserProfilePage />,
        },
      ],
    },
  ])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default App
