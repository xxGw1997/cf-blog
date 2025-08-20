import { AuthButton } from "../auth/auth-button";
import NavBar from "./navbar";

export const Toolbar = () => {
  return (
    <header className="h-[80px] flex items-center">
      <NavBar />
      <AuthButton />
    </header>
  );
};
