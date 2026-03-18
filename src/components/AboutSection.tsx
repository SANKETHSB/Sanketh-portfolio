import { motion } from 'framer-motion';
import profileImg from '@/assets/profile.jpeg';

const transition = { type: "spring", stiffness: 100, damping: 20, mass: 1 };

const socials = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/sanketh-biradar' },
  { label: 'GitHub', href: 'https://github.com/SANKETHSB' },
  { label: 'X / Twitter', href: 'https://x.com/BiradarSan99071' },
  { label: 'Instagram', href: 'https://instagram.com/sanket_biradar_' },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-spacing px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={transition}
          className="mb-16"
        >
          <span className="font-display text-xs tracking-[0.3em] text-primary uppercase">
            // THE ARCHITECT
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter text-foreground mt-4">
            About
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={transition}
            className="md:col-span-2"
          >
            <div className="tactile-card overflow-hidden">
              <img
                src={profileImg}
                alt="Sanket Biradar"
                className="w-full aspect-[3/4] object-cover object-top"
                style={{
                  filter: 'contrast(1.1) brightness(0.9)',
                  mixBlendMode: 'luminosity',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...transition, delay: 0.2 }}
            className="md:col-span-3 space-y-6"
          >
            <p className="font-body text-secondary-foreground leading-relaxed text-lg">
              I architect AI-powered applications and Web3 infrastructure—systems designed
              for autonomous operation at scale. From MERN stack to blockchain smart contracts,
              my work spans the entire technical spectrum.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              Currently focused on scaling AI models for real-time applications,
              optimizing backend performance through microservices architecture,
              and building decentralized systems with zero-knowledge proofs.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              I solve complex engineering challenges and ship production-grade systems
              that handle millions of operations with sub-40ms latency.
            </p>

            <div className="pt-6 flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-[10px] tracking-[0.2em] uppercase px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-300"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
