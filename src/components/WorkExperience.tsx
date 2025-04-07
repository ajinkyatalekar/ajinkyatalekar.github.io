const WorkExperience = () => {
  const projects = [
    {
      id: 1,
      title: "SteinnLabs",
      position: "Software Engineer Intern",
      link: "https://craft4free.online",
      date: "Dec. 2024 – Mar. 2025",
      description:
        "Designed PostgreSQL database schema and developed scalable RESTful API using FastAPI for appointment scheduling application, implementing authentication, role-based access control, and row-level security. Implemented secure storage and deployment pipelines using AWS services, leveraging S3 buckets for data storage, Amplify for scalable front-end hosting, and Route 53 for domain management.",
      technologies: ["React", "React Native", "AWS", "PostgreSQL", "FastAPI"],
      images: ["steinnlabs.jpeg"],
    },
    {
      id: 2,
      title: "University at Buffalo",
      position: "Teaching Assistant",
      link: "https://example.com",
      date: "Aug. 2023 – Present",
      description:
        "Instructed 600+ students in Discrete Structures, reinforcing fundamental concepts for Data Structures & Algorithms. Led weekly recitations and office hours.",
      technologies: [
        "JavaScript",
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "GitLab CI",
      ],
      images: [],
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16">
      <p className="text-center text-5xl mb-16 font-lora">Work Experience</p>

      {/* Timeline container */}
      <div className="relative">
        {/* The vertical timeline line */}
        <div className="absolute left-0 md:left-1/4 w-px h-full bg-gray-400/50 dark:bg-gray-700"></div>

        <div className="space-y-16">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col md:flex-row relative"
            >
              {/* Timeline dot and date */}
              <div className="md:w-1/4 mb-4 md:mb-0 flex md:justify-end pr-8">
                <div className="relative">
                  {/* Date */}
                  <div className="font-medium text-gray-600 mb-2 md:text-right ml-3 md:-mr-4 md:-mt-1">
                    {project.date}
                  </div>
                  {/* Dot */}
                  <div className="invisible md:visible absolute top-1 -right-[2.28rem] w-2 h-2 rounded-full bg-orange-300 z-10"></div>
                </div>
              </div>

              {/* Project Details */}
              <div className="md:w-3/4 p-6 rounded-lg gap-1 flex flex-col">
                <a
                  className="text-2xl transition-colors duration-200 font-lora"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.title}
                </a>
                <a
                  className="text-lg mb-2 transition-colors duration-200 font-lora"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.position}
                </a>
                <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-700 text-white text-sm rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
