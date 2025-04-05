import React from 'react'
import { ThemeProvider } from './components/theme-provider'
import { Route, Routes } from 'react-router-dom'
import RootLayout from './_root/RootLayout'
import AuthLayout from './_auth/AuthLayout'
import Login from './_auth/forms/Login'
import NotFound from './_root/pages/not-found'
import Problems from './_root/pages/problems'

// import with lazy loading
const DashboardPage = React.lazy(() => import('./_root/pages/dashboard'))
const AboutPage = React.lazy(() => import('./_root/pages/about'))


const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      {/* Private Routes */}
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path='/problems' element={<Problems />} />
        </Route>

        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App