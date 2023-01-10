import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
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
import { fetchMe } from './api/users'
import { useEffect } from 'react'
import { isEmpty } from 'lodash'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1500,
    },
  },
})

function App() {
  const { user, setUser } = useContext(UserContext)

  const fetchUserData = async () => {
    await fetchMe()
      .then(({ data }) => (isEmpty(data) ? setUser(null) : setUser(data)))
      .catch(() => null)
  }

  useEffect(() => {
    if (!user) {
      fetchUserData()
    }
  }, [])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: 'offers',
          element: <OffersPage />,
        },
        {
          path: 'offers/:offerId',
          element: <OfferDetails />,
        },
        {
          path: 'register',
          element: <RegisterUser />,
        },
        {
          path: 'login',
          element: <LoginPage />,
        },
        {
          path: 'addOffers',
          element: <AddOffer />,
        },
        { path: 'myProfile/edit', element: <EditOffer /> },
        {
          path: 'myProfile',
          element: <UserProfilePage />,
        },
        {
          path: '/',
          element: <HomePage />,
        },
        { path: '*', element: <LoginPage /> },
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
