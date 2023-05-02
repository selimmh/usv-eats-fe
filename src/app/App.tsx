import { Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "@/app/utils/ProtectedRoute";
import { Home } from "@/pages/Home";
import { Auth } from "@/pages/Auth";
import { Admin } from "@/pages/Admin";
import { Staff } from "@/pages/Staff";
import { User } from "@/pages/User";

export const App = () => {
  return (
    <Routes>
      <Route path="auth" element={<Auth />} />

      <Route element={<ProtectedRoute  allowedRoles={['user', 'admin', 'staff']} />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route element={<ProtectedRoute  allowedRoles={['admin']} />}>
        <Route path="/admin" element={<Admin />} />
      </Route>

      <Route element={<ProtectedRoute  allowedRoles={['staff']} />}>
        <Route path="/staff" element={<Staff />} />
      </Route>

      <Route element={<ProtectedRoute  allowedRoles={['user']} />}>
        <Route path="/user" element={<User />} />
      </Route>
      
    </Routes>
  );
};
