import {
  CSS3Icon,
  DrizzleIcon,
  FrameMotionIcon,
  GsapIcon,
  HonoIcon,
  HTML5Icon,
  JSIcon,
  NestIcon,
  NextIcon,
  NodeIcon,
  PrismaIcon,
  ReactIcon,
  ReactQueryIcon,
  TailwindIcon,
  ThreeIcon,
  TSIcon,
  ViteIcon,
  VueIcon,
} from "@/components/brand-icons";
import { JSX } from "react";

export type Link = {
  name: string;
  hash: string;
};

export type ProjectInfo = {
  title: string;
  description: string;
  tags: {
    label: string;
    icon: (({ className }: React.ComponentProps<"svg">) => JSX.Element) | null;
  }[];
  imageUrl: string;
  link: string;
};

export const links: Link[] = [
  {
    name: "Home",
    hash: "/#home",
  },
  {
    name: "About",
    hash: "/#about",
  },
  {
    name: "Skills",
    hash: "/#skills",
  },
  {
    name: "Projects",
    hash: "/#projects",
  },
  {
    name: "Playground",
    hash: "/playground",
  },
  {
    name: "Blog",
    hash: "/posts",
  },
];

export const projectsData: ProjectInfo[] = [
  {
    title: "Slack clone",
    description:
      "This is a Slack-inspired web application designed to streamline team communication and collaboration. The app replicates key features of Slack, focusing on providing an intuitive and efficient platform for users to connect and interact in real-time.",
    tags: [
      { label: "React", icon: ReactIcon },
      { label: "Next.js", icon: NextIcon },
      { label: "Convex", icon: null },
      { label: "Tailwind", icon: TailwindIcon },
      { label: "NodeJS", icon: NodeIcon },
    ],
    imageUrl: "/Project_slack.png",
    link: "https://slack-gold-two.vercel.app",
  },
  {
    title: "3d Room",
    description:
      "This is an interactive 3D frontend project built using modern web technologies like HTML, CSS, JavaScript, and advanced libraries such as GSAP and Three.js. The project showcases creative and dynamic 3D elements, offering users an engaging and immersive experience directly within their browsers.",
    tags: [
      { label: "HTML", icon: HTML5Icon },
      { label: "Javascript", icon: JSIcon },
      { label: "Three.js", icon: ThreeIcon },
      { label: "Gsap", icon: GsapIcon },
      { label: "Vite", icon: ViteIcon },
    ],
    imageUrl: "/Project_3d_room.png",
    link: "https://xxgw-room.vercel.app",
  },
  {
    title: "Racing",
    description:
      "This is an exciting 3D racing game developed using Three.js and react-three-fiber, combining the power of WebGL with the flexibility of React to deliver a highly interactive and visually captivating gaming experience. The project showcases smooth gameplay mechanics, realistic 3D environments, and responsive controls for an engaging user experience.",
    tags: [
      { label: "React", icon: ReactIcon },
      { label: "React Three Fiber", icon: null },
      { label: "React Three Drei", icon: null },
      { label: "Three.js", icon: ThreeIcon },
      { label: "Zustand", icon: null },
    ],
    imageUrl: "/Project_racing.png",
    link: "https://xxgw-racing.vercel.app",
  },
];

export const skillsData = [
  { label: "HTML", icon: HTML5Icon },
  { label: "CSS", icon: CSS3Icon },
  { label: "JavaScript", icon: JSIcon },
  { label: "TypeScript", icon: TSIcon },
  { label: "React", icon: ReactIcon },
  { label: "Vue", icon: VueIcon },
  { label: "Vite", icon: ViteIcon },
  { label: "Node.js", icon: NodeIcon },
  { label: "Next.js", icon: NextIcon },
  { label: "TailwindCSS", icon: TailwindIcon },
  { label: "Prisma", icon: PrismaIcon },
  { label: "Drizzle", icon: DrizzleIcon },
  { label: "Zustand", icon: null },
  { label: "React Query", icon: ReactQueryIcon },
  { label: "Nest.js", icon: NestIcon },
  { label: "Hono", icon: HonoIcon },
  { label: "Framer Motion", icon: FrameMotionIcon },
  { label: "Three.js", icon: ThreeIcon },
];
