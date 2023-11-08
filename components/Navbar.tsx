import React, { useEffect, useState } from "react";
import logo from "../contents/images/signature.png";
import Image from "next/image";
import { useRouter } from "next/router";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateActiveNav } from "../features/navbar/navbarSlice";
import SideDrawer from "./SideDrawer";
import { HiMenu } from "react-icons/hi";
import Link from "next/link";
import { FaGithub, FaMusic, FaSearch, FaSpotify, FaUser } from "react-icons/fa";
import { GiMicrophone } from "react-icons/gi";

const Navbar: React.FC = () => {
  const { asPath } = useRouter();
  const hash = asPath.split("#")[1];

  const { query } = useRouter();

  const regNav = "ml-8 cursor-pointer hover:text-themecolor pb-2 lg:pb-0";
  const activeNav =
    "ml-8 cursor-pointer hover:text-themecolor text-themecolor pb-2 lg:pb-0";

  const actvNav = useAppSelector((state) => state.navbar.activeNav);
  const dispatch = useAppDispatch();

  const handleClick = (nav: string) => {
    dispatch(updateActiveNav(nav));
    setShowMenu(!showMenu);
  };

  //const navList: string[] = ["Browse", "Top Artists", "Top Musics"];
  const navList = [
    { name: "Browse", slug: "dashboard" },
    { name: "Profile", slug: "profile" },
    { name: "Top Artists", slug: "topartist" },
    { name: "Top Songs", slug: "topmusic" },
  ];

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    dispatch(updateActiveNav(hash));
  }, [dispatch, hash]);

  return (
    <>
      <div className="flex flex-col items-center text-white">
        <div>
          <FaSpotify className="text-6xl fill-[#1BB954] m-8" />
          {navList.map((nav) => (
            <Link
              key={nav.slug}
              href={{ pathname: "/dashboard", query: { tab: nav.slug } }}
            >
              <span
                className={`w-full text-center cursor-pointer py-4 bg-[#1d1d1d] hover:bg-[#141414] flex flex-col gap-2 items-center ${
                  nav.slug === query.tab
                    ? "border-l-2 border-[#1BB954] bg-[#141414]"
                    : ""
                }`}
              >
                {nav.slug === "dashboard" && <FaSearch />}
                {nav.slug === "profile" && <FaUser />}
                {nav.slug === "topartist" && <GiMicrophone />}
                {nav.slug === "topmusic" && <FaMusic />}
                {nav.name}
              </span>
            </Link>
          ))}
        </div>
        <div className="absolute bottom-0 p-4 text-3xl flex flex-col items-center">
          <a
            href="https://github.com/alshafi834/spotifyProfile"
            target="_blank"
          >
            <FaGithub />
          </a>
          <span className="text-sm">
            Created by{" "}
            <a href="https://github.com/alshafi834" target="_blank">
              @AlSHAFI
            </a>
          </span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
