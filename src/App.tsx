import { Linkedin, Github, Mail, ArrowRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ProjectsList from "./components/Projects";
import WorkExperience from "./components/WorkExperience";
import { Button } from "./components/ui/button";
import profile_pic from "@/assets/profile.jpeg";

import resume from "/ajinkya_resume.pdf";

const Portfolio = () => {
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const animationSpeed = 40;

  const [direction, setDirection] = useState("diagonal-down-right");

  useEffect(() => {
    setDirection("diagonal-down-right");
    const animateGrid = () => {
      if (
        direction === "right" ||
        direction === "diagonal-down-right" ||
        direction === "diagonal-up-right"
      ) {
        setOffsetX((prev) => (prev + 0.25) % 32);
      } else if (
        direction === "left" ||
        direction === "diagonal-down-left" ||
        direction === "diagonal-up-left"
      ) {
        setOffsetX((prev) => (prev - 0.25 + 32) % 32);
      }

      if (
        direction === "down" ||
        direction === "diagonal-down-right" ||
        direction === "diagonal-down-left"
      ) {
        setOffsetY((prev) => (prev + 0.25) % 64);
      } else if (
        direction === "up" ||
        direction === "diagonal-up-right" ||
        direction === "diagonal-up-left"
      ) {
        setOffsetY((prev) => (prev - 0.25 + 64) % 64);
      }
    };

    const interval = setInterval(animateGrid, animationSpeed);
    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div>
      <div
        className="fixed inset-0 w-full h-full opacity-10 -z-10 bg-cream"
        style={{
          backgroundImage: `
                  linear-gradient(to right, #6c7583 1px, transparent 1px),
                  linear-gradient(to bottom, #6c7583 1px, transparent 1px)
                `,
          backgroundSize: "2rem 4rem",
          backgroundPosition: `${offsetX}px ${offsetY}px`,
        }}
      />
      <div className="absolute top-6 left-6 flex items-center space-x-4">
        <a
          href="https://linkedin.com/in/ajinkyatalekar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-blue-600 transition-colors p-2"
        >
          <Linkedin size={24} />
        </a>
        <a
          href="https://github.com/ajinkyatalekar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-orange-600 transition-colors p-2"
        >
          <Github size={24} />
        </a>
        <a
          href="mailto:ajinkyat@buffalo.edu"
          className="text-gray-700 hover:text-green-500 transition-colors p-2"
        >
          <Mail size={24} />
        </a>
      </div>

      <div className="h-screen flex flex-col md:flex-row items-center justify-center px-12">
        <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
          <p className="text-7xl mb-6 font-lora">Hello, I'm Ajinkya!</p>
          <p className="text-3xl text-gray-600 mb-4">
            CS @ University at Buffalo, NY
          </p>
          <p className="text-xl text-gray-600">
            I'm Ajinkya Talekar, a junior undergrad studying Computer Science
            and Math. I have a lot of cool full-stack projects that I want to
            share 👾!
          </p>
          <div className="mt-4" />
          <div className="flex flex-row gap-2">
            <a href={resume} target="_blank">
              <Button size={"lg"} className="cursor-pointer">
                Resume <ArrowRightIcon />
              </Button>
            </a>
            <a href="https://github.com/ajinkyatalekar" target="_blank">
              <Button size={"lg"} className="cursor-pointer">
                GitHub <ArrowRightIcon />
              </Button>
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-end">
          <img
            src={profile_pic}
            alt="Profile Picture"
            className="rounded-lg shadow-lg max-w-full h-auto max-h-96 object-cover"
          />
        </div>
      </div>
      <WorkExperience />
      <ProjectsList />
    </div>
  );
};

export default Portfolio;
