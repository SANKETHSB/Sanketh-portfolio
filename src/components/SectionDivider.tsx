import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const width = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '100%', '0%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <div ref={ref} className="flex items-center justify-center py-12">
      <motion.div
        style={{ width, opacity }}
        className="h-px bg-gradient-to-r from-transparent via-primary to-transparent max-w-3xl"
      />
    </div>
  );
}
