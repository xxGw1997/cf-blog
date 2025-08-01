export type Link = {
  name: string;
  hash: string;
};

export type ProjectInfo = {
  title: string;
  description: string;
  tags: string[];
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
    hash: "/playground"
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
    tags: ["React", "Next.js", "Convex", "Tailwind", "NodeJS"],
    imageUrl: "/Project_slack.png",
    link: "https://slack-gold-two.vercel.app",
  },
  {
    title: "3d Room",
    description:
      "This is an interactive 3D frontend project built using modern web technologies like HTML, CSS, JavaScript, and advanced libraries such as GSAP and Three.js. The project showcases creative and dynamic 3D elements, offering users an engaging and immersive experience directly within their browsers.",
    tags: ["HTML", "Javascript", "Three.js", "Gsap", "Vite"],
    imageUrl: "/Project_3d_room.png",
    link: "https://xxgw-room.vercel.app",
  },
  {
    title: "Racing",
    description:
      "This is an exciting 3D racing game developed using Three.js and react-three-fiber, combining the power of WebGL with the flexibility of React to deliver a highly interactive and visually captivating gaming experience. The project showcases smooth gameplay mechanics, realistic 3D environments, and responsive controls for an engaging user experience.",
    tags: [
      "React",
      "React Three Fiber",
      "React Three Drei",
      "Three.js",
      "Zustand",
    ],
    imageUrl: "/Project_racing.png",
    link: "https://xxgw-racing.vercel.app",
  },
];

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Next.js",
  "TailwindCSS",
  "Prisma",
  "Zustand",
  "React Query",
  "Nest.js",
  "Framer Motion",
  "Three.js",
];
