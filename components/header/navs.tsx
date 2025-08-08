"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { usePathname } from "next/navigation";

import { Link as LinkType } from "@/lib/links";
import { cn } from "@/lib/utils";

import { useActiveSectionContext } from "../providers/active-section";

type NavsProps = {
  links: LinkType[];
};

const Navs: React.FC<NavsProps> = ({ links }) => {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const pathname = usePathname();

  const [hidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() || 0;
    if (latest > prev && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  return (
    <motion.div
      variants={{
        visible: { y: 0 },
        hidden: { y: "-150%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="md:flex items-center justify-center fixed z-[99] -mt-5"
    >
      <ul className="flex flex-wrap items-center justify-center gap-y-1 text-[1rem] font-medium rounded-full backdrop-blur-md">
        {links.map((link) => (
          <li
            key={link.hash}
            className="flex items-center justify-center relative"
          >
            <Link
              href={link.hash}
              className={cn(
                "flex w-full items-center justify-center px-5 py-3 transition",
                "nav-text-shadow-hover transition-all tracking-widest",
                {
                  "nav-text-shadow":
                    activeSection === link.hash || pathname.includes(link.hash),
                }
              )}
              onClick={() => {
                setActiveSection(link.hash);
                setTimeOfLastClick(Date.now());
              }}
            >
              {link.name}
              {(link.hash === activeSection ||
                pathname.includes(link.hash)) && (
                <motion.div
                  className="bg-primary/5 absolute inset-0 -z-10 rounded-full"
                  layoutId="activeSection"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                ></motion.div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Navs;
