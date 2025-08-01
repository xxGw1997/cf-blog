import { useInView } from "motion/react";
import React, { useEffect } from "react";
import {
  SectionName,
  useActiveSectionContext,
} from "@/components/active-section";

export function useSectionInView(
  sectionName: SectionName,
  ref: React.MutableRefObject<null>
) {
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection(sectionName);
    }
  }, [isInView]);
}
