import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import AddOffer from './components/AddOffer'
import Layout from './layout/Layout'
import HomePage from './pages/HomePage'
import OffersPage from './pages/OffersPage'

import './styles/App.scss'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1500,
    },
  },
})

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
        {
          path: '/addOffers',
          element: <AddOffer />,
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
