import type { NextPage } from "next";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";

const Home: NextPage = () => {
  const code = new URLSearchParams(window.location.search).get('code');
  return (
    code ? 
      <Dashboard code={code} /> : <Login />
   
  );
};

export default Home;
