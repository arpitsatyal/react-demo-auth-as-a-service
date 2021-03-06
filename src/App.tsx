import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";
import PolicyForm from "./pages/PolicyForm";
import PermissionForm from "./pages/PermissionForm";
import RoleForm from "./pages/RoleForm";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Dashboard />} />
          <Route path="/create-policy" element={<PolicyForm type="create" />} />
          <Route path="/edit-policy/:id" element={<PolicyForm type="edit" />} />
          <Route
            path="/create-permission"
            element={<PermissionForm type="create" />}
          />
          <Route
            path="/edit-permission/:id"
            element={<PermissionForm type="edit" />}
          />
          <Route path="/create-role" element={<RoleForm type="create" />} />
          <Route path="/edit-role/:id" element={<RoleForm type="edit" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
