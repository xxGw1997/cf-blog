import Link from "next/link";

import ywxImg from "@/assets/imgs/ywx.png";
import ywxDarkImg from "@/assets/imgs/ywx-dark.png";

import NavBar from "./navbar";
import { ThemeSwitch } from "../theme-switch";
import DarkModeImg from "../dark-mode-img";

export const Toolbar = () => {
  return (
    <header className="h-[80px] flex items-center">
      <Link href="/" title="首页" className="fixed m-7 max-md:absolute">
        <DarkModeImg
          lightImg={ywxImg}
          darkImg={ywxDarkImg}
          width={72}
          height={72}
          priority
        />
      </Link>
      <NavBar />
      {/* <div className="absolute right-20 top-5">
        <SignInButton />
      </div> */}
      {/* <LuRss size={24} className="absolute right-20" /> */}
      <ThemeSwitch className="fixed right-5 top-5 hidden md:flex" />
    </header>
  );
};
