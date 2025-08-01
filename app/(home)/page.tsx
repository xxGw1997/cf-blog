import Intro from "@/components/intro";
import About from "@/components/about";
import Skills from "@/components/skills";
import Projects from "@/components/projects";

export default function Home() {
  return (
    <main className="flex flex-col items-center pt-20 md:pt-28 px-4 pb-32">
      <Intro />
      <About />
      <Skills />
      <Projects />
    </main>
  );
}
