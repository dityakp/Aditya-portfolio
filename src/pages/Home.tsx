import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Github, Linkedin, Terminal, Database, Cloud, Star, GitFork, ExternalLink, Download, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { experiencesData } from '../data/experiences';
// @ts-ignore
import avatarImg from '../assets/avatar.png';

interface ScrollParallaxProps {
  children: React.ReactNode;
  offset?: number;
  direction?: 'y' | 'x';
  speed?: number;
  className?: string;
}

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'left' | 'right';
  className?: string;
}

interface ScrollScaleProps {
  children: React.ReactNode;
  className?: string;
}

const ScrollParallax: React.FC<ScrollParallaxProps> = ({ children, offset = 50, direction = 'y', speed = 1, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const transform = useTransform(scrollYProgress, [0, 1], [offset * speed, -offset * speed]);
  return (
    <motion.div ref={ref} style={{ [direction]: transform, willChange: 'transform' }} className={className}>
      {children}
    </motion.div>
  );
};

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, direction = 'up', className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "center center"] });
  const y = direction === 'up' ? useTransform(scrollYProgress, [0, 1], [100, 0]) : 0;
  const x = direction === 'left' ? useTransform(scrollYProgress, [0, 1], [-100, 0]) : direction === 'right' ? useTransform(scrollYProgress, [0, 1], [100, 0]) : 0;
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div ref={ref} style={{ x, y, opacity, willChange: 'transform, opacity' }} className={className}>
      {children}
    </motion.div>
  );
};

const ScrollScale: React.FC<ScrollScaleProps> = ({ children, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  return (
    <motion.div ref={ref} style={{ scale, opacity, willChange: 'transform, opacity' }} className={className}>
      {children}
    </motion.div>
  );
};

export default function Home() {
  // Restore scroll position when returning to Home
  useLayoutEffect(() => {
    const savedPos = sessionStorage.getItem('homeScrollY');
    if (savedPos) {
      // Use setTimeout to allow layout to settle before scrolling
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedPos, 10));
      }, 50);
    }
    // Intentionally removed the unmount listener here because the exit 
    // animation delays unmounting until after scroll has jumped to 0
  }, []);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Direct transforms without useSpring — eliminates per-frame spring solver overhead
  // Parallax transforms for Hero
  const yHeroText = useTransform(scrollYProgress, [0, 1], [0, 600]);
  const yAvatar = useTransform(scrollYProgress, [0, 1], [0, 1000]);
  const rotateAvatar = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Parallax transforms for other sections
  const yAboutBg = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const yGithubBg = useTransform(scrollYProgress, [0.2, 0.7], [0, 300]);
  const yProjectsBg = useTransform(scrollYProgress, [0.3, 0.8], [0, 250]);
  const yExpBg = useTransform(scrollYProgress, [0.4, 0.9], [0, 200]);
  const ySkillsBg = useTransform(scrollYProgress, [0.6, 1], [0, 200]);
  const yCertBg = useTransform(scrollYProgress, [0.7, 1], [0, 200]);
  const yFooterText = useTransform(scrollYProgress, [0.8, 1], [200, 0]);



  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="relative h-[100svh] flex flex-col justify-center px-4 sm:px-6 md:px-12 pt-20 overflow-hidden">
        <motion.div style={{ y: yHeroText, opacity: opacityHero, willChange: 'transform, opacity' }} className="z-20 relative">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[15vw] md:text-[12vw] leading-[0.8] font-sans m-0 p-0"
          >
            ADITYA
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[15vw] md:text-[12vw] leading-[0.8] font-sans m-0 p-0 text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.4)]"
          >
            KUMAR
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[15vw] md:text-[12vw] leading-[0.8] font-sans m-0 p-0 text-accent"
          >
            PRASAD
          </motion.h1>
        </motion.div>

        {/* Avatar Container */}
        <motion.div
          style={{ y: yAvatar, willChange: 'transform' }}
          className="absolute top-16 right-2 sm:top-1/4 sm:right-4 md:right-32 z-30 flex flex-col items-center gap-4 md:gap-6"
        >
          {/* Avatar Parallax */}
          <motion.div
            style={{ rotate: rotateAvatar }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-24 h-24 sm:w-32 sm:h-32 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-accent/50 shadow-[0_0_50px_rgba(204,255,0,0.15)]"
          >
            <img src={avatarImg} alt="Aditya Kumar Prasad" className="w-full h-full object-cover" />
          </motion.div>
          
          <motion.a
            href="/Resume.pdf"
            download="Aditya_Kumar_Prasad_Resume.pdf"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hidden sm:inline-flex items-center gap-2 font-mono text-xs md:text-sm uppercase tracking-widest text-bg bg-accent px-4 py-2 md:px-6 md:py-3 hover:bg-white transition-colors cursor-pointer pointer-events-auto"
            style={{ position: 'relative', zIndex: 9999 }}
          >
            <Download size={16} /> Download Resume
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute bottom-12 right-4 md:right-12 max-w-[250px] md:max-w-sm text-right font-mono text-xs md:text-base text-muted z-20"
        >
          <p className="mb-2 text-fg">DEVSEC<span className="text-accent">OPS</span> & CLOUD ENGINEER</p>
          <p className="hidden sm:block">Automating the boring. Scaling the important. Building cloud systems that scale reliably.</p>
        </motion.div>

        {/* Mobile-only Download Resume Button */}
        <motion.a
          href="/Resume.pdf"
          download="Aditya_Kumar_Prasad_Resume.pdf"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="sm:hidden absolute bottom-6 left-4 right-4 inline-flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-bg bg-accent px-4 py-3 hover:bg-white transition-colors cursor-pointer pointer-events-auto z-30"
        >
          <Download size={14} /> Download Resume
        </motion.a>

        {/* Decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 md:w-64 md:h-64 border border-surface rounded-full opacity-20 animate-spin-slow pointer-events-none" style={{ animationDuration: '20s' }}></div>
      </section>

      {/* Marquee */}
      <div className="w-full bg-accent text-bg py-3 md:py-4 overflow-hidden flex whitespace-nowrap border-y border-bg relative z-20">
        <motion.div
          animate={{ x: [0, -1035] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 10 }}
          className="font-sans text-xl md:text-2xl uppercase flex gap-4 md:gap-8"
        >
          <span>AWS</span><span>•</span>
          <span>TERRAFORM</span><span>•</span>
          <span>DOCKER</span><span>•</span>
          <span>KUBERNETES</span><span>•</span>
          <span>CI/CD</span><span>•</span>
          <span>LINUX</span><span>•</span>
          <span>PYTHON</span><span>•</span>
          <span>AWS</span><span>•</span>
          <span>TERRAFORM</span><span>•</span>
          <span>DOCKER</span><span>•</span>
          <span>KUBERNETES</span><span>•</span>
          <span>CI/CD</span><span>•</span>
          <span>LINUX</span><span>•</span>
          <span>PYTHON</span><span>•</span>
        </motion.div>
      </div>

      {/* About & Stats */}
      <section id="about" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 border-b border-surface relative z-20 bg-bg/70 backdrop-blur-sm overflow-hidden" style={{ transform: 'translateZ(0)' }}>
        <motion.div style={{ y: yAboutBg, willChange: 'transform' }} className="absolute top-0 right-0 text-[15vw] font-sans text-surface opacity-30 pointer-events-none select-none">
          ABOUT
        </motion.div>
        <ScrollReveal direction="up" className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
          <div className="lg:col-span-4">
            <h2 className="text-4xl md:text-6xl font-sans mb-6">SYS_INFO</h2>
            <div className="font-mono text-sm text-muted space-y-4">
              <p><span className="text-accent">LOCATION:</span> Bhubaneswar, India</p>
              <p><span className="text-accent">EDUCATION:</span> BCA @ Gandhi National College (2023-2026)</p>
              <p><span className="text-accent">STATUS:</span> Available for opportunities</p>
            </div>
          </div>
          <div className="lg:col-span-8 font-mono text-base md:text-2xl leading-relaxed">
            <p>
              Final-year BCA student building expertise in DevOps, Cloud, and Automation. I've shipped production-grade infrastructure on AWS — from containerized deployments to zero-downtime CI/CD pipelines.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-12 md:mt-16">
              {[
                { val: "3", label: "Internships" },
                { val: "6+", label: "Cloud Projects" },
                { val: "26", label: "Grad Year" },
                { val: "24/7", label: "Uptime Mindset" }
              ].map((stat, i) => (
                <ScrollParallax key={i} direction="y" offset={30} speed={1 + (i * 0.5)}>
                  <div className="text-4xl md:text-5xl font-sans text-accent mb-2">{stat.val}</div>
                  <div className="text-[10px] md:text-xs text-muted uppercase tracking-widest">{stat.label}</div>
                </ScrollParallax>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* GitHub Live Integration */}
      <section id="github" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 border-b border-surface relative z-20 bg-surface/30 backdrop-blur-sm overflow-hidden" style={{ transform: 'translateZ(0)' }}>
        <motion.div style={{ y: yGithubBg, willChange: 'transform' }} className="absolute top-10 left-0 text-[15vw] font-sans text-surface opacity-30 pointer-events-none select-none">
          GITHUB
        </motion.div>

        <div className="relative z-10">
          <ScrollReveal direction="left" className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
            <div>
              <h2 className="text-5xl md:text-8xl font-sans text-stroke">GITHUB</h2>
              <p className="font-mono text-accent mt-2 md:mt-4 flex items-center gap-2 text-sm md:text-base">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                LIVE DATA FEED
              </p>
            </div>
            <a href="https://github.com/dityakp" target="_blank" rel="noopener noreferrer" className="font-mono text-xs md:text-sm border border-fg px-4 py-2 md:px-6 md:py-3 hover:bg-fg hover:text-bg transition-colors uppercase flex items-center gap-2">
              <Github size={16} /> View Profile
            </a>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Contributions Graph */}
            <ScrollScale className="lg:col-span-12 border border-surface bg-bg p-4 md:p-8 hover:border-accent/50 transition-colors duration-500 group relative overflow-hidden">
              {/* Background Glow to match the Projects section aesthetic */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/2 bg-accent/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-accent/10 transition-colors duration-500"></div>

              <h3 className="font-mono text-xs md:text-sm text-muted mb-4 md:mb-6 uppercase tracking-widest relative z-10 flex items-center gap-2">
                <span className="w-2 h-2 bg-accent"></span>
                Contribution Heatmap
              </h3>

              <div className="w-full overflow-x-auto pb-4 relative z-10">
                <img
                  src="https://ghchart.rshah.org/ccff00/dityakp"
                  alt="Aditya's GitHub Contributions"
                  className="min-w-[600px] md:min-w-[700px] w-full opacity-90 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    filter: "brightness(0.7) contrast(1.4) saturate(1.5)",
                    mixBlendMode: "lighten"
                  }}
                />
              </div>
            </ScrollScale>


          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 border-b border-surface relative z-20 bg-bg/70 backdrop-blur-sm overflow-hidden" style={{ transform: 'translateZ(0)' }}>
        <motion.div style={{ y: yProjectsBg, willChange: 'transform' }} className="absolute top-20 right-0 text-[15vw] font-sans text-surface opacity-30 pointer-events-none select-none">
          PROJECTS
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-4">
              <h2 className="text-5xl lg:text-7xl font-sans text-stroke tracking-tighter">PROJECTS</h2>
              <div className="font-mono text-muted text-sm border-l-2 border-accent pl-4 py-1 mb-2">
                // System Architecture<br />
                // Security Implementations
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {[
              {
                title: "ScamShield",
                subtitle: "AI-ML Scam Detection",
                desc: <>Trained a machine learning model on <span className="text-accent font-bold">2M+ text records</span> using TF-IDF and Logistic Regression, deployed on AWS EC2. Containerized with Docker, reducing setup time by <span className="text-accent font-bold">30%</span>. Implemented CI/CD via GitHub Actions, cutting manual deployment effort by <span className="text-accent font-bold">40%</span>.</>,
                tech: ["AI", "ML", "AWS", "Docker", "GitHub Actions", "PostgreSQL"],
                link: "https://github.com/dityakp/ScamShield",
                span: "lg:col-span-7"
              },
              {
                title: "Blue/Green Deploy",
                subtitle: "Strapi CMS Infrastructure",
                desc: <>Architected container-based CMS deployment using Docker, ECS Fargate, and Application Load Balancer. Provisioned AWS networking with Terraform. Configured traffic shifting via AWS CodeDeploy with <span className="text-accent font-bold">automated image lifecycle</span>.</>,
                tech: ["AWS", "Terraform", "Docker", "ECS Fargate", "CodeDeploy"],
                link: "https://github.com/dityakp/strapi-application-ecs-fargate",
                span: "lg:col-span-5"
              },
              {
                title: "Event-Driven Pipeline",
                subtitle: "Serverless Reporting System",
                desc: <>Developed a serverless event-driven processing system using AWS Lambda and EventBridge. Automated scheduled report generation with <span className="text-accent font-bold">structured S3 storage workflow</span>. Provisioned all infrastructure via Terraform and monitored with CloudWatch.</>,
                tech: ["AWS", "Lambda", "EventBridge", "S3", "Terraform", "CloudWatch"],
                link: "https://github.com/dityakp/event-driven-reporting-pipeline",
                span: "lg:col-span-12"
              }
            ].map((project, i) => (
              <ScrollParallax key={i} offset={30} speed={i % 2 === 0 ? 0.5 : -0.2} className={`h-full ${project.span}`}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="group h-full border border-surface bg-bg relative overflow-hidden flex flex-col hover:border-accent/50 transition-colors duration-500"
                >
                  {/* Terminal Top Bar */}
                  <div className="bg-surface/30 border-b border-surface px-4 py-2 md:py-3 flex items-center justify-between z-20">
                    <div className="flex gap-1.5 md:gap-2">
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-surface/80 group-hover:bg-[#FF5F56] transition-colors duration-300"></div>
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-surface/80 group-hover:bg-[#FFBD2E] transition-colors duration-300"></div>
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-surface/80 group-hover:bg-[#27C93F] transition-colors duration-300"></div>
                    </div>
                    <div className="font-mono text-[10px] md:text-xs text-muted flex items-center">
                      ~/projects/{project.title.toLowerCase().replace(/\s+/g, '-')}
                      <span className="inline-block w-1.5 h-3 md:w-2 md:h-3.5 ml-1.5 bg-accent opacity-0 group-hover:animate-pulse"></span>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-6 md:p-8 lg:p-10 flex-grow flex flex-col relative z-10 bg-surface/5 backdrop-blur-sm">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="absolute top-6 right-6 md:top-8 md:right-8 text-muted hover:text-accent transition-colors z-20">
                      <ExternalLink size={24} />
                    </a>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans mb-1 pr-12 group-hover:text-accent transition-colors duration-300">{project.title}</h3>
                    <h4 className="font-mono text-sm md:text-base text-fg/50 mb-6 md:mb-8">{project.subtitle}</h4>

                    <p className="font-mono text-sm md:text-base text-muted mb-8 md:mb-12 leading-relaxed flex-grow max-w-3xl">
                      {project.desc}
                    </p>

                    {/* Terminal Command Tags */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-auto pt-6 border-t border-surface/50">
                      <span className="font-mono text-xs md:text-sm text-accent flex items-center">&gt; run --stack</span>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t, j) => (
                          <span key={j} className="font-mono text-[10px] md:text-xs px-2 py-1 bg-surface/20 text-muted group-hover:text-fg transition-colors duration-300">
                            --{t.toLowerCase().replace(/\s+/g, '-')}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hover Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </motion.div>
              </ScrollParallax>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 border-b border-surface relative z-20 bg-bg/70 backdrop-blur-sm overflow-hidden" style={{ transform: 'translateZ(0)' }}>
        <motion.div style={{ y: yExpBg, willChange: 'transform' }} className="absolute top-20 right-0 text-[12vw] font-sans text-surface opacity-30 pointer-events-none select-none">
          EXPERIENCE
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 relative">

            {/* Sticky Left Column */}
            <div className="lg:col-span-5 relative">
              <div className="lg:sticky lg:top-32">
                <ScrollReveal direction="left">
                  <h2 className="text-5xl lg:text-6xl xl:text-7xl font-sans mb-6 text-stroke tracking-tighter break-words">EXPERIENCE</h2>
                  <p className="font-mono text-muted text-sm max-w-xs border-l-2 border-accent pl-4 py-1">
                    // Professional trajectory<br />
                    // Security & infrastructure
                  </p>
                </ScrollReveal>
              </div>
            </div>

            {/* Scrolling Right Column with Timeline */}
            <div className="lg:col-span-7 relative">
              {/* Timeline Track */}
              <div className="absolute left-0 lg:left-8 top-8 bottom-0 w-px bg-gradient-to-b from-accent/50 via-surface to-transparent hidden md:block"></div>

              <div className="space-y-12 lg:space-y-20 md:pl-12 lg:pl-24 py-8">
                {experiencesData.map((job, i) => (
                  <ScrollReveal direction="up" key={i}>
                    <div className="relative group">

                      {/* Glowing Node (Desktop Only) */}
                      <div className="hidden md:flex absolute -left-[3.5rem] lg:-left-[4.5rem] top-8 w-4 h-4 rounded-full border border-accent bg-bg items-center justify-center transition-all duration-500 group-hover:scale-150 group-hover:shadow-[0_0_15px_rgba(200,255,0,0.4)] z-10">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Glassmorphic Cyber Card */}
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="p-6 md:p-10 border border-surface bg-surface/5 hover:bg-surface/20 transition-all duration-500 relative overflow-hidden backdrop-blur-sm"
                      >
                        {/* Decorative Corner Lines */}
                        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute top-0 right-0 w-8 h-px bg-accent"></div>
                          <div className="absolute top-0 right-0 w-px h-8 bg-accent"></div>
                        </div>

                        {/* Background Glow */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/5 blur-[50px] rounded-full group-hover:bg-accent/10 transition-colors duration-500"></div>

                        <div className="font-mono text-xs md:text-sm text-accent mb-4 flex items-center gap-2">
                          <span className="w-2 h-px bg-accent"></span>
                          {job.date}
                        </div>

                        <h3 className="text-2xl md:text-4xl font-sans mb-2 group-hover:text-accent transition-colors duration-300">{job.role}</h3>
                        <h4 className="text-base md:text-lg font-mono mb-6 text-fg/60">{job.company}</h4>



                        <div className="flex justify-end mt-2 md:mt-4 relative z-20">
                          <Link 
                            to={`/experience/${job.id}`} 
                            onClick={() => sessionStorage.setItem('homeScrollY', window.scrollY.toString())}
                            className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm md:text-base text-surface bg-accent px-3 py-2 md:px-6 md:py-3 hover:bg-white transition-colors group/btn"
                          >
                            EXPLORE DETAILS 
                            <span className="group-hover/btn:translate-x-1 transition-transform">-&gt;</span>
                          </Link>
                        </div>
                      </motion.div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Matrix */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 border-b border-surface relative z-20 bg-surface/30 backdrop-blur-sm overflow-hidden" style={{ transform: 'translateZ(0)' }}>
        <motion.div style={{ y: ySkillsBg, willChange: 'transform' }} className="absolute top-10 left-0 text-[15vw] font-sans text-bg opacity-60 pointer-events-none select-none">
          TECH
        </motion.div>

        <div className="relative z-10">
          <ScrollReveal direction="up">
            <h2 className="text-5xl md:text-8xl font-sans mb-12 md:mb-16">TECH_STACK</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            <ScrollScale className="h-full">
              <h3 className="text-lg md:text-xl font-sans text-accent mb-4 md:mb-6 flex items-center gap-2"><Cloud size={18} className="md:w-5 md:h-5" /> CLOUD & AWS</h3>
              <ul className="font-mono text-sm md:text-base space-y-2 text-muted">
                {['EC2', 'ECS Fargate', 'ECR', 'ALB', 'CloudWatch', 'CodeDeploy', 'IAM', 'S3', 'Lambda', 'EventBridge', 'VPC'].map(s => (
                  <li key={s} className="hover:text-fg hover:translate-x-2 transition-transform cursor-default">_ {s}</li>
                ))}
              </ul>
            </ScrollScale>

            <ScrollScale className="h-full">
              <h3 className="text-lg md:text-xl font-sans text-accent mb-4 md:mb-6 flex items-center gap-2"><Terminal size={18} className="md:w-5 md:h-5" /> IAC & AUTOMATION</h3>
              <ul className="font-mono text-sm md:text-base space-y-2 text-muted">
                {['Terraform', 'Docker', 'Docker Compose', 'GitHub Actions', 'Jenkins', 'Nginx', 'Strapi CMS'].map(s => (
                  <li key={s} className="hover:text-fg hover:translate-x-2 transition-transform cursor-default">_ {s}</li>
                ))}
              </ul>
            </ScrollScale>

            <ScrollScale className="h-full">
              <h3 className="text-lg md:text-xl font-sans text-accent mb-4 md:mb-6 flex items-center gap-2"><Database size={18} className="md:w-5 md:h-5" /> PROGRAMMING & DB</h3>
              <ul className="font-mono text-sm md:text-base space-y-2 text-muted">
                {['Python', 'C / C++', 'JavaScript', 'Bash', 'SQL', 'PostgreSQL', 'MySQL', 'Linux / Unix'].map(s => (
                  <li key={s} className="hover:text-fg hover:translate-x-2 transition-transform cursor-default">_ {s}</li>
                ))}
              </ul>
            </ScrollScale>
          </div>
        </div>
      </section>

      {/* Certifications (Teaser) */}
      <section id="certifications" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 border-b border-surface relative z-20 bg-bg/70 backdrop-blur-sm overflow-hidden" style={{ transform: 'translateZ(0)' }}>
        <motion.div style={{ y: yCertBg, willChange: 'transform' }} className="absolute top-10 right-0 text-[10vw] font-sans text-surface opacity-30 pointer-events-none select-none">
          CERTIFICATIONS
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <ScrollReveal direction="left" className="md:w-1/2">
            <h2 className="text-4xl md:text-6xl font-sans mb-6">CERTIFICATIONS</h2>
            <p className="font-mono text-muted text-sm md:text-base leading-relaxed mb-8 border-l-2 border-accent pl-4">
              // Continuous learning<br />
              // Verified expertise in Cloud & DevOps
            </p>
            <p className="font-mono text-fg/80 mb-8 max-w-lg">
              I actively pursue industry-recognized certifications to validate my architectural knowledge and keep my skills sharp in rapidly evolving cloud ecosystems.
            </p>
            
            <Link 
              to="/certifications"
              onClick={() => sessionStorage.setItem('homeScrollY', window.scrollY.toString())}
              className="inline-flex items-center gap-4 bg-accent text-bg px-6 py-4 font-mono font-bold hover:bg-white transition-colors group"
            >
              VIEW ALL CREDENTIALS
              <span className="group-hover:translate-x-2 transition-transform">-&gt;</span>
            </Link>
          </ScrollReveal>

          <ScrollReveal direction="right" className="md:w-1/2 w-full">
            <div className="border border-surface bg-surface/10 p-8 relative overflow-hidden group hover:border-accent/30 transition-colors">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/5 blur-[50px] rounded-full group-hover:bg-accent/10 transition-colors"></div>
              
              <div className="flex justify-between items-start mb-12 relative z-10">
                <Award size={32} className="text-accent" />
                <span className="font-mono text-xs text-muted">SECURE_CREDENTIALS</span>
              </div>
              
              <div className="space-y-4 relative z-10">
                <div className="h-2 w-1/3 bg-surface rounded-full overflow-hidden">
                  <div className="h-full bg-accent w-full animate-pulse"></div>
                </div>
                <div className="h-2 w-2/3 bg-surface rounded-full"></div>
                <div className="h-2 w-1/2 bg-surface rounded-full"></div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-accent/90 backdrop-blur-md text-bg relative overflow-hidden z-20" style={{ transform: 'translateZ(0)' }}>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-6xl font-sans mb-6 md:mb-8">READY TO DEPLOY?</h2>
          <Link to="/contact" className="block text-[12vw] md:text-[8vw] leading-none font-sans hover:text-surface transition-colors mb-12 md:mb-16">
            INITIATE
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8 font-mono text-xs md:text-sm font-bold">
            <div className="flex flex-wrap gap-4 md:gap-6">
              <a href="https://github.com/dityakp" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                <Github size={16} className="md:w-[18px] md:h-[18px]" /> GITHUB
              </a>
              <a href="https://www.linkedin.com/in/dityakp/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                <Linkedin size={16} className="md:w-[18px] md:h-[18px]" /> LINKEDIN
              </a>
            </div>
            <div className="text-left md:text-right">
              <p>© 2026 ADITYA KUMAR PRASAD</p>
              <p>DEVSEC_OPS ENGINEER</p>
            </div>
          </div>
        </div>

        {/* Massive background text with Parallax */}
        <motion.div style={{ y: yFooterText, willChange: 'transform' }} className="absolute -bottom-10 md:-bottom-20 -right-4 md:-right-10 text-[40vw] md:text-[30vw] font-sans text-bg opacity-30 pointer-events-none leading-none">
          AKP
        </motion.div>
      </footer>
    </div>
  );
}
