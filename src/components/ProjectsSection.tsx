import { motion } from 'framer-motion';

const projects = [
  {
    title: 'AI Mock Interview',
    category: 'ARTIFICIAL INTELLIGENCE',
    description: 'Real-time AI-powered interview simulator with natural language processing, adaptive questioning, and performance analytics.',
    tech: ['Python', 'TensorFlow', 'React', 'Node.js'],
    status: 'DEPLOYED',
  },
  {
    title: 'RAG & LLM Platform',
    category: 'GENERATIVE AI',
    description: 'Retrieval-Augmented Generation system with custom LLM fine-tuning, vector search, and context-aware response generation at scale.',
    tech: ['Python', 'LangChain', 'OpenAI', 'Pinecone'],
    status: 'IN PRODUCTION',
  },
  {
    title: 'Traffic Congestion System',
    category: 'AI / COMPUTER VISION',
    description: 'Real-time traffic monitoring and congestion prediction platform using computer vision, IoT sensors, and predictive ML models.',
    tech: ['Python', 'TensorFlow', 'OpenCV', 'AWS'],
    status: 'ACTIVE',
  },
  {
    title: 'AI Chatbot Engine',
    category: 'CONVERSATIONAL AI',
    description: 'Multi-modal chatbot framework supporting text, voice, and visual inputs with enterprise-grade scalability.',
    tech: ['Python', 'Flask', 'TensorFlow', 'MongoDB'],
    status: 'SHIPPED',
  },
];

const transition = { type: "spring" as const, stiffness: 100, damping: 20, mass: 1 };

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
          <span className="font-display text-xs tracking-[0.3em] text-primary uppercase">
            // DEPLOYED SYSTEMS
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter text-foreground mt-4">
            The Work
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ ...transition, delay: i * 0.1 }}
              className="tactile-card-hover p-8 group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-[10px] tracking-[0.2em] text-primary uppercase">
                  {project.category}
                </span>
                <span className="font-display text-[10px] tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
                  {project.status}
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold tracking-tight text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {project.title}
              </h3>

              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-display text-[10px] tracking-wider px-3 py-1 rounded-md bg-secondary text-secondary-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
