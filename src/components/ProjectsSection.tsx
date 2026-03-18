import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';

const projects = [
  {
    title: 'AI Mock Interview',
    category: 'ARTIFICIAL INTELLIGENCE',
    description: 'Real-time AI-powered interview simulator with natural language processing, adaptive questioning, and performance analytics.',
    tech: ['Python', 'TensorFlow', 'React', 'Node.js'],
    status: 'DEPLOYED',
    number: '01',
  },
  {
    title: 'AI Website Builder',
    category: 'GENERATIVE AI',
    description: 'Build your own website of choice based on input — an intelligent website builder that generates responsive sites from natural language prompts.',
    tech: ['React', 'Next.js', 'OpenAI', 'TailwindCSS'],
    status: 'IN PRODUCTION',
    number: '02',
  },
  {
    title: 'Traffic Congestion System',
    category: 'AI / COMPUTER VISION',
    description: 'Real-time traffic monitoring and congestion prediction platform using computer vision, IoT sensors, and predictive ML models.',
    tech: ['Python', 'TensorFlow', 'OpenCV', 'AWS'],
    status: 'ACTIVE',
    number: '03',
  },
  {
    title: 'AI Chatbot Engine',
    category: 'CONVERSATIONAL AI',
    description: 'Multi-modal chatbot framework supporting text, voice, and visual inputs with enterprise-grade scalability.',
    tech: ['Python', 'Flask', 'TensorFlow', 'MongoDB'],
    status: 'SHIPPED',
    number: '04',
  },
];

const transition = { type: "spring" as const, stiffness: 100, damping: 20, mass: 1 };

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-150, 150], [5, -5]);
  const rotateY = useTransform(mouseX, [-150, 150], [-5, 5]);
  const glowX = useTransform(mouseX, [-150, 150], [0, 100]);
  const glowY = useTransform(mouseY, [-150, 150], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...transition, delay: index * 0.2 }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ y: -10 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      onMouseMove={handleMouseMove}
      className="tactile-card-hover p-8 group cursor-pointer relative overflow-hidden"
    >
      {/* Large ghost number */}
      <motion.span
        className="absolute -top-4 -right-2 font-display text-[120px] font-bold text-primary/[0.04] pointer-events-none select-none leading-none"
        animate={{
          opacity: isHovered ? 0.08 : 0.03,
          scale: isHovered ? 1.1 : 1,
          x: isHovered ? -8 : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        {project.number}
      </motion.span>

      {/* Cursor-following glow */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, hsla(185, 60%, 55%, 0.1), transparent 60%)`
          ),
        }}
      />

      {/* Animated border line */}
      <motion.div
        className="absolute top-0 left-0 h-[2px] bg-primary pointer-events-none"
        initial={{ width: '0%' }}
        animate={{ width: isHovered ? '100%' : '0%' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 h-[2px] bg-primary pointer-events-none"
        initial={{ width: '0%' }}
        animate={{ width: isHovered ? '100%' : '0%' }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      />

      {/* Shimmer sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          x: isHovered ? ['0%', '250%'] : '-100%',
        }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        style={{
          background: 'linear-gradient(105deg, transparent, hsla(185, 60%, 55%, 0.07), transparent)',
          width: '40%',
        }}
      />

      <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
        <div className="flex items-center justify-between mb-5">
          <motion.span
            animate={{ letterSpacing: isHovered ? '0.3em' : '0.2em' }}
            transition={{ duration: 0.4 }}
            className="font-display text-[10px] tracking-[0.2em] text-primary uppercase"
          >
            {project.category}
          </motion.span>
          <span className="font-display text-[10px] tracking-wider text-muted-foreground flex items-center gap-1.5">
            <motion.span
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 1, 0.4],
                boxShadow: [
                  '0 0 0px hsla(185, 60%, 55%, 0)',
                  '0 0 8px hsla(185, 60%, 55%, 0.6)',
                  '0 0 0px hsla(185, 60%, 55%, 0)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
            {project.status}
          </span>
        </div>

        <motion.h3
          animate={{ x: isHovered ? 6 : 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="font-display text-2xl font-bold tracking-tight text-foreground mb-3 group-hover:text-primary transition-colors duration-300"
        >
          {project.title}
        </motion.h3>

        <motion.p
          animate={{ opacity: isHovered ? 1 : 0.8 }}
          className="font-body text-sm text-muted-foreground leading-relaxed mb-6"
        >
          {project.description}
        </motion.p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((t, ti) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 + ti * 0.08 }}
              whileHover={{
                scale: 1.15,
                y: -3,
                backgroundColor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))',
              }}
              className="font-display text-[10px] tracking-wider px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground cursor-default transition-shadow"
              style={{ boxShadow: isHovered ? '0 2px 8px hsla(185, 60%, 55%, 0.1)' : 'none' }}
            >
              {t}
            </motion.span>
          ))}
        </div>

        {/* Animated arrow */}
        <motion.div
          className="absolute bottom-0 right-0 text-primary flex items-center gap-2"
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : -15,
          }}
          transition={{ duration: 0.4, type: 'spring' }}
        >
          <motion.span
            animate={{ x: isHovered ? [0, 5, 0] : 0 }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="font-display text-lg"
          >
            →
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-spacing px-6 md:px-12 relative overflow-hidden">
      {/* Section background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 6 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={transition}
          className="mb-16"
        >
          <motion.span
            initial={{ opacity: 0, x: -30, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ ...transition, delay: 0.1 }}
            className="font-display text-xs tracking-[0.3em] text-primary uppercase"
          >
            // DEPLOYED SYSTEMS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ ...transition, delay: 0.2 }}
            className="font-display text-4xl md:text-6xl font-bold tracking-tighter text-foreground mt-4"
          >
            The <span className="gradient-text">Work</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '60px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-[2px] bg-primary mt-4"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
