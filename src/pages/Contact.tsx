import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div className="min-h-screen pt-32 px-6 md:px-12 flex flex-col relative overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <Link to="/" className="inline-flex items-center gap-2 font-mono text-accent hover:text-fg transition-colors mb-12">
          <ArrowLeft size={16} /> BACK TO TERMINAL
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-8xl font-sans mb-4 text-stroke"
        >
          INITIATE
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-sans mb-12 text-accent"
        >
          CONNECTION
        </motion.h1>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          action="https://formspree.io/f/xnjoedgn"
          method="POST"
          className="flex flex-col gap-8 font-mono bg-surface/30 p-6 md:p-12 border border-surface backdrop-blur-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-accent text-sm tracking-widest">_NAME</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="bg-bg border border-surface-hover p-4 text-fg focus:border-accent outline-none transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-accent text-sm tracking-widest">_EMAIL</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="bg-bg border border-surface-hover p-4 text-fg focus:border-accent outline-none transition-colors"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-accent text-sm tracking-widest">_MESSAGE</label>
            <textarea
              name="message"
              id="message"
              rows={6}
              required
              className="bg-bg border border-surface-hover p-4 text-fg focus:border-accent outline-none transition-colors resize-none"
              placeholder="Enter your payload here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="group bg-accent text-bg font-sans text-xl py-4 flex items-center justify-center gap-4 hover:bg-fg transition-colors mt-4"
          >
            SEND_PAYLOAD <Send size={20} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.form>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-1/4 right-10 w-96 h-96 border border-surface rounded-full opacity-20 animate-spin-slow pointer-events-none" style={{ animationDuration: '40s' }}></div>
      <div className="absolute bottom-10 left-10 text-[20vw] font-sans text-surface opacity-10 pointer-events-none leading-none select-none">
        01
      </div>
    </div>
  );
}
