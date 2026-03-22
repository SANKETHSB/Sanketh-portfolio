import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const stats = [
  { value: 15, suffix: '+', label: 'Projects Shipped' },
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 20, suffix: '+', label: 'Technologies' },
  { value: 99.9, suffix: '%', label: 'Uptime SLA', decimals: 1 },
];

function AnimatedNumber({ value, suffix, decimals = 0 }: { value: number; suffix: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [displayed, setDisplayed] = useState('0');

  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const rounded = useTransform(spring, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, value, spring]);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v) => setDisplayed(v));
    return unsubscribe;
  }, [rounded]);

  return (
    <span ref={ref} className="text-primary glow-text text-4xl md:text-5xl font-bold font-display">
      {displayed}{suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="section-spacing px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: i * 0.15 }}
              className="tactile-card p-6 md:p-8 text-center group"
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
              <p className="font-display text-[10px] tracking-[0.2em] text-muted-foreground uppercase mt-3 group-hover:text-primary transition-colors duration-300">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
