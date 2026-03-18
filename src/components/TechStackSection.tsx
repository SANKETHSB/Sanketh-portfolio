import { motion } from 'framer-motion';

const stackCategories = [
  {
    label: 'LANGUAGES',
    items: ['JavaScript', 'TypeScript', 'Python', 'C++', 'C#', 'Java', 'PHP'],
  },
  {
    label: 'FRAMEWORKS',
    items: ['React', 'Next.js', 'Angular', 'Vue.js', 'Node.js', 'Flask', 'TailwindCSS'],
  },
  {
    label: 'AI / ML',
    items: ['TensorFlow', 'NumPy', 'Pandas', 'Matplotlib', 'MLflow', 'Plotly'],
  },
  {
    label: 'INFRASTRUCTURE',
    items: ['AWS', 'Docker', 'Firebase', 'Vercel', 'Heroku', 'Oracle'],
  },
  {
    label: 'DATA',
    items: ['MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Neo4j', 'MS SQL'],
  },
  {
    label: 'TOOLS',
    items: ['Git', 'GitHub', 'Figma', 'Postman', 'Power BI', 'Unity'],
  },
];

const transition = { type: "spring" as const, stiffness: 100, damping: 20, mass: 1 };

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
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stackCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...transition, delay: catIndex * 0.08 }}
              className="tactile-card p-6"
            >
              <h3 className="font-display text-[10px] tracking-[0.3em] text-primary mb-5">
                {cat.label}
              </h3>
              <div className="space-y-2">
                {cat.items.map((item) => (
                  <div key={item} className="tech-blade">
                    <span className="font-display text-xs tracking-wider text-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
