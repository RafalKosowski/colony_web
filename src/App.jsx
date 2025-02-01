import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./components/Login/LoginForm";
import ParentDashboard from "./pages/Parent/Dashboard";
import AdminDashboard from "./pages/Admin/Dashboard";
import Navbar from "./components/Shared/Navbar"; 
import ColonyDetails from "./components/Parent/ChildDashboard/ColonyDetails";
import PaymentList from "./components/Parent/PaymentDashboard/PaymentList";
import PaymentDetails from "./components/Parent/PaymentDashboard/PaymentDetails";
import EditAccount from "./components/Parent/Account/EditAccount";
import ChildList from "./components/Parent/ChildDashboard/ChildList";
import AddChild from "./components/Parent/ChildDashboard/AddChild";
import EditChild from "./components/Parent/Account/ChildDetails/EditChild";
import AdminColonyList from "./components/Admin/ColonyDashboard/AdminColonyList";
import AddEditColony from "./components/Admin/ColonyDashboard/AddEditColony";
import PaymentDashboard from "./components/Admin/PaymentDashboard/PaymentList";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import KoloniaDetails from "./components/Admin/ColonyDashboard/ColonyDetails";
import Footer from "./components/Shared/Footer";


function App() {
  return (
    <AuthProvider>
        <Navbar />
      <Routes>
        {/* Public route */}
        <Route path="/" element={<LoginForm />} />

        {/* Parent routes */}
        <Route path="/parent/dashboard" element={<PrivateRoute allowedRoles={["Rodzic"]}><ParentDashboard /></PrivateRoute>} />
        <Route path="/parent/children" element={<PrivateRoute allowedRoles={["Rodzic"]}><ChildList /></PrivateRoute>} />
        {/* <Route path="/parent/children/add" element={<PrivateRoute allowedRoles={["Rodzic"]}><AddChild /></PrivateRoute>} />
        <Route path="/parent/payments" element={<PrivateRoute allowedRoles={["Rodzic"]}><PaymentList /></PrivateRoute>} />
        <Route path="/parent/payments/:id" element={<PrivateRoute allowedRoles={["Rodzic"]}><PaymentDetails /></PrivateRoute>} />
        <Route path="/parent/account" element={<PrivateRoute allowedRoles={["Rodzic"]}><EditAccount /></PrivateRoute>} />
        <Route path="/parent/children/:id/edit" element={<PrivateRoute allowedRoles={["Rodzic"]}><EditChild /></PrivateRoute>} />
        <Route path="/parent/colony/:id" element={<PrivateRoute allowedRoles={["Rodzic"]}><ColonyDetails /></PrivateRoute>} /> */}

        {/* Admin routes */}
        <Route path="/admin/dashboard" element={<PrivateRoute allowedRoles={["Administrator"]}><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/colonies" element={<PrivateRoute allowedRoles={["Administrator"]}><AdminColonyList /></PrivateRoute>} />
        <Route path="/admin/colony/:id" element={<PrivateRoute allowedRoles={["Administrator"]}><KoloniaDetails /></PrivateRoute>} /> 
        <Route path="/admin/colonies/add" element={<PrivateRoute allowedRoles={["Administrator"]}><AddEditColony /></PrivateRoute>} />
        <Route path="/admin/colonies/edit/:id" element={<PrivateRoute allowedRoles={["Administrator"]}><AddEditColony /></PrivateRoute>} />
        <Route path="/admin/payments" element={<PrivateRoute allowedRoles={["Administrator"]}><PaymentDashboard /></PrivateRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer/>
    </AuthProvider>
  );
}

function PrivateRoute({ children, allowedRoles }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(user?.nazwa)) {
    return <Navigate to="/" />;
  }

  return children;
}

export default App;
