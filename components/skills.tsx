"use client";

import React, { useRef } from "react";
import { motion } from "motion/react";

import { skillsData } from "@/lib/links";
import { useSectionInView } from "@/hooks/useSectionInView";

import SectionHeading from "./section-heading";
import { Button } from "./ui/button";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

const Skills = () => {
  const ref = useRef(null);

  useSectionInView("#skills", ref);

  return (
    <section
      id="skills"
      className="mb-28 max-w-[53rem] scroll-t-28 text-center sm:mb-40"
    >
      <SectionHeading>My Skills</SectionHeading>
      <ul className="flex flex-wrap justify-center gap-5 text-lg">
        {skillsData.map((skill, index) => {
          const Icon = skill.icon;

          return (
            <motion.li
              variants={fadeInAnimationVariants}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: true,
              }}
              custom={index}
              key={index}
            >
              <Button variant="tag" className="rounded-xl !px-5 !py-3">
                {Icon && <Icon className="mr-1 size-5" />}
                {skill.label}
              </Button>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
};

export default Skills;
