import { motion } from 'framer-motion';
import profileImg from '@/assets/profile.jpeg';

const transition = { type: "spring" as const, stiffness: 100, damping: 20, mass: 1 };

export default function HeroContent() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
      {/* Animated Profile Photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ ...transition, delay: 0.5 }}
        className="mb-8 relative"
      >
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-primary/30 profile-glow">
          <img
            src={profileImg}
            alt="Sanket Biradar"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 rounded-full" style={{
            background: 'radial-gradient(circle, transparent 60%, hsl(230, 30%, 8%) 100%)',
          }} />
        </div>
        {/* Orbiting ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-8px] rounded-full border border-primary/20"
          style={{ borderStyle: 'dashed' }}
        />
        {/* Status dot */}
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-primary border-2 border-background"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition, delay: 0.8 }}
        className="mb-4"
      >
        <span className="font-display text-xs tracking-[0.3em] text-muted-foreground uppercase">
          Full-Stack Architect · AI Engineer · Web3 Builder
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition, delay: 1 }}
        className="font-display font-bold tracking-tighter leading-none mb-8"
        style={{ fontSize: 'clamp(2.5rem, 8vw, 10rem)', textWrap: 'balance' }}
      >
        <span className="text-foreground">SANKET</span>
        <br />
        <span className="gradient-text">BIRADAR</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition, delay: 1.3 }}
        className="font-body text-muted-foreground max-w-xl text-base md:text-lg leading-relaxed mb-10"
      >
        Building the autonomous layer. Full-stack systems for AI scaling
        and Web3 infrastructure. Optimized for performance, built for the next web.
      </motion.p>

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
        <div className="w-px bg-border" />
        <div>
          <span className="text-primary glow-text text-lg font-bold">ZKP</span>
          <p className="mt-1">Zero-Knowledge</p>
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
