import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowLeft, ExternalLink, CalendarDays } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { experiencesData } from '../data/experiences';

export default function ExperienceDetails() {
  const { id } = useParams();
  const { scrollYProgress } = useScroll();
  const yHeaderBg = useTransform(scrollYProgress, [0, 1], [0, 300]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const exp = experiencesData.find(e => e.id === id);

  if (!exp) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg text-fg font-mono">
        <h1 className="text-4xl text-accent mb-4">404_NOT_FOUND</h1>
        <p className="text-muted mb-8">The requested experience log could not be located.</p>
        <Link to="/" className="px-6 py-3 border border-surface hover:border-accent transition-colors">
          cd ../home
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-4 md:px-12">
      {/* Background decoration */}
      <motion.div style={{ y: yHeaderBg }} className="fixed top-20 right-0 text-[15vw] font-sans text-surface opacity-10 pointer-events-none select-none z-0">
        EXP_LOG
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <Link to="/" className="inline-flex items-center gap-2 text-muted hover:text-accent font-mono text-sm mb-8 transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            cd ../home
          </Link>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans text-stroke tracking-tighter mb-6">
            CASE<br/>STUDY
          </h1>
          <div className="font-mono text-muted text-sm md:text-base border-l-2 border-accent pl-4 py-1 max-w-2xl">
            // Detailed analysis of professional role<br/>
            // Verifiable proofs and outcomes
          </div>
        </div>

        <section className="relative">
          {/* Sticky Header for Role */}
          <div className="md:sticky md:top-24 z-20 bg-bg/90 backdrop-blur-md py-4 border-b border-surface mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans text-fg mb-1">{exp.role}</h2>
                <h3 className="font-mono text-lg text-fg/60">{exp.company}</h3>
              </div>
              <div className="font-mono text-accent text-sm md:text-base flex flex-col md:items-end gap-1">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                  {exp.date}
                </span>
              </div>
            </div>
          </div>

          {/* Bento Grid for Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            
            {/* Main Description & Impact (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8">
              <div className="border border-surface bg-surface/5 p-6 md:p-8 hover:border-accent/30 transition-colors h-full flex flex-col">
                <h4 className="font-mono text-xs text-muted mb-4 uppercase tracking-widest border-b border-surface/50 pb-2">Mission Overview</h4>
                <p className="font-mono text-sm md:text-base text-fg/80 leading-relaxed flex-grow mb-8">
                  {exp.desc}
                </p>
                
                <div className="mt-auto bg-bg border border-surface p-4 border-l-2 border-l-accent">
                  <h5 className="font-mono text-xs text-accent mb-2 uppercase tracking-widest">Key Impact</h5>
                  <p className="font-sans text-lg md:text-xl text-fg">{exp.impact}</p>
                </div>
              </div>
            </div>

            {/* Employment Proofs & Dates (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6 md:gap-8">
              <div className="border border-surface bg-surface/5 p-6 md:p-8 hover:border-accent/30 transition-colors h-full flex flex-col">
                <h4 className="font-mono text-xs text-muted mb-4 uppercase tracking-widest border-b border-surface/50 pb-2 flex items-center justify-between">
                  <span>Employment Verification</span>
                  <span className="bg-accent/10 text-accent px-2 py-0.5 rounded text-[10px]">VERIFIED</span>
                </h4>
                
                <div className="mb-8">
                  <div className="font-mono text-sm text-muted mb-1">Appointment Date</div>
                  <div className="font-sans text-xl text-fg flex items-center gap-3">
                    <CalendarDays size={20} className="text-accent" />
                    {exp.appointmentDate}
                  </div>
                </div>

                <div className="font-mono text-sm text-muted mb-3">Official Proofs</div>
                <div className="space-y-3">
                  {exp.proofs.map((proof, j) => (
                    <div key={j} className="group flex items-center justify-between p-3 border border-surface hover:border-accent/50 transition-colors cursor-pointer bg-bg">
                      <div className="flex items-center gap-3">
                        <div className="text-muted group-hover:text-accent transition-colors">
                          {proof.icon}
                        </div>
                        <span className="font-mono text-sm text-fg/80 group-hover:text-fg transition-colors">{proof.name}</span>
                      </div>
                      <ExternalLink size={14} className="text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tech Stack (Full 12 cols, or 5 if you want, let's keep it 12) */}
            <div className="lg:col-span-12">
              <div className="border border-surface bg-surface/5 p-6 md:p-8 hover:border-accent/30 transition-colors">
                <h4 className="font-mono text-xs text-muted mb-4 uppercase tracking-widest border-b border-surface/50 pb-2">Technology Stack</h4>
                <div className="font-mono text-sm text-accent mb-4 flex items-center">&gt; run --stack</div>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag, j) => (
                    <span key={j} className="px-4 py-2 border border-surface bg-bg text-sm md:text-base font-mono text-muted hover:text-fg hover:border-accent/50 transition-colors cursor-default">
                      --{tag.toLowerCase().replace(/\s+/g, '-')}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Certificates / Artifacts (Full 12 cols) — only show if certificates exist */}
            {exp.certificates.length > 0 && (
              <div className="lg:col-span-12">
                <div className="border border-surface bg-bg p-6 md:p-8 hover:border-accent/30 transition-colors">
                  <div className="flex items-center justify-between mb-6 border-b border-surface/50 pb-2">
                    <h4 className="font-mono text-xs text-muted uppercase tracking-widest">Achieved Certifications</h4>
                    <span className="font-mono text-xs text-accent">[{exp.certificates.length} Artifacts]</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {exp.certificates.map((cert, j) => (
                      <div key={j} className="group flex items-center justify-between p-4 border border-surface hover:border-accent/50 transition-colors cursor-pointer bg-surface/5">
                        <div className="flex items-center gap-4">
                          <div className="text-muted group-hover:text-accent transition-colors">
                            {cert.icon}
                          </div>
                          <span className="font-mono text-sm md:text-base text-fg/80 group-hover:text-fg transition-colors">{cert.name}</span>
                        </div>
                        <ExternalLink size={16} className="text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>
      </div>
    </div>
  );
}
