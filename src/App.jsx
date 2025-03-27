import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "./components/theme-provider";
import Users from "./pages/users";
// import Login from "./pages/login";
// import Logout from "./pages/logout";
// import NotFound from "./pages/not-found"; // Import 404 Page

// Mock authentication function (Replace with real auth logic)
// const isAuthenticated = () => {
//   const token = document.cookie
//     .split("; ")
//     .find((row) => row.startsWith("auth-token="));
//   return token !== undefined;
// };

const isAuthenticated = () => true;

// Layout for Private Routes (Includes Sidebar & Header)
const Layout = ({ children }) => (
  <div className="[--header-height:calc(theme(spacing.14))]">
    <SidebarProvider className="flex flex-col">
      <SiteHeader />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="p-4">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  </div>
);

// Private Route Wrapper
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? (
    <Layout>{element}</Layout>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default function Page() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="admin-key">
        <Routes>
          {/* Public Routes (Without Sidebar) */}
          <Route path="/login" element={<h1>Login</h1>} />
          <Route path="/logout" element={<h1>Logout</h1>} />

          {/* Private Routes (With Sidebar & Header) */}
          <Route path="/" element={<PrivateRoute element={<Users />} />} />
          <Route path="/users" element={<PrivateRoute element={<Users />} />} />
          <Route
            path="/models"
            element={<PrivateRoute element={<h1>Models</h1>} />}
          />

          {/* 404 Page Inside Layout */}
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
