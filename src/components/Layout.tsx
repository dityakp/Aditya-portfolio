import React, { useEffect, useRef, useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Linkedin, Download, Menu, X } from 'lucide-react';
import Lenis from 'lenis';
import WebGLFluid from 'webgl-fluid';

const FluidBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (canvasRef.current && !initialized.current) {
      initialized.current = true;
      WebGLFluid(canvasRef.current, {
        TRIGGER: 'hover',
        IMMEDIATE: false,
        AUTO: false,
        INTERVAL: 3000,
        SIM_RESOLUTION: 64,          // Lowered from 128 — 4x less GPU computation
        DYE_RESOLUTION: 256,         // Lowered from 1024 — 16x less texture memory
        CAPTURE_RESOLUTION: 256,     // Lowered from 512
        DENSITY_DISSIPATION: 1.5,    // Higher = dissipates faster = less to render
        VELOCITY_DISSIPATION: 1.0,   // Higher = less persistent trails
        PRESSURE: 0.1,
        PRESSURE_ITERATIONS: 8,      // Lowered from 20 — fewer solver passes per frame
        CURL: 15,
        SPLAT_RADIUS: 0.4,
        SPLAT_FORCE: 6000,
        SHADING: false,              // Disabled — saves a full-screen shader pass
        COLORFUL: false,
        COLOR_UPDATE_SPEED: 0,
        PAUSED: false,
        BACK_COLOR: { r: 0, g: 0, b: 0 },
        TRANSPARENT: true,
        BLOOM: false,
        SUNRAYS: false,
      });
    }

    // Throttle mousemove to ~30fps to reduce event dispatch overhead
    let lastMove = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMove < 32) return; // Skip if <32ms since last event
      lastMove = now;
      if (canvasRef.current) {
        const event = new MouseEvent('mousemove', {
          clientX: e.clientX,
          clientY: e.clientY,
          bubbles: true,
        });
        canvasRef.current.dispatchEvent(event);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0"
      style={{
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        opacity: 0.8
      }}
    />
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      lerp: 0.1,  // Increased from 0.05 — fewer interpolation frames needed to converge
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Reset scroll on route change
    lenis.scrollTo(0, { immediate: true });

    // Add Firefox class for CSS optimizations
    if (navigator.userAgent.includes('Firefox')) {
      document.documentElement.classList.add('is-firefox');
    }

    return () => {
      lenis.destroy();
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-accent selection:text-bg relative">
      {/* Soft Glowing Background Image */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=60&w=1280&auto=format&fit=crop"
          alt="Glowing Background"
          className="w-full h-full object-cover opacity-[0.15]"
          loading="lazy"
          decoding="async"
        />
        {/* Gradient overlay to ensure text remains readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/80 via-bg/90 to-bg"></div>
      </div>

      <FluidBackground />
      <div className="noise-overlay z-10 pointer-events-none"></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-40 bg-bg/80 backdrop-blur-md border-b border-surface/50 shadow-sm transition-all duration-300">
        <Link to="/" className="font-sans text-xl md:text-2xl tracking-tighter flex items-baseline">
          AKP<span className="text-accent ml-1 animate-pulse">.</span>
        </Link>

        {location.pathname === '/' && (
          <div className="hidden md:flex gap-8 font-mono text-sm uppercase tracking-widest">
            <a href="#about" className="hover:text-accent transition-colors">About</a>
            <a href="#github" className="hover:text-accent transition-colors">GitHub</a>
            <a href="#projects" className="hover:text-accent transition-colors">Projects</a>
            <a href="#experience" className="hover:text-accent transition-colors">Experience</a>
          </div>
        )}

        <div className="flex items-center gap-3 md:gap-6">
          <a href="https://www.linkedin.com/in/dityakp/" target="_blank" rel="noopener noreferrer" className="text-fg hover:text-accent transition-colors">
            <Linkedin size={18} className="md:w-5 md:h-5" />
          </a>
          <Link to="/contact" className="hidden sm:block font-mono text-xs md:text-sm border border-fg px-3 py-2 md:px-4 md:py-2 hover:bg-fg hover:text-bg transition-colors uppercase">
            Init Contact
          </Link>
          {/* Mobile Menu Toggle */}
          {location.pathname === '/' && (
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-fg hover:text-accent transition-colors p-1">
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && location.pathname === '/' && (
        <div className="fixed inset-0 z-[35] bg-bg/95 backdrop-blur-lg pt-24 px-6 flex flex-col gap-6 md:hidden">
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="font-mono text-2xl uppercase tracking-widest text-fg hover:text-accent transition-colors border-b border-surface pb-4">About</a>
          <a href="#github" onClick={() => setMobileMenuOpen(false)} className="font-mono text-2xl uppercase tracking-widest text-fg hover:text-accent transition-colors border-b border-surface pb-4">GitHub</a>
          <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="font-mono text-2xl uppercase tracking-widest text-fg hover:text-accent transition-colors border-b border-surface pb-4">Projects</a>
          <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="font-mono text-2xl uppercase tracking-widest text-fg hover:text-accent transition-colors border-b border-surface pb-4">Experience</a>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="font-mono text-2xl uppercase tracking-widest text-accent hover:text-fg transition-colors border-b border-surface pb-4">Init Contact</Link>
        </div>
      )}

      <main className="relative z-20">
        {children}
      </main>
    </div>
  );
}
