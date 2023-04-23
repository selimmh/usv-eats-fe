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

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/user" element={<User />} />
      </Route>
    </Routes>
  );
};
