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

const categoryGlows: Record<string, string> = {
  'Language': '0 0 20px hsla(185, 60%, 55%, 0.3)',
  'Framework': '0 0 20px hsla(200, 70%, 55%, 0.3)',
  'AI / ML': '0 0 20px hsla(160, 60%, 50%, 0.3)',
  'Infra': '0 0 20px hsla(270, 50%, 55%, 0.3)',
  'Data': '0 0 20px hsla(30, 70%, 55%, 0.3)',
  'Tool': '0 0 20px hsla(340, 50%, 55%, 0.3)',
};

const transition = { type: "spring" as const, stiffness: 100, damping: 20, mass: 1 };

// Split into 4 rows
const chunkSize = Math.ceil(techItems.length / 4);
const row1 = techItems.slice(0, chunkSize);
const row2 = techItems.slice(chunkSize, chunkSize * 2);
const row3 = techItems.slice(chunkSize * 2, chunkSize * 3);
const row4 = techItems.slice(chunkSize * 3);

function FloatingCard({ item }: { item: typeof techItems[0] }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.15,
        y: -10,
        rotateZ: Math.random() > 0.5 ? 4 : -4,
      }}
      transition={{ type: "spring" as const, stiffness: 400, damping: 18 }}
      className="flex-shrink-0 px-5 py-3 rounded-xl cursor-default relative overflow-hidden group"
      style={{
        background: categoryColors[item.category],
        border: `1px solid ${categoryBorders[item.category]}`,
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Shimmer sweep on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, hsla(0,0%,100%,0.15) 45%, hsla(0,0%,100%,0.05) 55%, transparent 60%)',
          transition: 'opacity 0.3s',
        }}
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
        style={{ boxShadow: categoryGlows[item.category] }}
      />
      <div className="relative z-10 flex items-center gap-2">
        <motion.span
          className="w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: categoryBorders[item.category].replace('0.3', '1') }}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="font-display text-xs tracking-wider text-foreground font-medium">
          {item.name}
        </span>
      </div>
    </motion.div>
  );
}

function MarqueeRow({ items, direction = 'left', speed = 15 }: { items: typeof techItems; direction?: 'left' | 'right'; speed?: number }) {
  const doubled = [...items, ...items, ...items];
  const duration = items.length * speed / 10;

  return (
    <div className="relative overflow-hidden py-2">
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10" style={{ background: 'linear-gradient(90deg, hsl(var(--background)), transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10" style={{ background: 'linear-gradient(270deg, hsl(var(--background)), transparent)' }} />

      <motion.div
        animate={{
          x: direction === 'left' ? ['0%', '-33.33%'] : ['-33.33%', '0%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration,
            ease: "linear",
          },
        }}
        className="flex gap-3"
      >
        {doubled.map((item, i) => (
          <FloatingCard key={`${item.name}-${i}`} item={item} />
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
        className="space-y-2"
      >
        <MarqueeRow items={row1} direction="left" speed={18} />
        <MarqueeRow items={row2} direction="right" speed={20} />
        <MarqueeRow items={row3} direction="left" speed={16} />
        <MarqueeRow items={row4} direction="right" speed={22} />
      </motion.div>
    </section>
  );
}
