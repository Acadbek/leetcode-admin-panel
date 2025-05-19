import React, { Suspense, useEffect } from 'react';
import { ThemeProvider } from './components/theme-provider';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
import { UserProvider, useUser } from './context/UserContext';
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
import ProtectedRoute from './_root/protected-routes';
// import { useUser } from './context/UserContext';

const AppContent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      console.log('Global logout event caught, navigating to login.');
      navigate('/login');
    };
    window.addEventListener('auth-logout', handleLogout);

    const handleLogin = (event) => {
      const user = event.detail;
      console.log('Global login event caught.', user);
    };
    window.addEventListener('auth-login', handleLogin);

    return () => {
      window.removeEventListener('auth-logout', handleLogout);
      window.removeEventListener('auth-login', handleLogin);
    };
  }, [navigate]);

  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<RootLayout />}>
          <Route
            index  // Agar `/` asosiy himoyalangan sahifa bo'lsa
            // path="/" // Yoki path="/dashboard" kabi aniq yo'l
            element={
              <Suspense fallback={<h1>Loading Dashboard...</h1>}>
                <DashboardPage />
              </Suspense>
            }
          />
          <Route
            path='/company'
            element={
              <Suspense fallback={<h1>Loading Company...</h1>}>
                <CompanyPage />
              </Suspense>
            }
          />
          {/* ... qolgan himoyalangan marshrutlaringiz ... */}
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
              <Suspense fallback={<h1>Loading Create User...</h1>}>
                <CreateUserPage />
              </Suspense>
            }
          />
        </Route>
      </Route>

      {/* (Public) */}
      <Route element={<AuthLayout />}>
        <Route path='/login' element={<Login />} />
        {/* Agar ro'yxatdan o'tish kabi boshqa ochiq sahifalar bo'lsa */}
        {/* <Route path="/register" element={<Register />} /> */}
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
      <DialogProvider>
        <LoadingBarContainer>
          <QueryClientProvider client={queryClient}>
            <UserProvider>
              <LoadingProvider>
                <Toaster />
                <NetworkStatusAlert />
                <AppContent />
              </LoadingProvider>
            </UserProvider>
          </QueryClientProvider>
        </LoadingBarContainer>
      </DialogProvider>
    </ThemeProvider>
  );
};


export default App;
