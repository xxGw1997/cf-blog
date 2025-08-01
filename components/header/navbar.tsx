import React from "react";

import { links } from "@/lib/links";

import { HamburgerMenu } from "./hamburger-menu";
import Navs from "./navs";

const NavBar = () => {
  return (
    <nav className="w-full flex justify-center">
      <HamburgerMenu links={links} />
      <Navs links={links} />
    </nav>
  );
};

export default NavBar;
