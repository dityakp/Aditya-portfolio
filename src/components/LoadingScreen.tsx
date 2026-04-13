import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('INITIALIZING_SYSTEM...');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400); // Wait a moment at 100% before completing
          return 100;
        }
        return p + Math.floor(Math.random() * 20) + 10;
      });
    }, 150);

    const textTimeout = setTimeout(() => {
      setText('LOADING_PORTFOLIO_DATA...');
    }, 800);

    return () => {
      clearInterval(interval);
      clearTimeout(textTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-bg flex flex-col items-center justify-center font-mono text-accent"
      exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="w-full max-w-md px-6">
        <div className="mb-4 text-sm tracking-widest flex justify-between">
          <span>{text}</span>
          <span>{Math.min(progress, 100)}%</span>
        </div>
        <div className="h-[2px] w-full bg-surface overflow-hidden">
          <motion.div 
            className="h-full bg-accent"
            initial={{ width: '0%' }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ ease: "linear", duration: 0.15 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
