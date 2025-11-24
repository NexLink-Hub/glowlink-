import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminDashboard } from "@/components/AdminDashboard";
import { getAuthToken } from "@/lib/auth";

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated and is admin
    const token = getAuthToken();
    if (!token) {
      navigate("/login");
      return;
    }

    // TODO: Verify admin role from JWT token
    // For now, allow anyone with a token
  }, [navigate]);

  return <AdminDashboard />;
};

export default Admin;
