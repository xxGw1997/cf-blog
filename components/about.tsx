"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Fade } from "react-awesome-reveal";

import { useSectionInView } from "@/hooks/useSectionInView";

import SectionHeading from "./section-heading";

export default function About() {
  const ref = useRef(null);

  useSectionInView("#about", ref);

  return (
    <motion.section
      ref={ref}
      className="max-w-[45rem] text-center mt-32 leading-8 mb-28 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <div className="container mx-auto">
        <Fade
          direction="up"
          delay={400}
          cascade
          damping={1e-1}
          triggerOnce={true}
        >
          <SectionHeading>About Me</SectionHeading>
        </Fade>

        <div className="grid lg:grid-cols-2 lg:text-start">
          <div className="flex-1">
            {/* Content */}
            <div className="text-lg mt-12 xl:mt-3">
              <div className="flex justify-start flex-col">
                <Fade
                  direction="up"
                  delay={400}
                  cascade
                  damping={1e-1}
                  triggerOnce={true}
                >
                  <h3 className="font-bold mt-6">My Style</h3>
                </Fade>
                <Fade
                  direction="up"
                  delay={600}
                  cascade
                  damping={1e-1}
                  triggerOnce={true}
                >
                  <p className="mt-2 leading-relaxed text-sm text-gray-700 dark:text-white/70">
                    My dream is to live an ordinary life. Although I don't have
                    exceptional programming talents, I firmly believe that
                    through my unremitting efforts, I can also create some
                    amazing works.
                  </p>
                </Fade>
                <Fade
                  direction="up"
                  delay={800}
                  cascade
                  damping={1e-1}
                  triggerOnce={true}
                >
                  <h3 className="font-bold mt-6">Beyond the Code</h3>
                </Fade>
                <Fade
                  direction="up"
                  delay={1000}
                  cascade
                  damping={1e-1}
                  triggerOnce={true}
                >
                  <p className="mt-2 leading-relaxed text-sm text-gray-700 dark:text-white/70">
                    Outside of programming, I still spend most of my time in
                    front of the computer. I often play online games with
                    friends, such as League of Legends and Valorant. When I'm
                    alone, I play GTA5 online mode.
                  </p>
                </Fade>
                <Fade
                  direction="up"
                  delay={1200}
                  cascade
                  damping={1e-1}
                  triggerOnce={true}
                >
                  <h3 className="font-bold mt-6">Some plans</h3>
                </Fade>
                <Fade
                  direction="up"
                  delay={1400}
                  cascade
                  damping={1e-1}
                  triggerOnce={true}
                >
                  <p className="mt-2 leading-relaxed text-sm text-gray-700 dark:text-white/70">
                    During my school years, I didn't study English seriously.
                    Now I realize the importance of English, so in the coming
                    years, I plan to master it and hope to be able to
                    communicate fluently with others in English.Although it will
                    be difficult,I will keep going.
                  </p>
                </Fade>
              </div>
            </div>
          </div>
          <div className="max-lg:hidden">
            <Fade
              direction="right"
              delay={600}
              cascade
              damping={1e-1}
              triggerOnce={true}
            >
              <Image
                src="/boy.png"
                width="433"
                height="577"
                alt="portrait"
                quality="100"
                priority={true}
                className="rounded-full mt-8 object-cover"
              />
            </Fade>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
