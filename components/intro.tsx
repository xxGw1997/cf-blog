"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Mail, GithubIcon } from "lucide-react";
import { motion } from "motion/react";
import { Fade } from "react-awesome-reveal";
import { Button } from "./ui/button";

const Intro = () => {
  return (
    <section className="mb-28 max-w-[75rem] text-center sm:mb-0">
      <div className="flex items-center justify-center">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 125,
              damping: 10,
              duration: 0.2,
            }}
          >
            <Image
              src="/ywx.png"
              width={480}
              height={480}
              alt="portrait"
              quality={100}
              priority={true}
              className="rounded-full shadow-xl object-cover"
            />
          </motion.div>
          <motion.span
            className="text-6xl absolute bottom-8 right-12"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 125,
              damping: 10,
              duration: 0.2,
            }}
          >
            🖐
          </motion.span>
        </div>
      </div>

      <Fade
        direction="up"
        delay={400}
        cascade
        damping={1e-1}
        triggerOnce={true}
      >
        <h1 className="mb-10 mt-4 text-2xl sm:text-4xl">
          <span className="font-medium !leading-[1.5]">Hey , I am ywx</span>
          <p className="text-[14px]">
            You also can call me xxgw~, an unremarkable front-end developer
            <br />
            Welcome to visit my website~ 😐😑😶
          </p>
        </h1>
      </Fade>

      <motion.div
        className="flex sm:flex-row items-center justify-center gap-10 px-4 text-lg font-medium"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
      >
        <Button
          asChild
          variant="tag"
          size="lg"
          className="group flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition !px-8"
        >
          <Link href="mailto:xxgw1997@163.com">
            Contact me <Mail className="size-4 ml-3 text-foreground/60" />
          </Link>
        </Button>
        <Button
          asChild
          variant="tag"
          size="lg"
          className="rounded-full flex items-center text-[1.35rem] focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition"
        >
          <a href="https://github.com/xxGw1997" target="_blank">
            <GithubIcon />
          </a>
        </Button>
      </motion.div>
    </section>
  );
};

export default Intro;
