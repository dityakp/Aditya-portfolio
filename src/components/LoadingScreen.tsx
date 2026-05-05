import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
  key?: string;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('ESTABLISHING_CONNECTION...');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        // Smooth logarithmic-feeling progress
        const increment = p > 80 ? Math.random() * 2 : Math.random() * 15 + 5;
        return Math.min(100, p + increment);
      });
    }, 100);

    const textTimeout1 = setTimeout(() => {
      setText('VERIFYING_CREDENTIALS...');
    }, 600);

    const textTimeout2 = setTimeout(() => {
      setText('INITIALIZING_WORKSPACE...');
    }, 1400);

    return () => {
      clearInterval(interval);
      clearTimeout(textTimeout1);
      clearTimeout(textTimeout2);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-bg flex flex-col items-center justify-center"
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(204,255,0,0.03)_0%,transparent_50%)] pointer-events-none"></div>

      <div className="w-full max-w-md px-8 relative z-10 flex flex-col items-center">
        
        {/* Logo / Title */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-sans font-bold tracking-tighter mb-12 flex items-baseline"
        >
          AKP<span className="text-accent animate-pulse">.</span>
        </motion.div>

        {/* Progress Bar Container */}
        <div className="w-full relative">
          
          {/* Top text info */}
          <div className="flex justify-between items-end mb-3 font-mono text-[10px] md:text-xs tracking-[0.2em] text-muted uppercase">
            <span className="opacity-70">{text}</span>
            <span className="text-accent font-bold tracking-widest">{Math.floor(progress)}%</span>
          </div>

          {/* The Bar */}
          <div className="h-[1px] w-full bg-surface/50 relative overflow-hidden">
            {/* Glowing active bar */}
            <motion.div 
              className="absolute top-0 left-0 h-full bg-accent shadow-[0_0_10px_rgba(204,255,0,0.8)]"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.2 }}
            />
          </div>

          {/* Bottom decorative marks */}
          <div className="flex justify-between mt-3 font-mono text-[8px] tracking-[0.3em] text-surface-hover">
            <span>SYS.01</span>
            <span>SEC.OK</span>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
