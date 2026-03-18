import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const navItems = [
  { label: 'SYSTEMS', href: '#projects' },
  { label: 'STACK', href: '#stack' },
  { label: 'ABOUT', href: '#about' },
  { label: 'TERMINAL', href: '#contact' },
];

function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove('light');
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="relative w-14 h-7 rounded-full border border-border overflow-hidden transition-all duration-500 hover:border-primary/40"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, hsla(230, 25%, 14%, 1), hsla(230, 25%, 11%, 1))'
          : 'linear-gradient(135deg, hsla(210, 40%, 92%, 1), hsla(210, 40%, 96%, 1))',
      }}
      aria-label="Toggle theme"
    >
      <motion.div
        animate={{ x: isDark ? 2 : 28 }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 25 }}
        className="absolute top-[3px] w-5 h-5 rounded-full flex items-center justify-center"
        style={{
          background: isDark
            ? 'linear-gradient(135deg, hsl(185, 60%, 55%), hsl(200, 70%, 65%))'
            : 'linear-gradient(135deg, hsl(40, 90%, 55%), hsl(35, 95%, 60%))',
          boxShadow: isDark
            ? '0 0 10px hsla(185, 60%, 55%, 0.5)'
            : '0 0 10px hsla(40, 90%, 55%, 0.5)',
        }}
      >
        <span className="text-[10px]">{isDark ? '🌙' : '☀️'}</span>
      </motion.div>
    </button>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-500"
      style={{
        background: scrolled
          ? 'hsla(var(--background) / 0.85)'
          : 'linear-gradient(180deg, hsla(var(--background) / 0.9) 0%, hsla(var(--background) / 0) 100%)',
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(12px)',
        borderBottom: scrolled ? '1px solid hsla(var(--border) / 0.5)' : '1px solid transparent',
      }}
    >
      <a href="#" className="font-display text-sm tracking-tighter text-foreground">
        SB<span className="text-primary">_</span>
      </a>

      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <a key={item.label} href={item.href} className="nav-link">
            {item.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <a
          href="#contact"
          className="hidden sm:inline-flex font-display text-xs tracking-wider px-5 py-2.5 rounded-lg border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          INITIALIZE
        </a>
      </div>
    </motion.nav>
  );
}
