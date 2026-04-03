'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizAnswers, matchSolutions } from '@/lib/matcher';

interface ResultsProps {
  answers: QuizAnswers;
  onRestart: () => void;
}

export default function Results({ answers, onRestart }: ResultsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [matches, setMatches] = useState<any[]>([]);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  useEffect(() => {
    // Simulate processing with progress
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Actually calculate matches
    setTimeout(() => {
      const results = matchSolutions(answers);
      setMatches(results.slice(0, 5)); // Top 5 matches
      setTimeout(() => setIsLoading(false), 500);
    }, 2000);

    return () => clearInterval(progressInterval);
  }, [answers]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 grid-bg">
        <div className="max-w-2xl w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border-2 border-terminal-accent bg-terminal-darker/90 backdrop-blur p-12 text-center"
          >
            {/* Animated logo/icon */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 mx-auto mb-8 border-4 border-terminal-accent border-t-transparent rounded-full"
            />

            <h2 className="text-3xl font-bold text-terminal-accent mb-6 font-mono">
              ANALYZING YOUR DATA...
            </h2>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="h-2 bg-terminal-border relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-terminal-accent"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <div className="text-terminal-textDim text-sm mt-2 font-mono">
                {loadingProgress}% complete
              </div>
            </div>

            {/* Loading steps */}
            <div className="text-left space-y-2 text-terminal-textDim font-mono text-sm">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: loadingProgress > 20 ? 1 : 0.3 }}
              >
                <span className="text-terminal-accent">✓</span> Parsing industry requirements...
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: loadingProgress > 40 ? 1 : 0.3 }}
              >
                <span className="text-terminal-accent">✓</span> Matching use cases to database...
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: loadingProgress > 60 ? 1 : 0.3 }}
              >
                <span className="text-terminal-accent">✓</span> Calculating compatibility scores...
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: loadingProgress > 80 ? 1 : 0.3 }}
              >
                <span className="text-terminal-accent">✓</span> Ranking solutions...
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: loadingProgress === 100 ? 1 : 0.3 }}
              >
                <span className="text-terminal-accent">✓</span> Finalizing recommendations...
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6 grid-bg">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 border border-terminal-accent bg-terminal-accent/10">
            <div className="w-3 h-3 bg-terminal-accent rounded-full animate-pulse" />
            <span className="text-terminal-accent font-mono text-sm">MATCH COMPLETE</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-terminal-text mb-4 font-mono glitch" data-text="YOUR MATCHES">
            YOUR MATCHES
          </h1>
          <p className="text-terminal-textDim font-mono">
            Found {matches.length} AI solutions tailored to your needs
          </p>
        </motion.div>

        {/* Results grid */}
        <div className="space-y-6 mb-12">
          {matches.map((solution, index) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-2 border-terminal-border bg-terminal-darker/80 backdrop-blur hover:border-terminal-accent transition-all duration-300"
            >
              {/* Card header */}
              <div className="p-6 border-b border-terminal-border">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-terminal-accent font-mono text-sm">
                        #{index + 1}
                      </span>
                      <h3 className="text-2xl font-bold text-terminal-text font-mono">
                        {solution.name}
                      </h3>
                    </div>
                    <p className="text-terminal-textDim mb-4">
                      {solution.description}
                    </p>

                    {/* Match score */}
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="text-terminal-textDim text-sm font-mono">MATCH:</span>
                        <div className="h-2 w-24 bg-terminal-border relative overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${solution.score}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="absolute inset-y-0 left-0 bg-terminal-accent"
                          />
                        </div>
                        <span className="text-terminal-accent font-mono text-sm font-bold">
                          {Math.round(solution.score)}%
                        </span>
                      </div>

                      <div className="px-3 py-1 bg-terminal-accent/10 border border-terminal-accent text-terminal-accent text-xs font-mono">
                        {solution.pricing.range}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setExpandedCard(expandedCard === solution.id ? null : solution.id)}
                    className="px-4 py-2 border border-terminal-border hover:border-terminal-accent text-terminal-textDim hover:text-terminal-accent transition-colors font-mono text-sm"
                  >
                    {expandedCard === solution.id ? 'HIDE' : 'DETAILS'}
                  </button>
                </div>

                {/* Match reasons */}
                {solution.matchReasons.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {solution.matchReasons.map((reason: string, i: number) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 + i * 0.05 }}
                        className="text-xs px-3 py-1 bg-terminal-accent/5 text-terminal-accent border border-terminal-accent/30 font-mono"
                      >
                        ✓ {reason}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Expanded details */}
              <AnimatePresence>
                {expandedCard === solution.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 space-y-6">
                      {/* Best for */}
                      <div>
                        <h4 className="text-terminal-accent font-mono text-sm mb-2">BEST FOR:</h4>
                        <p className="text-terminal-text">{solution.bestFor}</p>
                      </div>

                      {/* Pros and Cons */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-terminal-accent font-mono text-sm mb-3">PROS:</h4>
                          <ul className="space-y-2">
                            {solution.pros.map((pro: string, i: number) => (
                              <li key={i} className="text-terminal-textDim text-sm flex items-start gap-2">
                                <span className="text-terminal-accent mt-1">+</span>
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-red-400 font-mono text-sm mb-3">CONS:</h4>
                          <ul className="space-y-2">
                            {solution.cons.map((con: string, i: number) => (
                              <li key={i} className="text-terminal-textDim text-sm flex items-start gap-2">
                                <span className="text-red-400 mt-1">-</span>
                                <span>{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Integrations */}
                      {solution.integrations.length > 0 && (
                        <div>
                          <h4 className="text-terminal-accent font-mono text-sm mb-3">INTEGRATIONS:</h4>
                          <div className="flex flex-wrap gap-2">
                            {solution.integrations.map((integration: string, i: number) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-terminal-border text-terminal-textDim text-xs font-mono"
                              >
                                {integration}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tech level indicator */}
                      <div>
                        <h4 className="text-terminal-accent font-mono text-sm mb-3">TECH LEVEL:</h4>
                        <div className="flex items-center gap-2">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`h-2 w-12 ${
                                i < solution.techLevel
                                  ? 'bg-terminal-accent'
                                  : 'bg-terminal-border'
                              }`}
                            />
                          ))}
                          <span className="text-terminal-textDim text-sm ml-2 font-mono">
                            {solution.techLevel === 1 && 'Beginner-friendly'}
                            {solution.techLevel === 2 && 'Easy to learn'}
                            {solution.techLevel === 3 && 'Moderate complexity'}
                            {solution.techLevel === 4 && 'Advanced features'}
                            {solution.techLevel === 5 && 'Expert-level'}
                          </span>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="pt-4 border-t border-terminal-border">
                        <a
                          href={solution.affiliateLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 px-8 py-4 bg-terminal-accent text-terminal-bg font-mono font-bold hover:bg-terminal-accentDim transition-colors"
                        >
                          <span>TRY {solution.name.toUpperCase()}</span>
                          <span>→</span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* No matches message */}
        {matches.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border-2 border-terminal-border bg-terminal-darker/80 p-12 text-center"
          >
            <div className="text-6xl mb-4">🤔</div>
            <h3 className="text-2xl font-bold text-terminal-text mb-4 font-mono">
              NO STRONG MATCHES FOUND
            </h3>
            <p className="text-terminal-textDim mb-6">
              Your criteria might be too specific, or we need more solutions in our database.
              Try adjusting your answers.
            </p>
            <button
              onClick={onRestart}
              className="px-8 py-4 border-2 border-terminal-accent text-terminal-accent font-mono font-bold hover:bg-terminal-accent hover:text-terminal-bg transition-all"
            >
              TRY AGAIN
            </button>
          </motion.div>
        )}

        {/* Bottom actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 border border-terminal-border bg-terminal-darker/50"
        >
          <div className="text-center md:text-left">
            <p className="text-terminal-textDim font-mono text-sm">
              Not quite right? Adjust your answers and find better matches
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={onRestart}
              className="px-6 py-3 border border-terminal-border text-terminal-textDim hover:border-terminal-accent hover:text-terminal-accent transition-all font-mono"
            >
              ← START OVER
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-6 py-3 border-2 border-terminal-accent text-terminal-accent hover:bg-terminal-accent hover:text-terminal-bg transition-all font-mono font-bold"
            >
              ↑ BACK TO TOP
            </button>
          </div>
        </motion.div>

        {/* Footer terminal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 border border-terminal-border bg-terminal-darker/50 p-6"
        >
          <div className="flex items-center gap-2 mb-4 border-b border-terminal-border pb-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-terminal-accent" />
            <span className="text-terminal-textDim text-xs ml-2 font-mono">match.log</span>
          </div>
          <div className="font-mono text-sm space-y-1 text-terminal-textDim">
            <div>
              <span className="text-terminal-accent">$</span> Matched {matches.length} solutions
            </div>
            <div>
              <span className="text-terminal-accent">$</span> Top match: {matches[0]?.name} ({Math.round(matches[0]?.score)}% compatibility)
            </div>
            <div>
              <span className="text-terminal-accent">$</span> Industry: {answers.industry} | Size: {answers.companySize} | Budget: {answers.budget}
            </div>
            <div>
              <span className="text-terminal-accent">$</span> Session complete
              <span className="animate-pulse ml-1">_</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
