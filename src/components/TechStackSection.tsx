import { motion } from 'framer-motion';

const techItems = [
  { name: 'JavaScript', category: 'Language' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Python', category: 'Language' },
  { name: 'C++', category: 'Language' },
  { name: 'Java', category: 'Language' },
  { name: 'React', category: 'Framework' },
  { name: 'Next.js', category: 'Framework' },
  { name: 'Node.js', category: 'Framework' },
  { name: 'TailwindCSS', category: 'Framework' },
  { name: 'TensorFlow', category: 'AI / ML' },
  { name: 'NumPy', category: 'AI / ML' },
  { name: 'Pandas', category: 'AI / ML' },
  { name: 'Matplotlib', category: 'AI / ML' },
  { name: 'MLflow', category: 'AI / ML' },
  { name: 'Plotly', category: 'AI / ML' },
  { name: 'LangChain', category: 'AI / ML' },
  { name: 'OpenAI', category: 'AI / ML' },
  { name: 'Docker', category: 'Infra' },
  { name: 'Firebase', category: 'Infra' },
  { name: 'Vercel', category: 'Infra' },
  { name: 'Heroku', category: 'Infra' },
  { name: 'MongoDB', category: 'Data' },
  { name: 'PostgreSQL', category: 'Data' },
  { name: 'MySQL', category: 'Data' },
  { name: 'SQLite', category: 'Data' },
  { name: 'MS SQL', category: 'Data' },
  { name: 'Git', category: 'Tool' },
  { name: 'GitHub', category: 'Tool' },
  { name: 'Figma', category: 'Tool' },
  { name: 'Postman', category: 'Tool' },
  { name: 'Power BI', category: 'Tool' },
];

const categoryColors: Record<string, string> = {
  'Language': 'hsla(185, 60%, 55%, 0.15)',
  'Framework': 'hsla(200, 70%, 55%, 0.15)',
  'AI / ML': 'hsla(160, 60%, 50%, 0.15)',
  'Infra': 'hsla(270, 50%, 55%, 0.15)',
  'Data': 'hsla(30, 70%, 55%, 0.15)',
  'Tool': 'hsla(340, 50%, 55%, 0.15)',
};

const categoryBorders: Record<string, string> = {
  'Language': 'hsla(185, 60%, 55%, 0.3)',
  'Framework': 'hsla(200, 70%, 55%, 0.3)',
  'AI / ML': 'hsla(160, 60%, 50%, 0.3)',
  'Infra': 'hsla(270, 50%, 55%, 0.3)',
  'Data': 'hsla(30, 70%, 55%, 0.3)',
  'Tool': 'hsla(340, 50%, 55%, 0.3)',
};

const transition = { type: "spring" as const, stiffness: 100, damping: 20, mass: 1 };

// Split into two rows for the marquee
const row1 = techItems.slice(0, Math.ceil(techItems.length / 2));
const row2 = techItems.slice(Math.ceil(techItems.length / 2));

function FloatingCard({ item, index }: { item: typeof techItems[0]; index: number }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.1,
        y: -8,
        rotateZ: Math.random() > 0.5 ? 3 : -3,
      }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
      className="flex-shrink-0 px-5 py-3 rounded-xl cursor-default relative overflow-hidden group"
      style={{
        background: categoryColors[item.category],
        border: `1px solid ${categoryBorders[item.category]}`,
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${categoryColors[item.category]}, transparent 70%)`,
        }}
      />
      <div className="relative z-10 flex items-center gap-2">
        <span className="font-display text-xs tracking-wider text-foreground font-medium">
          {item.name}
        </span>
        <span className="font-display text-[9px] tracking-wider text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {item.category}
        </span>
      </div>
    </motion.div>
  );
}

function MarqueeRow({ items, direction = 'left', speed = 30 }: { items: typeof techItems; direction?: 'left' | 'right'; speed?: number }) {
  // Double the items for seamless loop
  const doubled = [...items, ...items];
  const duration = items.length * speed / 10;

  return (
    <div className="relative overflow-hidden py-3">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10" style={{ background: 'linear-gradient(90deg, hsl(var(--background)), transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10" style={{ background: 'linear-gradient(270deg, hsl(var(--background)), transparent)' }} />

      <motion.div
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration,
            ease: "linear",
          },
        }}
        className="flex gap-4"
      >
        {doubled.map((item, i) => (
          <FloatingCard key={`${item.name}-${i}`} item={item} index={i} />
        ))}
      </motion.div>
    </div>
  );
}

export default function TechStackSection() {
  return (
    <section id="stack" className="section-spacing px-6 md:px-12">
      <div className="max-w-6xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={transition}
        >
          <span className="font-display text-xs tracking-[0.3em] text-primary uppercase">
            // SYSTEM ARCHITECTURE
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter text-foreground mt-4">
            The Stack
          </h2>
          <p className="font-body text-muted-foreground mt-3 max-w-lg">
            Production-grade tools and frameworks. Hover to inspect each module.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-4"
      >
        <MarqueeRow items={row1} direction="left" speed={35} />
        <MarqueeRow items={row2} direction="right" speed={40} />
      </motion.div>
    </section>
  );
}
