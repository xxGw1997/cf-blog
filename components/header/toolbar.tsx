import NavBar from "./navbar";
import { ThemeSwitch } from "../theme-switch";

export const Toolbar = () => {
  return (
    <header className="h-[80px] flex items-center">
      <NavBar />
      {/* <div className="absolute right-20 top-5">
        <SignInButton />
      </div> */}
      {/* <LuRss size={24} className="absolute right-20" /> */}
    </header>
  );
};
