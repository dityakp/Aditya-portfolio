import React, { useLayoutEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowLeft, ExternalLink, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { certificationsData } from '../data/certifications';

export default function Certifications() {
  // Always scroll to top when opening the page
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollYProgress } = useScroll();
  const yHeaderBg = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-4 md:px-12 bg-bg text-fg">
      {/* Background decoration */}
      <motion.div style={{ y: yHeaderBg }} className="fixed top-20 right-0 text-[12vw] font-sans text-surface opacity-30 pointer-events-none select-none z-0">
        CERTIFICATIONS
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <Link to="/" className="inline-flex items-center gap-2 text-muted hover:text-accent font-mono text-sm mb-8 transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            cd ../home
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans text-stroke tracking-tighter mb-4">CERTIFICATIONS</h1>
            <p className="font-mono text-muted text-sm md:text-base max-w-2xl border-l-2 border-accent pl-4 py-1">
              // Professional validation<br />
              // Credentials and achievements
            </p>
          </motion.div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {certificationsData.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="border border-surface bg-surface/5 p-6 md:p-8 hover:border-accent/30 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Decorative Corner Lines */}
              <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 right-0 w-6 h-px bg-accent"></div>
                <div className="absolute top-0 right-0 w-px h-6 bg-accent"></div>
              </div>

              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-surface/30 border border-surface group-hover:border-accent/50 transition-colors">
                  <Award size={24} className="text-accent" />
                </div>
                <div className="font-mono text-xs md:text-sm text-muted uppercase tracking-widest text-right">
                  {cert.date}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl md:text-2xl font-sans mb-2 group-hover:text-accent transition-colors">{cert.name}</h3>
              <h4 className="font-mono text-sm text-fg/60 mb-6">{cert.issuer}</h4>
              
              <p className="font-mono text-sm text-muted mb-8 line-clamp-3">
                {cert.description}
              </p>

              {/* Footer Details */}
              <div className="mt-auto pt-6 border-t border-surface/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {cert.credentialId ? (
                  <div className="font-mono text-xs text-muted flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                    ID: {cert.credentialId}
                  </div>
                ) : (
                  <div></div>
                )}

                {cert.link && (
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent hover:text-fg transition-colors group/link"
                  >
                    View Credential <ExternalLink size={14} className="group-hover/link:-translate-y-1 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
