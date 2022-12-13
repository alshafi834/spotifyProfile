import type { NextPage } from "next";
import { useRouter } from "next/router";
import Dashboard from "../../components/Dashboard";
import Navbar from "../../components/Navbar";
import ProfileComp from "../../components/ProfileComp";
import TopArtists from "../../components/TopArtists";
import TopMusic from "../../components/TopMusic";

const Home: NextPage = () => {
  const { query } = useRouter();

  return (
    <div className="flex">
      <div className="w-[10%] min-h-[100vh] bg-[#212222]">
        <Navbar />
      </div>
      <div className="w-[90%] min-h-[100vh] bg-[#2c2f2f]">
        {query.tab === "dashboard" && <Dashboard />}
        {query.tab === "profile" && <ProfileComp />}
        {query.tab === "topartist" && <TopArtists />}
        {query.tab === "topmusic" && <TopMusic />}
      </div>
    </div>
  );
};

export default Home;
