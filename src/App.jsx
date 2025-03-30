import React from 'react'
import { ThemeProvider } from './components/theme-provider'
import { Route, Routes } from 'react-router-dom'
import RootLayout from './_root/RootLayout'
import AuthLayout from './_auth/AuthLayout'
import Login from './_auth/forms/Login'
import AboutPage from './_root/pages/about'
import HomePage from './_root/pages/home'
import NotFound from './_root/pages/not-found'

const App = () => {
  return (
    <ThemeProvider>
      <Routes>

        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App