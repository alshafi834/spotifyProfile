import React, { PropsWithChildren } from "react";

interface HeaderProps {
  children: any;
}

const SideDrawer: React.FC<PropsWithChildren<HeaderProps>> = ({ children }) => {
  return <aside>{children}</aside>;
};

export default SideDrawer;
