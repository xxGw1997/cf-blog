"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import SectionHeading from "./section-heading";
import { ProjectInfo, projectsData } from "@/lib/links";

const Projects = () => {
  return (
    <section id="projects" className="scroll-mt-28 mb-28">
      <SectionHeading>My Projects</SectionHeading>

      <div>
        {projectsData.map((project, index) => (
          <ProjectCard key={project.link} {...project} />
        ))}
      </div>
    </section>
  );
};

const ROTATION_OFFSET = 15;

const ProjectCard: React.FC<ProjectInfo> = ({
  title,
  description,
  tags,
  imageUrl,
  link,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg) scale(${scaleProgess})`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;

    // if element not scroll in completely, do not rotate
    if (scrollYProgress.get() < 1) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const coordinate_x = (
      ((e.clientX - rect.left - width / 2) / width) *
      2
    ).toFixed(2);
    const coordinate_y = (
      ((e.clientY - rect.top - height / 2) / height) *
      -2
    ).toFixed(2);

    x.set(Number(coordinate_y) * ROTATION_OFFSET);
    y.set(Number(coordinate_x) * ROTATION_OFFSET);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        opacity: opacityProgess,
        transformStyle: "preserve-3d",
        transform,
      }}
      className="group relative mb-3 sm:mb-8 last:mb-0 will-change-transform p-10 bg-pink-700/30 dark:bg-blue-900/60 rounded-lg"
    >
      <section
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(50px)",
        }}
        className="shadow-custom relative bg-white max-w-[42rem] border border-black/5 rounded-lg overflow-hidden sm:pr-8 hover:bg-gray-200 transition sm:group-even:pl-8 dark:text-white dark:bg-slate-700/60 dark:hover:bg-slate-700"
      >
        <div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[65%] flex flex-col gap-y-6 h-full sm:group-even:ml-[15rem]">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="mt-2 leading-relaxed text-gray-700 dark:text-white/70">
            {description}
          </p>
          <ul className="flex flex-wrap mt-4 gap-2 sm:mt-auto">
            {tags.map((tag, index) => (
              <li
                className="bg-black/[0.7] px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full dark:text-white/70"
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <Image
          style={{
            transform: "translateZ(80px)",
          }}
          src={imageUrl}
          alt="Project I worked on"
          quality={95}
          width={400}
          height={100}
          onClick={() => {
            window.open(link, "_blank");
          }}
          className="absolute hidden sm:block top-8 -right-40 rounded-t-lg shadow-2xl cursor-pointer
                     transition
                     group-even:right-[initial] group-even:-left-40"
        />
      </section>
    </motion.div>
  );
};

export default Projects;
