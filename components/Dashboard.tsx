import React from "react";
import useAuth from "../contents/hooks/useAuth";
import DashboardSection from "./DashboardSection";

const Dashboard: React.FC = () => {
  //const code = new URLSearchParams(window.location.search).get("code");
  //const code = localStorage.getItem("token");
  //const accessToken = useAuth(code);

  return (
    <div>
      <DashboardSection />
    </div>
  );
};

export default Dashboard;
