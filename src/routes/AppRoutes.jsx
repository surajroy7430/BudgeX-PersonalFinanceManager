import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/extras/LandingPage";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../Auth/LoginPage";
import SignupPage from "../Auth/SignupPage";
import DashboardLayout from "../layouts/DashboardLayout";
import HomePage from "../pages/HomePage";
import IncomePage from "../pages/IncomePage";
import ExpensePage from "../pages/ExpensePage";
import ErrorPage from "../pages/extras/ErrorPage";
import SettingsPage from "../pages/extras/SettingsPage";
import Appearance from "../pages/extras/Appearance";

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
          <Route path="/appearance" element={<Appearance />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
