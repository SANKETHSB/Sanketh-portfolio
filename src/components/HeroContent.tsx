import { motion } from 'framer-motion';
import { useState } from 'react';
import profileImg from '@/assets/profile.jpeg';

const transition = { type: "spring" as const, stiffness: 100, damping: 20, mass: 1 };

export default function HeroContent() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-24">
      {/* Animated grid background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
        <span className="font-display text-xs tracking-[0.3em] text-muted-foreground uppercase">
          Full-Stack Architect · AI Engineer · Web3 Builder
        </span>
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition, delay: 1.3 }}
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
