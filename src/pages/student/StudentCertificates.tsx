import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Certificates are now part of the Achievements page
const StudentCertificates = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/dashboard/achievements", { replace: true });
  }, [navigate]);
  return null;
};

export default StudentCertificates;
