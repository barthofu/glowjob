import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { StrictMode, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { theme } from '../core/theme'

import '@fontsource-variable/montserrat'
import '@fontsource/poppins'
import 'react-toastify/dist/ReactToastify.css'
import { AuthService } from '@cinestia/web/auth'

const client = new QueryClient()

const App: React.FC = () => {

  useEffect(() => {

    if (AuthService.isLogged() && !AuthService.isTokenValid()) AuthService.logout(true, false)

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  return (
    <StrictMode>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={client}>
          {/* <DefaultLayout> */}
          <Outlet />
          {/* </DefaultLayout> */}
        </QueryClientProvider>
      </ChakraProvider>
      <ToastContainer position='bottom-center' />
    </StrictMode>
  )
}

export default App
