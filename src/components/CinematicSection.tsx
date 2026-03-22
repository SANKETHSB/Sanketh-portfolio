import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  parallaxStrength?: number;
  scaleRange?: [number, number];
  rotateRange?: [number, number];
  id?: string;
}

export default function CinematicSection({
  children,
  className = '',
  parallaxStrength = 80,
  scaleRange = [0.92, 1],
  rotateRange = [1.5, 0],
  id,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [parallaxStrength, -parallaxStrength]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [scaleRange[0], scaleRange[1], scaleRange[1], scaleRange[0]]);
  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [rotateRange[0], rotateRange[1], rotateRange[1], -rotateRange[0]]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.3]);

  return (
    <div ref={ref} id={id} className="relative" style={{ perspective: '1200px' }}>
      <motion.div
        style={{ y, scale, rotateX, opacity }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}
