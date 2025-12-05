export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  clickedImage: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const projectsData: Project[] = [
  {
    id: "yorticia",
    title: "Yorticia.com",
    description:
      "Created a stunning personal portfolio website for model Yorticia, enhancing her online presence and providing a dedicated space to display her work and connect with industry professionals. The site features an image-rich gallery and detailed service listings,implementing Authentication and Authorization for CRUD operations",
    image: "/YorticiaWebsiteThumbnail.png",
    clickedImage: "/YorticiaWebsite.png",
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "Javascript",
      "Cloudflare",
      "Firebase",
    ],
    liveUrl: "https://Yorticia.com/",
    githubUrl: "https://github.com/LugawPlain/Yorticia",
  },
  {
    id: "orbital-simulation",
    title: "Newton vs Einstein Orbital Simulation",
    description:
      "Simulating Orbits based on Newton equation and Post-Newtonian equation based on Einstein's General Relativity Theory ",
    image: "/OrbitalSimulationThumbnail.png",
    clickedImage: "/OrbitalSimulation.png",
    technologies: ["Javascript", "HTML", "CSS"],
    liveUrl:
      "https://lugawplain.github.io/Newton-vs-Einstein-Orbital-Simulation/",
    githubUrl:
      "https://github.com/LugawPlain/Newton-vs-Einstein-Orbital-Simulation",
  },
  {
    id: "lead-entry-automation",
    title: "Lead Entry & Enrichment Automation",
    description:
      "Automating Lead Entry Process storing them in Airtable along lead enrichment using APIFY and Firecrawl to extract data from websites and APIs lastly creating a Notion page for each lead",
    image: "/LeadEntryProjectThumbnail.png",
    clickedImage: "/LeadEntryProject.png",
    technologies: ["N8n", "APIFY", "Firecrawl", "Tally ", "Airtable", "Notion"],
    liveUrl: "https://tally.so/r/5BXrkd",
    githubUrl: "",
  },
  {
    id: "vr-sscr",
    title: "VR SSCR",
    description:
      "Created a VR educational experience for SSCRDC students focused on microcontrollers and logic gates. The simulation allowed students to interactively build virtual circuits, visualize signal flow, and grasp complex digital logic concepts in an intuitive 3D environment",
    image: "/VRSSCR.webp",
    clickedImage: "/VRSSCR.png",
    technologies: ["Javascript", "Aframe", "Three.js", "Blender", "Python"],
    liveUrl: "https://vr-sscr.netlify.app/",
    githubUrl: "https://github.com/LugawPlain/VR-SSCR",
  },
  {
    id: "hamming-code",
    title: "Hamming Code Parity Error Correction",
    description:
      "Created a Hamming Code Parity Error Correction System that is fundamental to correct errors in data transmission and storage ",
    image: "/HammingCodeThumbnail.png",
    clickedImage: "/HammingCode.png",
    technologies: ["Javascript", "HTML", "CSS"],
    liveUrl: "https://lugawplain.github.io/Hamming_Code_Parity/",
    githubUrl: "https://github.com/LugawPlain/Hamming_Code_Parity",
  },
  {
    id: "space-time",
    title: "Space Time",
    description:
      "A visually stunning, interactive gravity simulation that visualizes the curvature of space-time. This project demonstrates how massive objects (like stars) warp the fabric of space, influencing the motion of smaller objects (like planets) around them, based on General Relativity concepts.",
    image: "/SpaceTimeThumbnail.png",
    clickedImage: "/SpaceTime.png",
    technologies: ["Javascript", "HTML", "CSS"],
    liveUrl: "https://lugawplain.github.io/Space-Time/",
    githubUrl: "https://github.com/LugawPlain/Space-Time",
  },
  {
    id: "axelrods-tournament",
    title: "Axelrods Tournament",
    description:
      "A comprehensive web-based simulation of Robert Axelrod's famous Prisoner's Dilemma tournament, exploring the evolution of cooperation through game theory This project is based on Robert Axelrod's influential research paper, 'Effective Choice in the Prisoner's Dilemma', which made significant contributions to the fields of game theory, political science, and evolutionary biology.",
    image: "/AxelrodsTournamentThumbnail.png",
    clickedImage: "/AxelrodsTournament.png",
    technologies: ["Javascript", "HTML", "CSS"],
    liveUrl: "https://lugawplain.github.io/Axelrods-Tournament/",
    githubUrl: "https://github.com/LugawPlain/Axelrods-Tournament",
  },
  
  {
    id: "rag-vector-database-automation",
    title: "RAG Vector Database Automation",
    description:
      "Created a RAG Vector Database Automation System that automates the process of storing files in Supabase Vector Database then using Retreival Augmented Generation (RAG) to generate responses to user queries",
    image: "/RAGVectorDatabaseThumbnail.png",
    clickedImage: "/RAGVectorDatabase.png",
    technologies: ["N8n", "Supabase", "Google Drive", "OpenAI", "Postgres"],
    liveUrl: "#",
    githubUrl: "",
  },
   {
    id: "optical-physics-simulation",
    title: "Optical Physics Simulation",
    description:
      "A comprehensive web-based simulation of Robert Axelrod's famous Prisoner's Dilemma tournament, exploring the evolution of cooperation through game theory This project is based on Robert Axelrod's influential research paper, 'Effective Choice in the Prisoner's Dilemma', which made significant contributions to the fields of game theory, political science, and evolutionary biology.",
    image: "/OpticalPhysicsSimulationThumbnail.png",
    clickedImage: "/OpticalPhysicsSimulation.png",
    technologies: ["Javascript", "HTML", "CSS"],
    liveUrl: "https://lugawplain.github.io/Optical-Physics-Simulation/",
    githubUrl: "https://github.com/LugawPlain/Optical-Physics-Simulation",
  },
];
