import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Github, Linkedin, Terminal, Database, Cloud, Star, GitFork, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
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

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

export default function Home() {
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
  const yFooterText = useTransform(scrollYProgress, [0.8, 1], [200, 0]);

  const [repos, setRepos] = useState<Repo[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(true);

  useEffect(() => {
    // Fetch GitHub Repos
    fetch('https://api.github.com/users/dityakp/repos?sort=updated&per_page=4')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data);
        }
        setLoadingRepos(false);
      })
      .catch(err => {
        console.error("Failed to fetch repos", err);
        setLoadingRepos(false);
      });
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="relative h-[100svh] flex flex-col justify-center px-4 md:px-12 pt-20 overflow-hidden">
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

        {/* Avatar Parallax */}
        <motion.div
          style={{ y: yAvatar, rotate: rotateAvatar, willChange: 'transform' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-1/4 right-4 md:right-32 w-32 h-32 md:w-80 md:h-80 z-10 rounded-full overflow-hidden border-2 border-accent/50 shadow-[0_0_50px_rgba(204,255,0,0.15)]"
        >
          <img src={avatarImg} alt="Aditya Kumar Prasad" className="w-full h-full object-cover" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute bottom-12 right-4 md:right-12 max-w-[250px] md:max-w-sm text-right font-mono text-xs md:text-base text-muted z-20"
        >
          <p className="mb-2 text-fg">DEVSEC<span className="text-accent">OPS</span> & CLOUD ENGINEER</p>
          <p>Automating the boring. Scaling the important. Building cloud systems that scale reliably.</p>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 md:w-64 md:h-64 border border-surface rounded-full opacity-20 animate-spin-slow" style={{ animationDuration: '20s' }}></div>
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
      <section id="about" className="py-24 md:py-32 px-4 md:px-12 border-b border-surface relative z-20 bg-bg/70 backdrop-blur-sm overflow-hidden" style={{ transform: 'translateZ(0)' }}>
        <motion.div style={{ y: yAboutBg, willChange: 'transform' }} className="absolute top-0 right-0 text-[15vw] font-sans text-surface opacity-10 pointer-events-none select-none">
          SYS
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
      <section id="github" className="py-24 md:py-32 px-4 md:px-12 border-b border-surface relative z-20 bg-surface/30 backdrop-blur-sm overflow-hidden" style={{ transform: 'translateZ(0)' }}>
        <motion.div style={{ y: yGithubBg, willChange: 'transform' }} className="absolute top-10 left-0 text-[15vw] font-sans text-surface opacity-10 pointer-events-none select-none">
          GIT
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
            <ScrollScale className="lg:col-span-12 border border-surface bg-bg p-4 md:p-8">
              <h3 className="font-mono text-xs md:text-sm text-muted mb-4 md:mb-6 uppercase tracking-widest">Contribution Heatmap</h3>
              <div className="w-full overflow-x-auto pb-4">
                <img
                  src="https://ghchart.rshah.org/ccff00/dityakp"
                  alt="Aditya's GitHub Contributions"
                  className="min-w-[600px] md:min-w-[700px] w-full opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </ScrollScale>

            {/* Recent Repositories */}
            <div className="lg:col-span-12 mt-8">
              <h3 className="font-mono text-xs md:text-sm text-muted mb-4 md:mb-6 uppercase tracking-widest">Recent Deployments & Repos</h3>
              {loadingRepos ? (
                <div className="font-mono text-accent animate-pulse text-sm">Fetching repositories...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {repos.map((repo, i) => (
                    <ScrollParallax key={repo.id} offset={40} speed={i % 2 === 0 ? 1 : 1.5}>
                      <motion.a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block border border-surface bg-bg p-4 md:p-6 hover:border-accent transition-colors group relative"
                      >
                        <div className="absolute top-4 right-4 md:top-6 md:right-6 text-muted group-hover:text-accent transition-colors">
                          <ExternalLink size={16} className="md:w-5 md:h-5" />
                        </div>
                        <h4 className="text-lg md:text-xl font-sans mb-2 md:mb-3 pr-8 truncate">{repo.name}</h4>
                        <p className="font-mono text-xs md:text-sm text-muted mb-4 md:mb-6 line-clamp-2 h-8 md:h-10">
                          {repo.description || "No description provided."}
                        </p>
                        <div className="flex items-center gap-3 md:gap-4 font-mono text-[10px] md:text-xs text-muted">
                          {repo.language && (
                            <span className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent"></span>
                              {repo.language}
                            </span>
                          )}
                          <span className="flex items-center gap-1"><Star size={12} className="md:w-[14px] md:h-[14px]" /> {repo.stargazers_count}</span>
                          <span className="flex items-center gap-1"><GitFork size={12} className="md:w-[14px] md:h-[14px]" /> {repo.forks_count}</span>
                        </div>
                      </motion.a>
                    </ScrollParallax>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 md:py-32 px-4 md:px-12 border-b border-surface relative z-20 bg-bg/70 backdrop-blur-sm overflow-hidden" style={{ transform: 'translateZ(0)' }}>
        <motion.div style={{ y: yProjectsBg, willChange: 'transform' }} className="absolute top-20 right-0 text-[15vw] font-sans text-surface opacity-10 pointer-events-none select-none">
          PRJ
        </motion.div>

        <div className="relative z-10">
          <ScrollReveal direction="up">
            <h2 className="text-5xl md:text-8xl font-sans mb-12 md:mb-16">PROJECTS</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                title: "ScamShield — AI-ML Scam Detection",
                desc: "Trained a machine learning model on 2M+ text records using TF-IDF and Logistic Regression, deployed on AWS EC2. Containerized with Docker, reducing setup time by 30%. Implemented CI/CD via GitHub Actions, cutting manual deployment effort by 40%.",
                tech: ["AI", "ML", "AWS", "Docker", "GitHub Actions", "PostgreSQL"],
                link: "https://github.com/dityakp/ScamShield"
              },
              {
                title: "Blue/Green Deployment — Strapi CMS",
                desc: "Architected container-based CMS deployment using Docker, ECS Fargate, and Application Load Balancer. Provisioned AWS networking (VPC, subnets, security groups) with Terraform. Configured traffic shifting via AWS CodeDeploy with automated Docker image lifecycle.",
                tech: ["AWS", "Terraform", "Docker", "ECS Fargate", "CodeDeploy", "GitHub Actions"],
                link: "https://github.com/dityakp/strapi-application-ecs-fargate"
              },
              {
                title: "Event-Driven Reporting Pipeline",
                desc: "Developed a serverless event-driven processing system using AWS Lambda and EventBridge. Automated scheduled report generation with structured S3 storage workflow. Provisioned all infrastructure via Terraform and monitored with CloudWatch.",
                tech: ["AWS", "Lambda", "EventBridge", "S3", "Terraform", "CloudWatch"],
                link: "https://github.com/dityakp/event-driven-reporting-pipeline"
              }
            ].map((project, i) => (
              <ScrollParallax key={i} offset={80} speed={i % 2 === 0 ? 1 : -0.5} className="h-full">
                <div className="group border border-surface bg-surface/20 p-6 md:p-8 hover:border-accent transition-colors relative h-full">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="absolute top-6 right-6 text-muted group-hover:text-accent transition-colors">
                    <ExternalLink size={20} />
                  </a>
                  <h3 className="text-2xl md:text-3xl font-sans mb-4 pr-8">{project.title}</h3>
                  <p className="font-mono text-sm md:text-base text-muted mb-8 leading-relaxed">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, j) => (
                      <span key={j} className="font-mono text-[10px] md:text-xs px-2 py-1 border border-surface text-muted group-hover:border-accent/30 group-hover:text-fg transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollParallax>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-24 md:py-32 px-4 md:px-12 border-b border-surface relative z-20 bg-bg/70 backdrop-blur-sm overflow-hidden" style={{ transform: 'translateZ(0)' }}>
        <motion.div style={{ y: yExpBg, willChange: 'transform' }} className="absolute top-20 right-0 text-[15vw] font-sans text-surface opacity-10 pointer-events-none select-none">
          EXP
        </motion.div>

        <div className="relative z-10">
          <ScrollReveal direction="left">
            <h2 className="text-5xl md:text-8xl font-sans mb-12 md:mb-16 text-stroke">EXPERIENCE</h2>
          </ScrollReveal>

          <div className="space-y-0 border-t border-surface">
            {[
              {
                role: "DevOps Engineer Intern",
                company: "PearlThoughts Pvt. Ltd",
                date: "Dec 2025 — Present",
                desc: "Containerized Strapi apps via Docker & AWS ECS Fargate. Built CI/CD pipelines with GitHub Actions. Provisioned infrastructure with Terraform. Implemented Blue/Green deployments via CodeDeploy."
              },
              {
                role: "Cyber Security Intern",
                company: "CID, Jharkhand Police",
                date: "Jul — Aug 2025",
                desc: "Assisted in cybercrime investigation support. Handled digital evidence and cyber forensics workflows. Log analysis, IP tracing, and system-level indicators."
              },
              {
                role: "DevOps Engineer Intern",
                company: "Bharat Coking Coal Limited",
                date: "Jun — Jul 2025",
                desc: "Designed secure modules improving system security by 30%. Implemented CI/CD pipelines and automated deployment workflows on AWS EC2."
              }
            ].map((job, i) => (
              <ScrollReveal direction="up" key={i}>
                <div className="group border-b border-surface py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 hover:bg-surface transition-colors cursor-crosshair">
                  <div className="lg:col-span-3 font-mono text-xs md:text-sm text-muted pt-1 md:pt-2">
                    {job.date}
                  </div>
                  <div className="lg:col-span-9">
                    <h3 className="text-2xl md:text-4xl font-sans mb-1 md:mb-2 group-hover:text-accent transition-colors">{job.role}</h3>
                    <h4 className="text-lg md:text-xl font-mono mb-4 md:mb-6 text-fg">{job.company}</h4>
                    <p className="font-mono text-sm md:text-base text-muted max-w-3xl leading-relaxed">{job.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Matrix */}
      <section className="py-24 md:py-32 px-4 md:px-12 border-b border-surface relative z-20 bg-surface/30 backdrop-blur-sm overflow-hidden" style={{ transform: 'translateZ(0)' }}>
        <motion.div style={{ y: ySkillsBg, willChange: 'transform' }} className="absolute top-10 left-0 text-[15vw] font-sans text-bg opacity-50 pointer-events-none select-none">
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

      {/* Footer */}
      <footer className="py-24 md:py-32 px-4 md:px-12 bg-accent/90 backdrop-blur-md text-bg relative overflow-hidden z-20" style={{ transform: 'translateZ(0)' }}>
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
        <motion.div style={{ y: yFooterText, willChange: 'transform' }} className="absolute -bottom-10 md:-bottom-20 -right-4 md:-right-10 text-[40vw] md:text-[30vw] font-sans text-bg opacity-20 pointer-events-none leading-none">
          AKP
        </motion.div>
      </footer>
    </div>
  );
}
