import type { NextPage } from "next";
import { useRouter } from "next/router";
import Dashboard from "../../components/Dashboard";
import Navbar from "../../components/Navbar";
import ProfileComp from "../../components/ProfileComp";
import TopArtists from "../../components/TopArtists";

const Home: NextPage = () => {
  const { query } = useRouter();

  return (
    <div className="flex">
      <div className="w-[15%] min-h-[100vh] bg-[#212222]">
        <Navbar />
      </div>
      <div className="w-[85%] min-h-[100vh] bg-[#2c2f2f]">
        {query.tab === "dashboard" && <Dashboard />}
        {query.tab === "profile" && <ProfileComp />}
        {query.tab === "topartist" && <TopArtists />}
      </div>
    </div>
  );
};

export default Home;
