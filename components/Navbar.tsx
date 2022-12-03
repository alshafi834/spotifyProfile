import React, { useEffect, useState } from "react";
import logo from "../contents/images/signature.png";
import Image from "next/image";
import { useRouter } from "next/router";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateActiveNav } from "../features/navbar/navbarSlice";
import SideDrawer from "./SideDrawer";
import { HiMenu } from "react-icons/hi";

const Navbar: React.FC = () => {
  const { asPath } = useRouter();
  const hash = asPath.split("#")[1];

  const regNav = "ml-8 cursor-pointer hover:text-themecolor pb-2 lg:pb-0";
  const activeNav =
    "ml-8 cursor-pointer hover:text-themecolor text-themecolor pb-2 lg:pb-0";

  const actvNav = useAppSelector((state) => state.navbar.activeNav);
  const dispatch = useAppDispatch();

  const handleClick = (nav: string) => {
    dispatch(updateActiveNav(nav));
    setShowMenu(!showMenu);
  };

  const navList: string[] = [
    "About",
    "Skills",
    "Experience",
    "Projects",
    "Contact",
  ];

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    dispatch(updateActiveNav(hash));
  }, [dispatch, hash]);

  return (
    <>

      <div className="w-[20%] h-[100vh] bg-[#636e72]">
        <p>This is navbar</p>
      </div>
    </>
  );
};

export default Navbar;
