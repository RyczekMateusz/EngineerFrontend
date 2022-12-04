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
import { useEffect } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1500,
    },
  },
})

function App() {
  let isUserLogged = !!localStorage.getItem('loggedUser')

  useEffect(() => {
    isUserLogged = !!localStorage.getItem('loggedUser')
  }, [])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout isUserLogged={isUserLogged} />,
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

        !isUserLogged && {
          path: '/register',
          element: <RegisterUser />,
        },
        !isUserLogged && {
          path: '/login',
          element: <LoginPage />,
        },

        isUserLogged && {
          path: '/addOffers',
          element: <AddOffer />,
        },
        isUserLogged && { path: '/myProfile/edit', element: <EditOffer /> },
        isUserLogged && {
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
