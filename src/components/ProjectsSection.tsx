import { motion } from 'framer-motion';
import { useState } from 'react';

const projects = [
  {
    title: 'AI Mock Interview',
    category: 'ARTIFICIAL INTELLIGENCE',
    description: 'Real-time AI-powered interview simulator with natural language processing, adaptive questioning, and performance analytics.',
    tech: ['Python', 'TensorFlow', 'React', 'Node.js'],
    status: 'DEPLOYED',
    accent: '--primary',
  },
  {
    title: 'AI Website Builder',
    category: 'GENERATIVE AI',
    description: 'Build your own website of choice based on input — an intelligent website builder that generates responsive sites from natural language prompts.',
    tech: ['React', 'Next.js', 'OpenAI', 'TailwindCSS'],
    status: 'IN PRODUCTION',
    accent: '--primary',
  },
  {
    title: 'Traffic Congestion System',
    category: 'AI / COMPUTER VISION',
    description: 'Real-time traffic monitoring and congestion prediction platform using computer vision, IoT sensors, and predictive ML models.',
    tech: ['Python', 'TensorFlow', 'OpenCV', 'AWS'],
    status: 'ACTIVE',
    accent: '--primary',
  },
  {
    title: 'AI Chatbot Engine',
    category: 'CONVERSATIONAL AI',
    description: 'Multi-modal chatbot framework supporting text, voice, and visual inputs with enterprise-grade scalability.',
    tech: ['Python', 'Flask', 'TensorFlow', 'MongoDB'],
    status: 'SHIPPED',
    accent: '--primary',
  },
];

const transition = { type: "spring" as const, stiffness: 100, damping: 20, mass: 1 };

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: -8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ ...transition, delay: index * 0.15 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="tactile-card-hover p-8 group cursor-pointer relative overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Animated gradient border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
        style={{
          background: 'linear-gradient(135deg, hsla(185, 60%, 55%, 0.08), transparent 50%, hsla(200, 70%, 65%, 0.05))',
        }}
      />

      {/* Animated corner accent */}
      <motion.div
        className="absolute top-0 right-0 w-20 h-20 pointer-events-none"
        animate={{
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1 : 0.5,
        }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'radial-gradient(circle at 100% 0%, hsl(var(--primary)) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Shimmer sweep on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          x: isHovered ? ['0%', '200%'] : '-100%',
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        style={{
          background: 'linear-gradient(90deg, transparent, hsla(185, 60%, 55%, 0.06), transparent)',
          width: '50%',
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <motion.span
            animate={{ letterSpacing: isHovered ? '0.25em' : '0.2em' }}
            className="font-display text-[10px] tracking-[0.2em] text-primary uppercase"
          >
            {project.category}
          </motion.span>
          <span className="font-display text-[10px] tracking-wider text-muted-foreground flex items-center gap-1.5">
            <motion.span
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
            {project.status}
          </span>
        </div>

        <motion.h3
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="font-display text-2xl font-bold tracking-tight text-foreground mb-3 group-hover:text-primary transition-colors duration-300"
        >
          {project.title}
        </motion.h3>

        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((t, ti) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + ti * 0.05 }}
              whileHover={{ scale: 1.1, y: -2 }}
              className="font-display text-[10px] tracking-wider px-3 py-1 rounded-md bg-secondary text-secondary-foreground cursor-default"
            >
              {t}
            </motion.span>
          ))}
        </div>

        {/* Animated arrow on hover */}
        <motion.div
          className="absolute bottom-8 right-8 text-primary"
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : -10,
          }}
          transition={{ duration: 0.3 }}
        >
          <span className="font-display text-lg">→</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-spacing px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={transition}
          className="mb-16"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ...transition, delay: 0.1 }}
            className="font-display text-xs tracking-[0.3em] text-primary uppercase"
          >
            // DEPLOYED SYSTEMS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...transition, delay: 0.2 }}
            className="font-display text-4xl md:text-6xl font-bold tracking-tighter text-foreground mt-4"
          >
            The <span className="gradient-text">Work</span>
          </motion.h2>
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
