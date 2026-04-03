'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const [typedText, setTypedText] = useState('');
  const fullText = '> finding your perfect AI solution...';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden grid-bg">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-terminal-accent rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Header with glitch effect */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="text-terminal-accent text-sm mb-4 font-mono">
            {'['}SYSTEM INITIALIZED{']'}
          </div>
          <h1 
            className="text-6xl md:text-8xl font-bold mb-4 glitch"
            data-text="AI.MATCH"
          >
            AI.MATCH
          </h1>
          <div className="h-1 w-32 bg-terminal-accent mx-auto animate-glow" />
        </motion.div>

        {/* Typed subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-12"
        >
          <p className="text-terminal-accent text-xl md:text-2xl font-mono mb-2">
            {typedText}
            <span className="cursor" />
          </p>
          <p className="text-terminal-textDim text-base md:text-lg mt-6 leading-relaxed">
            Stop drowning in AI tool lists. Our algorithm matches you with the <br className="hidden md:block" />
            perfect solutions for your business in under 2 minutes.
          </p>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="space-y-6"
        >
          <button
            onClick={onStart}
            className="group relative px-12 py-5 bg-transparent border-2 border-terminal-accent text-terminal-accent font-mono text-lg font-bold overflow-hidden transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <span>{'>'} INITIALIZE SCAN</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
            <motion.div
              className="absolute inset-0 bg-terminal-accent"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="absolute inset-0 z-10 flex items-center justify-center text-terminal-bg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {'>'} INITIALIZE SCAN →
            </span>
          </button>

          <div className="flex items-center justify-center gap-8 text-terminal-textDim text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-terminal-accent rounded-full animate-pulse" />
              <span>Free Forever</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-terminal-accent rounded-full animate-pulse" />
              <span>2 Min Quiz</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-terminal-accent rounded-full animate-pulse" />
              <span>Instant Results</span>
            </div>
          </div>
        </motion.div>

        {/* Bottom terminal window */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-20 border border-terminal-border bg-terminal-darker/50 backdrop-blur p-6 text-left"
        >
          <div className="flex items-center gap-2 mb-4 border-b border-terminal-border pb-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-terminal-accent" />
            <span className="text-terminal-textDim text-xs ml-2">system.log</span>
          </div>
          <div className="font-mono text-sm space-y-1 text-terminal-textDim">
            <div>
              <span className="text-terminal-accent">$</span> Analyzing 20+ AI solutions...
            </div>
            <div>
              <span className="text-terminal-accent">$</span> Matching algorithm ready
            </div>
            <div>
              <span className="text-terminal-accent">$</span> Waiting for user input...
              <span className="animate-pulse ml-1">_</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
