import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";

export default function App() {
  const [dark, setDark] = useState(true);
  const [entered, setEntered] = useState(false);
  const [init, setInit] = useState(false);
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  // 🔥 PARTICLES INIT
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);
        useEffect(() => {
        if (!entered) return;

        const handleMouseMove = (e) => {
          if (!scrollRef.current) return;

          const { clientHeight } = scrollRef.current;
          const y = e.clientY;

          const center = clientHeight / 2;

          // dead zone (prevents jitter)
          if (Math.abs(y - center) < 40) return;

          const scrollSpeed = (y - center) / 20;

          scrollRef.current.scrollBy({
            top: scrollSpeed,
            behavior: "auto",
          });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
        };
      }, [entered]);
   const experiences = [
  {
    title: "Texas A&M University — Student Full-stack Developer",
    subtitle: "Dept. of Kinesiology & Sports Management | College Station, TX",
    duration: "Sep 2025 – Present",
    logo: "src/logos/tamu.png",
    details: [
      "Contributing to sspain.ai, a sports analytics platform serving NBA, WNBA, and Dallas Mavericks.",
      "Developing responsive UIs using React, Next.js, Tailwind, and ShadUI.",
      "Integrating backend models via FastAPI, RStudio, rpy2 with PostgreSQL.",
      "Working across full SDLC using Git, Jira, and pytest.",
      "Implemented role-based authentication and sponsorship prediction using statistical modeling.",
    ],
  },
  {
    title: "Infosys — Digital Specialist Engineer",
    subtitle: "Hyderabad, India",
    duration: "Apr 2022 – Aug 2024",
    logo: "src/logos/infy.png",
    details: [
      "Supported a UK-based telecom client in cloud migration using microservices architecture.",
      "Performed Linux operations and server troubleshooting within SDLC workflows.",
      "Enhanced British Telecom’s Self-Service Portal UI using Angular and REST APIs.",
      "Improved operational efficiency by 25% through better alert visualization.",
      "Worked with Jenkins CI/CD for deployment automation.",
    ],
  },
  {
    title: "Cognizant — Programmer Analyst Trainee",
    subtitle: "Hyderabad, India",
    duration: "Mar 2021 – Mar 2022",
    logo: "src/logos/cts.png",
    details: [
      "Monitored large-scale telecom networks for a US-based client.",
      "Developed Python-based diagnostic scripts for network analysis.",
      "Used Wireshark for anomaly detection and packet inspection.",
      "Improved system reliability and recovery efficiency by 30%.",
    ],
  },
  {
    title: "DRDL (DRDO) — Software Engineer Intern",
    subtitle: "Independent Verification & Validation Lab | Hyderabad, India",
    duration: "May 2019 – Sep 2020",
    logo: "src/logos/drdl.png",
    details: [
      "Built a UDP-based satellite communication simulation using C++ and OMNeT++.",
      "Simulated real-time ground-to-satellite communication systems.",
      "Implemented jitter mitigation, latency correction, and adaptive buffering.",
      "Designed multi-threaded message handling for deterministic data transfer.",
    ],
  },
];
  return (
    <div
      className={`relative h-screen w-full overflow-hidden ${
        dark ? "bg-gray-950 text-white" : "bg-white text-black"
      }`}
    >
      {/* 🌌 PARTICLES (ALWAYS ON) */}
      {init && (
        <Particles
          id="tsparticles"
          options={{
            fullScreen: { enable: false },
            particles: {
              number: { value: 120, density: { enable: true, area: 800 } },
              color: { value: "#ffffff" },
              size: { value: { min: 1, max: 3 } },
              move: { enable: true, speed: 1 },
              links: {
                enable: true,
                distance: 120,
                color: "#38bdf8",
                opacity: 0.4,
              },
            },
          }}
          className="absolute inset-0 w-full h-full z-0"
        />
      )}

      {/* 🔥 INTRO SCREEN */}
      <motion.div
        onClick={() => setEntered(true)}
        initial={{ opacity: 1, scale: 1 }}
        animate={
  entered
    ? { opacity: 0, scale: 0.98, filter: "blur(4px)" }
    : { opacity: 1, scale: 1, filter: "blur(0px)" }
}
        transition={{ duration: 0.5, ease: "easeOut" }}
       className={`absolute inset-0 flex items-center justify-center z-10 cursor-pointer ${
  entered ? "pointer-events-none" : ""
}`}
      >
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 2.2,
              ease: [0.25, 0.8, 0.25, 1],
              delay: 0.2,
            }}
            className="text-6xl md:text-7xl font-bold mb-6"
          >
            Hi, I'm{" "}
            <span className="text-blue-400">Phani</span>{" "}
            <motion.span
              animate={{ rotate: [0, 15, -8, 15, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="inline-block"
            >
              👋
            </motion.span>
          </motion.h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-6">
            <TypeAnimation
              sequence={[
                "Software Engineer ⚡",
                2000,
                "Distributed Systems Engineer 🌐",
                2000,
                "Systems & Compilers Enthusiast 🧠",
                2000,
                "Full Stack Developer 💻",
                2000,
                "Computer Networks & OS Engineer ⚙️",
                2000,
              ]}
              speed={50}
              repeat={Infinity}
            />
          </p>

          <p className="text-gray-500 animate-pulse">
            Click to know more about me ↓
          </p>
        </div>
      </motion.div>

      {/* 🔥 PORTFOLIO (SLIDES UP) */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: entered ? "0%" : "100%" }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        ref={scrollRef}
        className="absolute inset-0 z-20 overflow-y-auto"
      >
        {/* NAVBAR */}
        <nav className="flex justify-between items-center px-8 py-4 backdrop-blur-md sticky top-0 z-30">
          <h1 className="text-xl text-blue-400 font-bold">Welcome to Phani's World!</h1>
          <a
  href="/resume.pdf"
  download
  className="px-4 py-2 border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400 hover:text-black transition duration-300"
>
  Download Resume
</a>
        </nav>

        {/* ABOUT */}
        <section className="max-w-5xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-10">

  {/* PHOTO */}
  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-blue-400 shadow-[0_0_30px_rgba(56,189,248,0.4)]">
    <img
      src="src/profile.png"
      className="w-full h-full object-cover"
    />
  </div>

  {/* TEXT */}
  <div>
    <h2 className="text-3xl text-blue-400 font-semibold mb-4">Myself Phani Jyothi Kurada</h2>
    <p className="text-white-400 max-w-xl">
       Master’s student in Computer Science at Texas A&M University with ~ 4 years of industry experience at Infosys and Cognizant.
  Skilled in full-stack development, with research interests in Computer Networks and MLIR compilers.
  Proven experience in building scalable applications, collaborating with clients, and delivering end-to-end software solutions.
  Passionate about clean code, system design, and high-quality engineering practices.
    </p>
  </div>

</section>
 

        {/* EXPERIENCE */}
        <section className="px-6 py-16">
  <h2 className="text-3xl text-center text-blue-400 mb-10">
    Experience(s)
  </h2>

  <div className="max-w-4xl mx-auto space-y-6">
    {experiences.map((exp, i) => {
      const isActive = activeIndex === i;

      return (
        <motion.div
          key={i}
          onClick={() =>
            setActiveIndex(isActive ? null : i)
          }
          initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 cursor-pointer transition duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(56,189,248,0.4)]"
        >
          {/* HEADER */}
          <div className="flex justify-between items-start gap-4">

  {/* LEFT SIDE */}
  <div className="flex gap-4 items-start">

    {/* LOGO */}
    <img
      src={exp.logo}
      alt="logo"
      className="w-12 h-12 object-contain rounded-md bg-white p-1 mt-1"
    />

    {/* TEXT BLOCK */}
    <div className="flex flex-col">
      <h3 className="text-lg font-semibold leading-tight">
        {exp.title}
      </h3>
      <p className="text-sm text-gray-400">
        {exp.subtitle}
      </p>
    </div>

  </div>

  {/* RIGHT SIDE */}
  <div className="flex flex-col items-end">
    <p className="text-sm text-blue-400 whitespace-nowrap">
      {exp.duration}
    </p>
    <span className="text-xl">
      {isActive ? "−" : "+"}
    </span>
  </div>

</div>
          {/* DETAILS */}
          <motion.div
            initial={false}
            animate={{
              height: isActive ? "auto" : 0,
              opacity: isActive ? 1 : 0,
            }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <ul className="mt-4 text-gray-300 list-disc pl-5 space-y-2">
              {exp.details.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      );
    })}
  </div>
</section>
{/* PROJECTS */}

<section className="px-6 py-20 relative z-10">
  <h2 className="text-3xl text-center text-blue-400 mb-12">
    Project(s)
  </h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

    {[
      {
        title: "MLIR Playground",
        desc: "Interactive compiler platform to visualize MLIR transformations and pass pipelines in real-time.",
        tech: ["C++", "LLVM/MLIR", "React", "Docker"],
        link: "https://github.com/phanijyothi11-tamu/mlir",
      },
      {
        title: "Tiny SNS",
        desc: "Distributed social network with gRPC, fault tolerance, and real-time sync using RabbitMQ.",
        tech: ["C++", "gRPC", "Docker"],
        link: "https://github.com/phanijyothi11-tamu/tiny-sns",
      },
      {
        title: "Mini OS Kernel",
        desc: "Built x86 OS kernel with paging, scheduling, memory management and file system.",
        tech: ["C++", "x86", "OS"],
        link: "https://github.com/phanijyothi11-tamu/mini-os-kernel",
      },
      {
        title: "Matrix m-Height Optimization",
        desc: "Designed algorithms to compute generator matrices minimizing m-height.",
        tech: ["C++", "Algorithms"],
        link: "https://github.com/phanijyothi11-tamu/aoa-matrix-optimization",
      },
      {
        title: "NLP Sentiment Analysis",
        desc: "Context-aware sentiment analysis using NewsMTSC and MAD_TSC datasets.",
        tech: ["Python", "NLP"],
        link: "https://github.com/phanijyothi11-tamu/catch-me-if-you-can",
      },
      {
        title: "Multimodal Calorie Prediction",
        desc: "Bi-LSTM + CNN model integrating multimodal data for calorie prediction.",
        tech: ["Python", "PyTorch"],
        link: "https://github.com/phanijyothi11-tamu/multimodal-calorie-prediction",
      },
      {
        title: "LLM Prompt Evaluation",
        desc: "Designed and evaluated AI prompts using structured rubric criteria.",
        tech: ["LLMs", "Prompt Engineering"],
        link: "https://github.com/phanijyothi11-tamu/LMA-prompt-filter",
      },
      {
        title: "Team Formation",
        desc: "Rails app to create optimized student teams based on constraints.",
        tech: ["Ruby on Rails"],
        link: "https://github.com/phanijyothi11-tamu/team-formation",
      },
      {
        title: "Crypto Tracker",
        desc: "Live crypto dashboard with Next.js and Docusaurus docs.",
        tech: ["Next.js", "React"],
        link: "https://github.com/phanijyothi11-tamu/crypto-tracker",
      },
    ].map((proj, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 0.4 }}
        className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:shadow-xl hover:shadow-blue-500/10 transition"
      >
        {/* HEADER */}
<div className="flex justify-between items-center mb-3">
  <h3 className="text-lg font-semibold text-white">
    {proj.title}
  </h3>

  <a href={proj.link} target="_blank">
    <FaGithub className="text-xl hover:text-blue-400 transition" />
  </a>
</div>

        {/* DESCRIPTION */}
        <p className="text-gray-400 text-sm mb-4">
          {proj.desc}
        </p>

        {/* TECH BADGES */}
        <div className="flex flex-wrap gap-2 mb-4">
          {proj.tech.map((t, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>

       
      </motion.div>
    ))}
  </div>
</section>
{/* SKILLS */}
<section className="px-6 py-20 bg-transparent relative z-10">
  <h2 className="text-3xl text-center text-blue-400 mb-12">
    Skill(s)
  </h2>

  <div className="max-w-6xl mx-auto space-y-12">

    {/* PROGRAMMING LANGUAGES */}
    <div>
      <h3 className="text-xl font-semibold mb-4 text-white">
        Programming Languages
      </h3>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-5">
        {[
          { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
          { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
          { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
          { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
          { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
          { name: "C#", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
          { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
          { name: "Ruby", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg" },
          { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
          { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
          { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
          { name: "Bash", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" },
        ].map((skill, i) => (
          <div key={i} className="skill-card flex flex-col items-center gap-1">
            <img src={skill.logo} alt={skill.name} className="w-8 h-8" />
            <span className="text-xs text-gray-300">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>

    {/* FRAMEWORKS */}
    <div>
      <h3 className="text-xl font-semibold mb-4 text-white">
        Frameworks & Web Technologies
      </h3>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-5">
        {[
          { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
          { name: "Angular", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
          { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
          { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
          { name: "Spring Boot", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
          { name: "Rails", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-original-wordmark.svg" },
          { name: ".NET", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg" },
          { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
          { name: "Tailwind", logo: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" },
        ].map((skill, i) => (
          <div key={i} className="skill-card flex flex-col items-center gap-1">
            <img src={skill.logo} alt={skill.name} className="w-8 h-8" />
            <span className="text-xs text-gray-300">{skill.name}</span>
          </div>
        ))}
      </div>
      </div>

    {/* TOOLS */}
    <div>
      <h3 className="text-xl font-semibold mb-4 text-white">Tools & Technologies</h3>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6">
        {[
          { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
          { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
          { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
          { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
          { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
          { name: "Jenkins", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
        ].map((skill, i) => (
          <div key={i} className="skill-card flex flex-col items-center gap-2">
            <img src={skill.logo} alt={skill.name} className="w-10 h-10" />
            <span className="text-sm text-gray-300">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>

    {/* SYSTEMS */}
    <div>
      <h3 className="text-xl font-semibold mb-4 text-white">Systems & Interests</h3>

      <div className="flex flex-wrap gap-3">
        {[
          "Operating Systems",
          "Distributed Systems",
          "Computer Networks",
          "Compilers (MLIR)",
          "System Design",
        ].map((skill, i) => (
          <span
            key={i}
            className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-sm text-blue-300 hover:bg-blue-500/20 transition"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>

  </div>
</section>
{/* EDUCATION */}
<section className="px-6 py-20 relative z-10">
  <h2 className="text-3xl text-center text-blue-400 mb-12">
    Education
  </h2>

  <div className="max-w-4xl mx-auto space-y-8">

    {[
      {
        school: "Texas A&M University",
        degree: "Masters in Computer Science",
        gpa: "CGPA: 3.8 / 4.0",
        duration: "Aug 2024 – May 2026",
        location: "College Station, TX",
        logo: "src/logos/tamu.png",
      },
      {
        school: "Jawaharlal Nehru Technological University",
        degree: "Bachelor of Technology in Computer Science & Engineering",
        gpa: "CGPA: 9.3 / 10",
        duration: "Aug 2016 – Sep 2020",
        location: "Hyderabad, India",
        logo: "src/logos/jntu.png",
      },
    ].map((edu, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: i * 0.2 }}
        whileHover={{ scale: 1.02 }}
        className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex justify-between items-start hover:shadow-lg hover:shadow-blue-500/10 transition"
      >
        {/* LEFT SIDE */}
        <div className="flex gap-4 items-start">
          <img
            src={edu.logo}
            alt="logo"
            className="w-12 h-12 object-contain bg-white rounded-md p-1"
          />

          <div>
            <h3 className="text-lg font-semibold text-white">
              {edu.school}
            </h3>

            <p className="text-sm text-gray-400">
              {edu.degree}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              {edu.location}
            </p>

            <p className="text-sm text-blue-400 mt-2">
              {edu.gpa}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="text-right text-sm text-gray-400">
          {edu.duration}
        </div>
      </motion.div>
    ))}

  </div>
</section>
<section className="px-6 py-20 text-center relative z-10">
  <h2 className="text-3xl text-blue-400 mb-10">
    Wanna Reach Out?
  </h2>

  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="max-w-xxl mx-auto bg-gray-850 border border-gray-900 rounded-xl p-8 hover:shadow-lg hover:shadow-blue-500/10 transition"
  >
    {/* ✨ MESSAGE */}
    <p className="text-gray-400 mb-8">
      Made it to the end? That means you're interested 🙂  
      I’d love to connect — whether it's for opportunities, collaborations, or meaningful conversations.
    </p>

    <div className="flex flex-wrap justify-center gap-6">

  {/* EMAIL */}
  <a
    href="mailto:phanijyothi11@tamu.edu"
    className="flex items-center gap-3 px-5 py-3 bg-gray-900 rounded-xl hover:scale-105 transition"
  >
    <FaEnvelope className="text-xl text-blue-400" />
    <span>phanijyothi11@tamu.edu</span>
  </a>

  {/* PHONE */}
  <a
    href="tel:+19795759989"
    className="flex items-center gap-3 px-5 py-3 bg-gray-900 rounded-xl hover:scale-105 transition"
  >
    <FaPhone className="text-xl text-green-400" />
    <span>+1 979-575-9989</span>
  </a>

  {/* LINKEDIN */}
  <a
    href="https://www.linkedin.com/in/phani-jyothi-kurada-663b33296/"
    target="_blank"
    className="flex items-center gap-3 px-5 py-3 bg-gray-900 rounded-xl hover:scale-105 transition"
  >
    <FaLinkedin className="text-xl text-blue-500" />
    <span>LinkedIn</span>
  </a>

  {/* GITHUB */}
  <a
    href="https://github.com/phanijyothi11-tamu"
    target="_blank"
    className="flex items-center gap-3 px-5 py-3 bg-gray-900 rounded-xl hover:scale-105 transition"
  >
    <FaGithub className="text-xl text-white" />
    <span>GitHub</span>
  </a>

</div>
    
        
  </motion.div>
</section>
<footer className="text-center py-6 border-t border-gray-800 text-gray-500 text-sm">
  © {new Date().getFullYear()} Phani Jyothi Kurada • Built with ❤️ using React & Tailwind
</footer>
      </motion.div>
      
    </div>
  );
}