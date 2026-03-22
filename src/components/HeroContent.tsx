import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import profileImg from '@/assets/profile.jpeg';

const transition = { type: "spring" as const, stiffness: 100, damping: 20, mass: 1 };

const roles = [
  'Full-Stack Architect',
  'AI Engineer', 
  'Web3 Builder',
  'System Designer',
  'ML Specialist',
];

function TypingTerminal() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 40 : 80;

    if (!isDeleting && text === currentRole) {
      const pause = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(pause);
    }

    if (isDeleting && text === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timer = setTimeout(() => {
      setText(isDeleting ? currentRole.slice(0, text.length - 1) : currentRole.slice(0, text.length + 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIndex]);

  return (
    <span className="font-display text-xs tracking-[0.3em] text-muted-foreground uppercase">
      <span className="text-primary">{'> '}</span>
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity }}
        className="text-primary ml-0.5"
      >
        ▌
      </motion.span>
    </span>
  );
}

export default function HeroContent() {
  const [isHovered, setIsHovered] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.85]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.4 + 0.1,
  }));

  return (
    <div ref={heroRef} className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-24" style={{ perspective: '1000px' }}>
      {/* Animated grid background with parallax */}
      <motion.div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ y: bgY }}>
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'grid-drift 20s linear infinite',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 20%, hsl(var(--background)) 70%)',
          }}
        />

        {/* Floating particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-primary"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: p.opacity,
            }}
            animate={{
              y: [0, -60, -20, -80, 0],
              x: [0, 15, -10, 20, 0],
              opacity: [p.opacity, p.opacity * 2, p.opacity * 0.5, p.opacity * 1.5, p.opacity],
              scale: [1, 1.3, 0.8, 1.2, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      {/* Large centered profile photo with hover effects */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...transition, delay: 0.3 }}
        className="mb-10 relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          animate={{
            scale: isHovered ? 1.08 : 1,
            rotateY: isHovered ? 12 : 0,
            rotateX: isHovered ? -5 : 0,
          }}
          transition={{ type: "spring" as const, stiffness: 200, damping: 20 }}
          className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden profile-glow"
          style={{
            border: `3px solid ${isHovered ? 'hsl(185, 60%, 55%)' : 'hsla(185, 60%, 55%, 0.3)'}`,
            boxShadow: isHovered
              ? '0 0 60px -10px hsla(185, 60%, 55%, 0.5), 0 20px 60px -15px rgba(0,0,0,0.5)'
              : '0 0 30px -5px hsla(185, 60%, 55%, 0.2), 0 10px 30px -10px rgba(0,0,0,0.3)',
            transition: 'border-color 0.4s, box-shadow 0.4s',
            perspective: '800px',
          }}
        >
          <img
            src={profileImg}
            alt="Sanket Biradar"
            className="w-full h-full object-cover object-top transition-transform duration-500"
            style={{
              filter: isHovered ? 'contrast(1.1) brightness(1.1)' : 'contrast(1.05) brightness(1)',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }}
          />

          {/* Hover overlay glow */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 30% 30%, hsla(185, 60%, 55%, 0.15), transparent 70%)',
            }}
          />
        </motion.div>

        {/* Orbiting ring 1 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-12px] rounded-full border border-primary/20"
          style={{ borderStyle: 'dashed' }}
        />
        {/* Orbiting ring 2 */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-24px] rounded-full border border-primary/10"
        />
        {/* Hover pulse ring */}
        <motion.div
          animate={{
            scale: isHovered ? [1, 1.15, 1] : 1,
            opacity: isHovered ? [0.3, 0, 0.3] : 0,
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-[-4px] rounded-full border-2 border-primary pointer-events-none"
        />
        {/* Status dot */}
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-primary border-2 border-background"
        />
      </motion.div>

      {/* Name below photo */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition, delay: 0.7 }}
        className="font-display font-bold tracking-tighter leading-none mb-4"
        style={{ fontSize: 'clamp(2rem, 6vw, 7rem)', textWrap: 'balance' }}
      >
        <span className="text-foreground">SANKET </span>
        <span className="gradient-text">BIRADAR</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition, delay: 0.9 }}
        className="mb-6"
      >
        <TypingTerminal />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition, delay: 1.1 }}
        className="font-body text-muted-foreground max-w-xl text-base md:text-lg leading-relaxed mb-10"
      >
        Building the autonomous layer. Full-stack systems for AI scaling
        and Web3 infrastructure. Optimized for performance, built for the next web.
      </motion.p>

      {/* Resume Download Button */}
      <motion.a
        href="/resume.pdf"
        download
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition, delay: 1.3 }}
        whileHover={{ scale: 1.05, y: -3 }}
        whileTap={{ scale: 0.97 }}
        className="relative font-display text-xs tracking-[0.2em] uppercase px-8 py-3 rounded-lg border border-primary/40 text-primary overflow-hidden group cursor-pointer mb-8"
      >
        <motion.span
          className="absolute inset-0 bg-primary/10"
          initial={{ x: '-100%' }}
          whileHover={{ x: '0%' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
        <span className="relative z-10 flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download Resume
        </span>
      </motion.a>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition, delay: 1.5 }}
        className="flex gap-8 font-display text-xs tracking-wider text-muted-foreground"
      >
        <div>
          <span className="text-primary glow-text text-lg font-bold">99.9%</span>
          <p className="mt-1">Model Uptime</p>
        </div>
        <div className="w-px bg-border" />
        <div>
          <span className="text-primary glow-text text-lg font-bold">40ms</span>
          <p className="mt-1">Avg Latency</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-1 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </div>
  );
}
