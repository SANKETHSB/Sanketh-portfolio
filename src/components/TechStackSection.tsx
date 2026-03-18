import { motion } from 'framer-motion';
import { useState } from 'react';

const stackCategories = [
  {
    label: 'LANGUAGES',
    icon: '⟨/⟩',
    items: ['JavaScript', 'TypeScript', 'Python', 'C++', 'C#', 'Java', 'PHP'],
  },
  {
    label: 'FRAMEWORKS',
    icon: '⚙',
    items: ['React', 'Next.js', 'Angular', 'Vue.js', 'Node.js', 'Flask', 'TailwindCSS'],
  },
  {
    label: 'AI / ML',
    icon: '🧠',
    items: ['TensorFlow', 'NumPy', 'Pandas', 'Matplotlib', 'MLflow', 'Plotly'],
  },
  {
    label: 'INFRASTRUCTURE',
    icon: '☁',
    items: ['AWS', 'Docker', 'Firebase', 'Vercel', 'Heroku', 'Oracle'],
  },
  {
    label: 'DATA',
    icon: '⛁',
    items: ['MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Neo4j', 'MS SQL'],
  },
  {
    label: 'TOOLS',
    icon: '⚒',
    items: ['Git', 'GitHub', 'Figma', 'Postman', 'Power BI', 'Unity'],
  },
];

const transition = { type: "spring" as const, stiffness: 100, damping: 20, mass: 1 };

function TechBlade({ item, index }: { item: string; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        x: hovered ? 12 : 0,
        rotateY: hovered ? 5 : 0,
      }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 25 }}
      className="relative overflow-hidden rounded-lg cursor-default group"
      style={{
        background: hovered
          ? 'linear-gradient(135deg, hsla(185, 60%, 55%, 0.12) 0%, hsla(185, 60%, 55%, 0.02) 100%)'
          : 'linear-gradient(135deg, hsla(220, 20%, 95%, 0.04) 0%, hsla(220, 20%, 95%, 0) 100%)',
        border: `1px solid ${hovered ? 'hsla(185, 60%, 55%, 0.35)' : 'hsla(220, 20%, 95%, 0.08)'}`,
        boxShadow: hovered
          ? '0 0 25px -5px hsla(185, 60%, 55%, 0.2), inset 0 1px 1px hsla(220, 20%, 95%, 0.1)'
          : '0 2px 8px -2px rgba(0,0,0,0.3)',
        padding: '10px 16px',
        transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
        perspective: '800px',
      }}
    >
      {/* Glow sweep */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: hovered ? '200%' : '-100%' }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, hsla(185, 60%, 55%, 0.08), transparent)',
          width: '50%',
        }}
      />

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ scale: hovered ? 1 : 0.6, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
          <span className="font-display text-xs tracking-wider text-foreground">
            {item}
          </span>
        </div>
        <motion.span
          animate={{ opacity: hovered ? 0.5 : 0, x: hovered ? 0 : -5 }}
          className="font-display text-[10px] text-primary"
        >
          ↗
        </motion.span>
      </div>
    </motion.div>
  );
}

function StackCard({ category, catIndex }: { category: typeof stackCategories[0]; catIndex: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ...transition, delay: catIndex * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden rounded-xl"
      style={{
        background: 'linear-gradient(135deg, hsla(220, 20%, 95%, 0.05) 0%, hsla(220, 20%, 95%, 0) 100%)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${hovered ? 'hsla(185, 60%, 55%, 0.25)' : 'hsla(220, 20%, 95%, 0.1)'}`,
        boxShadow: hovered
          ? '0 20px 60px -15px rgba(0,0,0,0.6), 0 0 40px -10px hsla(185, 60%, 55%, 0.1), inset 0 1px 1px hsla(220, 20%, 95%, 0.15)'
          : '0 4px 24px -1px rgba(0,0,0,0.5), inset 0 1px 1px hsla(220, 20%, 95%, 0.1)',
        transition: 'border-color 0.4s, box-shadow 0.4s, transform 0.4s',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        padding: '28px',
      }}
    >
      {/* Top glow bar */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute top-0 left-0 right-0 h-px origin-left"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(185, 60%, 55%), transparent)' }}
      />

      <div className="flex items-center gap-3 mb-6">
        <span className="text-lg">{category.icon}</span>
        <h3 className="font-display text-[10px] tracking-[0.3em] text-primary">
          {category.label}
        </h3>
        <div className="flex-1 h-px bg-border/50" />
        <span className="font-display text-[10px] text-muted-foreground">
          {category.items.length}
        </span>
      </div>

      <div className="space-y-1.5">
        {category.items.map((item, i) => (
          <TechBlade key={item} item={item} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

export default function TechStackSection() {
  return (
    <section id="stack" className="section-spacing px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={transition}
          className="mb-16"
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stackCategories.map((cat, catIndex) => (
            <StackCard key={cat.label} category={cat} catIndex={catIndex} />
          ))}
        </div>
      </div>
    </section>
  );
}
