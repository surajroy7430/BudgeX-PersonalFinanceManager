import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../Auth/LoginPage";
import SignupPage from "../Auth/SignupPage";
import DashboardLayout from "../layouts/DashboardLayout";
import HomePage from "../pages/HomePage";
import IncomePage from "../pages/IncomePage";
import ExpensePage from "../pages/ExpensePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route element={<PublicRoute />}>
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/income" element={<IncomePage />} />
          <Route path="/expenses" element={<ExpensePage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
