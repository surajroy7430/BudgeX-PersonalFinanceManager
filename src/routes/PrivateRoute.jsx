import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { UserInfoProvider } from "@/context/UserInfoContext";
import { PageLoader } from "@/components/page-loader";

const PrivateRoute = () => {
  const { user, loading, signupInProgress } = useAuth();

  if (loading || signupInProgress) {
    return <PageLoader />;
  }

  if (user) {
    return (
      <UserInfoProvider>
        <Outlet />
      </UserInfoProvider>
    );
  }

  return <Navigate to="/signin" replace />;
};

export default PrivateRoute;
