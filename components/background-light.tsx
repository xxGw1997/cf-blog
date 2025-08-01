"use client";
import React, { useEffect } from "react";
import {
  animate,
  motion,
  useMotionValue,
  ValueAnimationTransition,
} from "motion/react";

const COLORS = [
  // bg-primary/20
  "#af08f733",
  "#1E67C650",
  "#13FFAA50",
  "#DD335C50",
  "#CE84CF50",
  // bg-accent/20
  "#11eee733",
];
const BackgroundLight = () => {
  const color_left = useMotionValue(COLORS[0]);
  const color_right = useMotionValue(COLORS[1]);

  useEffect(() => {
    const animateOptions: ValueAnimationTransition<string> = {
      ease: "easeInOut",
      duration: 15,
      repeat: Infinity,
      repeatType: "mirror",
    };
    animate(color_left, COLORS, animateOptions);
    animate(color_right, COLORS.reverse(), animateOptions);
  }, []);
  return (
    <>
      <motion.div
        style={{
          backgroundColor: color_left,
        }}
        className="absolute top-[-6rem] flex-1 -z-[10] right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]"
      ></motion.div>
      <motion.div
        style={{
          backgroundColor: color_right,
        }}
        className=" absolute top-[-1rem] -z-[10] flex-1 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]"
      ></motion.div>
    </>
  );
};

export default BackgroundLight;
