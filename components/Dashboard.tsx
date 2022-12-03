import React from "react";
import useAuth from "../contents/hooks/useAuth";
import DashboardSection from "./DashboardSection";
import Navbar from "./Navbar";

interface ICode  {
 code: string
}

const Dashboard: React.FC<ICode> = ({code}) => {
  const accessToken = useAuth(code);
  
  return (
    <div className="flex"
    >
      <Navbar />
      <DashboardSection code={code} />
    </div>
  );
};

export default Dashboard;
