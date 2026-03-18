import { motion } from 'framer-motion';
import { useState } from 'react';

const transition = { type: "spring" as const, stiffness: 100, damping: 20, mass: 1 };

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <section id="contact" className="section-spacing px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={transition}
          className="mb-16 text-center"
        >
          <span className="font-display text-xs tracking-[0.3em] text-primary uppercase">
            // OPEN CHANNEL
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter text-foreground mt-4">
            Initialize Collaboration
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-lg mx-auto">
            Ready to build something exceptional? Open a channel and let's architect your next system.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...transition, delay: 0.2 }}
          className="tactile-card p-8 md:p-12"
        >
          <div className="font-display text-xs text-muted-foreground mb-6">
            <span className="text-primary">{'>'}</span> terminal.init("collaboration")
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="font-display text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2 block">
                IDENTIFIER
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="terminal-input w-full"
              />
            </div>

            <div>
              <label className="font-display text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2 block">
                CONTACT PROTOCOL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@domain.com"
                className="terminal-input w-full"
              />
            </div>

            <div>
              <label className="font-display text-[10px] tracking-[0.2em] text-muted-foreground uppercase mb-2 block">
                TRANSMISSION
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your project requirements..."
                rows={5}
                className="terminal-input w-full resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full font-display text-xs tracking-[0.2em] uppercase py-4 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity duration-300"
            >
              TRANSMIT MESSAGE →
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-20 text-center"
        >
          <p className="font-display text-xs tracking-[0.2em] text-muted-foreground">
            SANKET BIRADAR © 2026 — ARCHITECTING INTELLIGENCE
          </p>
        </motion.div>
      </div>
    </section>
  );
}
