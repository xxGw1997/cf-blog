"use client";

import Hamburger from "hamburger-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Link from "next/link";

import { Link as LinkType } from "@/lib/links";
import { cn } from "@/lib/utils";
import { useActiveSectionContext } from "../active-section";
import { ThemeSwitch } from "../theme-switch";
import { Separator } from "../ui/separator";

type HamburgerMenuProps = {
  links: LinkType[];
};

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  const menuTrigger = {
    visible: { scale: 1, opacity: 0.7, y: 0 },
    tap: { scale: 0.85 },
    hover: { scale: 1.2 },
  };

  const menuList = {
    start: { scale: 0.6, opacity: 0.7, y: -20 },
    visible: { scale: 1, opacity: 0.9, y: 0 },
  };

  return (
    <div className="md:hidden top-2 right-5 fixed w-60 z-[99] flex flex-col items-end gap-2">
      <motion.button
        className="bg-white w-[3rem] h-[3rem] drop-shadow backdrop-blur-[0.5rem] border border-slate-400 dark:border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center dark:bg-gray-950"
        variants={menuTrigger}
        initial="visible"
        whileTap="tap"
        whileHover="hover"
      >
        <Hamburger toggled={isOpen} toggle={setIsOpen} size={20} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="w-full bg-white drop-shadow border border-slate-400 dark:border-white border-opacity-60 shadow-2xl rounded-2xl flex flex-col items-center justify-center dark:bg-gray-950 p-1"
            variants={menuList}
            initial="start"
            animate="visible"
          >
            {links.map((link, index) => (
              <motion.div
                className="w-full"
                initial={{ y: -100 + index * 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                key={link.hash}
              >
                <Link
                  href={link.hash}
                  className={cn(
                    "flex w-full items-center justify-center px-3 py-3 hover:text-primary transition cursor-pointer",
                    {
                      "text-primary bg-slate-200 dark:bg-slate-700 rounded":
                        activeSection === link.hash,
                      "rounded-t-xl round": index === 0,
                      "rounded-b-xl round": index === links.length - 1,
                    }
                  )}
                  onClick={() => {
                    setActiveSection(link.hash);
                    setTimeOfLastClick(Date.now());
                  }}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <Separator className="my-1" />
            <motion.div
              className="w-full flex justify-center items-center my-2"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <ThemeSwitch />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
