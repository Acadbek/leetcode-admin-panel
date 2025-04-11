import React, { Suspense } from 'react'
import { ThemeProvider } from './components/theme-provider'
import { Route, Routes } from 'react-router-dom'
import RootLayout from './_root/RootLayout'
import AuthLayout from './_auth/AuthLayout'
import Login from './_auth/forms/Login'
import NotFound from './_root/pages/not-found'
import Problems from './_root/pages/problems'
import UsersPage from './_root/pages/users'
import { LoadingProvider } from './context/loading-state'
import { LoadingBarContainer } from 'react-top-loading-bar'
import ContestsPage from './_root/pages/contest'

// import with lazy loading
const DashboardPage = React.lazy(() => import('./_root/pages/dashboard'))
const AboutPage = React.lazy(() => import('./_root/pages/about'))
const UserProfilePage = React.lazy(() => import('./_root/pages/user/profile'))


const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <LoadingBarContainer>

        <LoadingProvider>
          {/* Private Routes */}
          <Routes>
            <Route element={<RootLayout />}>
              <Route index path="/" element={
                <Suspense fallback={<h1>Loading...</h1>}>
                  <DashboardPage />
                </Suspense>
              } />
              <Route path="/about" element={
                <Suspense fallback={<h1>Loading...</h1>}>
                  <AboutPage />
                </Suspense>
              } />
              <Route path="/user/:id" element={
                <Suspense fallback={<h1>Loading...</h1>}>
                  <UserProfilePage />
                </Suspense>
              } />
              <Route path="/contests" element={
                <Suspense fallback={<h1>Loading...</h1>}>
                  <ContestsPage />
                </Suspense>
              } />
              <Route path='/problems' element={<Problems />} />
              <Route path="/users" element={<UsersPage />} />
            </Route>

            {/* Public Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </LoadingProvider>
      </LoadingBarContainer>
    </ThemeProvider>
  )
}

export default App