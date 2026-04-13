import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Linkedin } from 'lucide-react';
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
        SIM_RESOLUTION: 128,
        DYE_RESOLUTION: 1024,
        CAPTURE_RESOLUTION: 512,
        DENSITY_DISSIPATION: 1.2, // Lower = lasts longer
        VELOCITY_DISSIPATION: 0.8, // Lower = more fluid/wavy
        PRESSURE: 0.1, // Lower = more swirly
        PRESSURE_ITERATIONS: 20,
        CURL: 15, // Higher = more waves and curls
        SPLAT_RADIUS: 0.4,
        SPLAT_FORCE: 6000,
        SHADING: true,
        COLORFUL: false,
        COLOR_UPDATE_SPEED: 0,
        PAUSED: false,
        BACK_COLOR: { r: 0, g: 0, b: 0 },
        TRANSPARENT: true,
        BLOOM: false,
        SUNRAYS: false,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const event = new MouseEvent('mousemove', {
          clientX: e.clientX,
          clientY: e.clientY,
          bubbles: true,
        });
        canvasRef.current.dispatchEvent(event);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

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
        pointerEvents: 'auto',
        filter: 'grayscale(100%) brightness(1.5) contrast(1.2)'
      }}
    />
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      lerp: 0.05, // Lower value creates more inertia/smoothness
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

    return () => {
      lenis.destroy();
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-accent selection:text-bg relative">
      {/* Soft Glowing Background Image */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2564&auto=format&fit=crop" 
          alt="Glowing Background" 
          className="w-full h-full object-cover opacity-[0.15] mix-blend-screen"
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

        <div className="flex items-center gap-4 md:gap-6">
          <a href="https://www.linkedin.com/in/dityakp/" target="_blank" rel="noopener noreferrer" className="text-fg hover:text-accent transition-colors">
            <Linkedin size={20} />
          </a>
          <Link to="/contact" className="font-mono text-xs md:text-sm border border-fg px-3 py-2 md:px-4 md:py-2 hover:bg-fg hover:text-bg transition-colors uppercase">
            Init Contact
          </Link>
        </div>
      </nav>

      <main className="relative z-20">
        {children}
      </main>
    </div>
  );
}
