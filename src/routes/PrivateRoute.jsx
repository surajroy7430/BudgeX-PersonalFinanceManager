import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { UserInfoProvider } from "../context/UserInfoContext";
import { ThemeProvider } from "../context/ThemeContext";

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  return (
    <ThemeProvider>
      {loading ? (
        <div className="flex h-screen items-center justify-center">
          <span className="text-muted-foreground">Loading...</span>
        </div>
      ) : user ? (
        <UserInfoProvider>
          <Outlet />
        </UserInfoProvider>
      ) : (
        <Navigate to="/signin" replace />
      )}
    </ThemeProvider>
  );
};

export default PrivateRoute;
