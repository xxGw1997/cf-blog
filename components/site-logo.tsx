import Link from "next/link";
import React from "react";
import ywxImg from "@/assets/imgs/ywx.png";
import ywxDarkImg from "@/assets/imgs/ywx-dark.png";

import DarkModeImg from "./dark-mode-img";

const SiteLogo = () => {
  return (
    <Link href="/" title="首页" className="fixed m-7 max-md:absolute">
      <DarkModeImg
        lightImg={ywxImg}
        darkImg={ywxDarkImg}
        width={72}
        height={72}
        priority
      />
    </Link>
  );
};

export default SiteLogo;
