import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login/Login.js";
import Signup from "./pages/signup/Signup.js";
import UserDashboard from "./pages/user/UserDashboard";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Normal User Dashboard */}
          <Route
            path="/user"
            element={
              <RoleProtectedRoute role="user">
                <UserDashboard />
              </RoleProtectedRoute>
            }
          />

          {/* Owner Dashboard */}
          <Route
            path="/owner"
            element={
              <RoleProtectedRoute role="owner">
                <OwnerDashboard />
              </RoleProtectedRoute>
            }
          />

          {/* Admin Dashboard */}
          <Route
            path="/admin"
            element={
              <RoleProtectedRoute role="admin">
                <AdminDashboard />
              </RoleProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
