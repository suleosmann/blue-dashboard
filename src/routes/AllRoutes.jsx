import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../modules/Authentification/Login";
import ForgotPassword from "../modules/Authentification/ForgotPassword";
import Dashboard from "../modules/dashboard/Dashboard";
import Pledges from "../modules/pledges/Pledges";
import Transactions from "../modules/transactions/Transactions";
import Donors from "../modules/donors/Donors";
import Commissions from "../modules/commissions/Commissions";
import Users from "../modules/settings/users/Users";
import Api from "../modules/settings/api/Api";
import Roles from "../modules/settings/roles/Roles";
import Logs from "../modules/settings/logs/Logs";
import DashboardPage from "../modules/dashboard/DashboardPage";
import ProtectedRoute from "../context/ProtectedRoute";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardPage />} />
          <Route path="pledges" element={<ProtectedRoute><Pledges /></ProtectedRoute>} />
          <Route path="transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
          <Route path="donors" element={<ProtectedRoute><Donors /></ProtectedRoute>} />
          <Route path="commissions" element={<ProtectedRoute><Commissions /></ProtectedRoute>} />
          <Route path="settings" element={<ProtectedRoute><Commissions /></ProtectedRoute>} />
          <Route path="settings/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
          <Route path="settings/api" element={<ProtectedRoute><Api /></ProtectedRoute>} />
          <Route path="settings/roles" element={<ProtectedRoute><Roles /></ProtectedRoute>} />
          <Route path="settings/logs" element={<ProtectedRoute><Logs /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
