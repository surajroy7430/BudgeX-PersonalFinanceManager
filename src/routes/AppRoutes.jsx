import { Route, Routes } from "react-router-dom";
import PublicRoute from "@/routes/PublicRoute";
import PrivateRoute from "@/routes/PrivateRoute";
import DashboardLayout from "@/layouts/DashboardLayout";

import LandingPage from "../pages/extras/LandingPage";
import ErrorPage from "../pages/extras/ErrorPage";
import SignupPage from "../Auth/SignupPage";
import LoginPage from "../Auth/LoginPage";

import HomePage from "../pages/HomePage";
import IncomePage from "../pages/IncomePage";
import ExpensePage from "../pages/ExpensePage";
import Appearance from "../pages/extras/Appearance";
import SettingsPage from "../pages/extras/SettingsPage";

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
