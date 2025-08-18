import { TableOfContents } from "lucide-react";

import { cn, slugify } from "@/lib/utils";
import { Highlighter } from "../magicui/highlighter";

const LEVEL_ARR = ["zero", "one", "two", "three", "four", "five"] as const;

function getTOC(content: string) {
  const headerExp = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
  const codeExp = /```[\s\S]*?```/g;

  const headings = Array.from(
    content.replace(codeExp, "").matchAll(headerExp)
  ).map(({ groups }) => {
    if (!groups)
      return {
        level: LEVEL_ARR[5],
        text: "",
        slug: "",
      };

    const { flag, content } = groups;

    return {
      level: LEVEL_ARR[flag.length] ?? "five",
      text: content,
      slug: slugify(content),
    };
  });

  return headings;
}

const TOC = ({
  content,
  className,
}: React.ComponentProps<"div"> & { content: string }) => {
  const headings = getTOC(content);

  if (!headings || headings.length === 0) return null;

  const TOC_STYLE = `data-[level=one]:pl-0 data-[level=one]:pt-2 data-[level=one]:font-semibold
   data-[level=two]:pl-0 data-[level=two]:pt-1 data-[level=two]:font-medium
   data-[level=three]:pl-3
   data-[level=four]:pl-6
   data-[level=five]:pl-9`;

  return (
    <div className={cn("overflow-y-auto md:w-80 pl-5 group/toc", className)}>
      <TableOfContents className="cursor-pointer ml-1 opacity-0 group-hover/toc:opacity-100 group-hover:opacity-100 transition-opacity duration-[1s]" />
      <ul className="flex flex-col list-none pl-0 mt-0 opacity-0 group-hover/toc:opacity-100 group-hover:opacity-100 transition-opacity duration-[1s]">
        {headings.map((heading, index) => (
          <li key={index} className="m-0 text-sm">
            <a
              href={`#${heading.slug}`}
              data-level={heading.level}
              className={cn(
                "inline-block cursor-pointer no-underline opacity-70 hover:opacity-100",
                TOC_STYLE
              )}
            >
              <Highlighter action="underline" color="#FF9800">
                {heading.text}
              </Highlighter>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TOC;
