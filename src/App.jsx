import React, { Suspense } from 'react';
import { ThemeProvider } from './components/theme-provider';
import { Route, Routes } from 'react-router-dom';
import RootLayout from './_root/RootLayout';
import AuthLayout from './_auth/AuthLayout';
import Login from './_auth/forms/Login';
import NotFound from './_root/pages/not-found';
import Problems from './_root/pages/problems';
import UsersPage from './_root/pages/users';
import { LoadingProvider } from './context/loading-state';
import { LoadingBarContainer } from 'react-top-loading-bar';
import ContestsPage from './_root/pages/contest';
import HelpPage from './_root/pages/help';
import BlogPage from './_root/pages/blog';
import AnalyticsPage from './_root/pages/analytics';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './context/UserContext';
const DashboardPage = React.lazy(() => import('./_root/pages/dashboard'));
const AboutPage = React.lazy(() => import('./_root/pages/about'));
const UserProfilePage = React.lazy(() => import('./_root/pages/user/profile'));
import { Toaster } from '@/components/ui/sonner';
import CompanyPage from './_root/pages/company';
import { DialogProvider } from './context/dialog-context';
import CreateCompanyPage from './_root/pages/company/create-company';
import GroupsPage from './_root/pages/groups';
import CompanySlugPage from './_root/pages/company/company-profile';
import CompanyProfilePage from './_root/pages/company/company-profile';
import CreateGroupPage from './_root/pages/groups/create-group';
import NetworkStatusAlert from './components/NetworkStatusAlert';
import CreateUserPage from './_root/pages/users/create-user';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
      <DialogProvider>
        <LoadingBarContainer>
          <QueryClientProvider client={queryClient}>
            <LoadingProvider>
              <Toaster />
              <NetworkStatusAlert />
              {/* Private Routes */}
              <Routes>
                <Route element={<RootLayout />}>
                  <Route
                    index
                    path='/'
                    element={
                      <Suspense fallback={<h1>Loading...</h1>}>
                        <DashboardPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path='/company'
                    element={
                      <Suspense fallback={<h1>Loading...</h1>}>
                        <CompanyPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path='/company/create'
                    element={
                      <Suspense fallback={<h1>Loading...</h1>}>
                        <CreateCompanyPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path='/company/:id'
                    element={
                      <Suspense fallback={<h1>Loading...</h1>}>
                        <CompanyProfilePage />
                      </Suspense>
                    }
                  />
                  <Route
                    path='/groups'
                    element={
                      <Suspense fallback={<h1>Loading...</h1>}>
                        <GroupsPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path='/groups/create'
                    element={
                      <Suspense fallback={<h1>Loading...</h1>}>
                        <CreateGroupPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path='/about'
                    element={
                      <Suspense fallback={<h1>Loading...</h1>}>
                        <AboutPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path='/user/:id'
                    element={
                      <Suspense fallback={<h1>Loading...</h1>}>
                        <UserProfilePage />
                      </Suspense>
                    }
                  />
                  <Route
                    path='/contests'
                    element={
                      <Suspense fallback={<h1>Loading...</h1>}>
                        <ContestsPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path='/help'
                    element={
                      <Suspense fallback={<h1>Loading...</h1>}>
                        <HelpPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path='/blog'
                    element={
                      <Suspense fallback={<h1>Loading...</h1>}>
                        <BlogPage />
                      </Suspense>
                    }
                  />
                  <Route
                    path='/analytics'
                    element={
                      <Suspense fallback={<h1>Loading...</h1>}>
                        <AnalyticsPage />
                      </Suspense>
                    }
                  />
                  <Route path='/problems' element={<Problems />} />
                  <Route path='/users' element={<UsersPage />} />
                  <Route
                    path='/users/create'
                    element={
                      <Suspense>
                        <CreateUserPage />
                      </Suspense>
                    }
                  />
                </Route>

                {/* Public Routes */}
                <Route element={<AuthLayout />}>
                  <Route path='/login' element={<Login />} />
                </Route>

                <Route path='*' element={<NotFound />} />
              </Routes>
            </LoadingProvider>
          </QueryClientProvider>
        </LoadingBarContainer>
      </DialogProvider>
    </ThemeProvider>
  );
};

export default App;
