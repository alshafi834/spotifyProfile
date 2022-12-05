import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FaSpotify } from "react-icons/fa";
import useAuth from "../contents/hooks/useAuth";

const Login: React.FC = () => {
  const router = useRouter();
  const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=a31a94629e394d4282216937dfe09c84&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-top-read%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

  const code = new URLSearchParams(window.location.search).get("code");

  const accessToken = useAuth(code);
  localStorage.setItem("token", accessToken);
  //console.log("token", accessToken);
  //console.log("localtoken", typeof hudai);
  if (accessToken)
    router.push({
      pathname: "/dashboard",
      query: { tab: "dashboard" },
    });

  return (
    <div className="bg-[#2d3436] w-[100vw] h-[100vh] flex justify-center items-center">
      <a href={AUTH_URL}>
        <button className="bg-[#1BB954] p-6 text-white rounded flex items-center gap-2 cursor-pointer">
          {" "}
          <FaSpotify className="text-3xl" /> LOGIN WITH SPOTIFY
        </button>
      </a>
    </div>
  );
};

export default Login;
