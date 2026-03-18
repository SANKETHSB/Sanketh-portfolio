import { motion } from 'framer-motion';

const navItems = [
  { label: 'SYSTEMS', href: '#projects' },
  { label: 'STACK', href: '#stack' },
  { label: 'ABOUT', href: '#about' },
  { label: 'TERMINAL', href: '#contact' },
];

export default function Navigation() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6"
      style={{
        background: 'linear-gradient(180deg, hsla(230, 30%, 8%, 0.9) 0%, hsla(230, 30%, 8%, 0) 100%)',
        backdropFilter: 'blur(12px)',
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

      <a
        href="#contact"
        className="font-display text-xs tracking-wider px-5 py-2.5 rounded-lg border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
      >
        INITIALIZE
      </a>
    </motion.nav>
  );
}
