import craft4free from "@/assets/projects/craft4free0.png";
import autovid from "@/assets/projects/autovid0.png";
import swiftgesture from "@/assets/projects/swiftgesture0.png";
import percolation from "@/assets/projects/percolation2.gif";
import wordle from "@/assets/projects/wordle0.png";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Craft4Free.Online",
      link: "https://craft4free.online",
      description:
        "Developed a cloud-based platform for Minecraft server deployment, reducing setup time from hours to under 2 minutes using Docker containers on Oracle Cloud and AWS EC2. The system features a FastAPI backend for automated lifecycle management with Traefik for static URL preservation, plus a responsive React/TailwindCSS frontend providing real-time monitoring via websockets.",
      technologies: [
        "React",
        "Python",
        "TypeScript",
        "Docker",
        "FastAPI",
        "AWS",
        "PostgreSQL",
      ],
      images: [craft4free],
      btns: [
        ["Site", "https://craft4free.online"],
        ["GitHub", "https://github.com/ajinkyatalekar/craft4free.online"],
      ],
    },
    {
      id: 2,
      title: "AutoVid",
      link: "https://github.com/ajinkyatalekar/autovid",
      description:
        "Autovid is an open-source python package for automated video generation. It uses various text-to-speech, video, and audio manipulation libraries in Python to produce high-quality videos with minimal user input. Autovid's new beta version also features a GUI made using Django, allowing the user to easily create videos without the hassle of command line inputs.",
      technologies: ["Python", "Django", "gTTS", "Git"],
      images: [autovid],
      btns: [["GitHub", "https://github.com/ajinkyatalekar/autovid"]],
    },
    {
      id: 3,
      title: "SwiftGesture",
      link: "https://github.com/ajinkyatalekar/SwiftGesture",
      description:
        "SwiftGesture is a pipeline for rapidly training fast real-time models for classifying custom hand gestures. It produces reliable models with just 3 input images per gesture being trained. A model trained using SwiftGesture on just 80 images was able to accurately classify ALL the letters of the American sign language with 95% accuracy.",
      technologies: [
        "TensorFlow",
        "MediaPipe",
        "OpenCV",
        "Streamlit",
        "Python",
      ],
      images: [swiftgesture],
      btns: [["GitHub", "https://github.com/ajinkyatalekar/swiftgesture"]],
    },
    {
      id: 4,
      title: "Percolation Visualizer",
      link: "https://github.com/ajinkyatalekar/percolation-visualizer",
      description:
        "A visualizer for the percolation DSA problem. Uses Weighted Union Find with Path Compression for solving the problem and the alg4.jar library for interactive elements. Includes real-time flow which updates filled sites after every new site is opened.",
      technologies: [
        "TensorFlow",
        "MediaPipe",
        "OpenCV",
        "Streamlit",
        "Python",
      ],
      images: [percolation],
      btns: [
        ["GitHub", "https://github.com/ajinkyatalekar/percolation-visualizer"],
      ],
    },
    {
      id: 5,
      title: "Wordle Solver",
      link: "https://ajinkyatalekar.github.io/projects/wordle_solver/index.html",
      description:
        "A visualizer for the percolation DSA problem. Uses Weighted Union Find with Path Compression for solving the problem and the alg4.jar library for interactive elements. Includes real-time flow which updates filled sites after every new site is opened.",
      technologies: ["JavaScript"],
      images: [wordle],
      btns: [
        ["Site", "https://ajinkyatalekar.github.io/WordleSolver/"],
        ["GitHub", "https://github.com/ajinkyatalekar/percolation-visualizer"],
      ],
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16">
      <p className="text-center text-5xl mb-16 font-lora">Projects</p>

      <div className="space-y-16">
        {projects.map((project) => (
          <div key={project.id} className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-2/5 relative md:h-auto rounded-lg">
              <a
                href={project.link}
                target="_blank"
                className="group relative block overflow-hidden rounded-lg"
              >
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full object-cover h-72 rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
              </a>
            </div>

            {/* Project Details */}
            <div className="w-full md:w-3/5 p-6 flex flex-col">
              <a
                className="text-2xl mb-4 cursor-pointer hover:text-orange-400 transition-colors duration-200 font-lora underline-offset-2 decoration-1"
                href={project.link}
                target="_blank"
              >
                {project.title}
              </a>
              <p className="text-gray-600 dark:text-gray-300 mb-2 flex-grow">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    // className="px-3 py-1 bg-gray-700 text-white text-sm rounded-md"
                    className="px-3 py-1 bg-gray-600 text-white text-sm rounded-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {project.btns.map((btn, index) => (
                  <a href={btn[1]} target="_blank" key={index}>
                    <Button className="cursor-pointer">
                      {btn[0]} <ArrowRight />
                    </Button>
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
