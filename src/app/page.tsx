'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const stats = [
    { number: '100+', label: 'AI Tools Analyzed', icon: '🤖' },
    { number: '15+', label: 'Industries Covered', icon: '🏢' },
    { number: '50+', label: 'Role-Specific Flows', icon: '👥' },
    { number: '< 2min', label: 'To Get Results', icon: '⚡' }
  ]

  const problems = [
    {
      title: 'Too Many Options',
      description: 'New AI tools launch every day. How do you know which ones actually matter for YOUR work?',
      icon: '🤯'
    },
    {
      title: 'Wasted Time & Money',
      description: 'Trying random tools hoping something sticks wastes hours and subscription dollars.',
      icon: '💸'
    },
    {
      title: 'Generic Advice',
      description: '"ChatGPT is great!" Yes, but what about the 20 specialized tools that might work better for your specific needs?',
      icon: '🎯'
    }
  ]

  const howItWorks = [
    {
      step: '01',
      title: 'Tell Us About Your Work',
      description: 'Industry, role, daily tasks, pain points, and preferences',
      time: '~90 seconds'
    },
    {
      step: '02',
      title: 'Our Algorithm Analyzes',
      description: 'Multi-factor scoring across 100+ tools based on your specific needs',
      time: 'Instant'
    },
    {
      step: '03',
      title: 'Get Personalized Matches',
      description: 'Ranked recommendations with clear explanations of WHY each tool fits',
      time: 'Actionable'
    }
  ]

  const exampleRoles = [
    '👨‍💼 Financial Analyst', '👩‍💻 Software Developer', '⚖️ Attorney',
    '📱 Content Creator', '📊 Data Scientist', '🎨 Designer',
    '💼 Consultant', '📈 Sales Rep', '🏥 Healthcare Professional'
  ]

  return (
    <div className="min-h-screen bg-black terminal-grid scanlines relative overflow-hidden">
      {/* Animated cursor glow */}
      <div 
        className="fixed w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[150px] pointer-events-none transition-all duration-1000 ease-out"
        style={{ 
          left: mousePosition.x - 300, 
          top: mousePosition.y - 300,
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        {/* Background effects */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-green-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="relative max-w-5xl mx-auto text-center">
          {/* Terminal-style header */}
          <div className="font-mono text-xs text-green-400/60 mb-6 animate-fade-in">
            <span className="text-green-400">$</span> initializing ai_matchmaker.exe
          </div>

          {/* Main headline */}
          <h1 className="text-6xl md:text-8xl font-black font-mono text-white mb-8 neon-glow leading-none animate-slide-up">
            STOP GUESSING.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
              START MATCHING.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Find the perfect AI tools for your <span className="text-white font-semibold">exact role</span>, 
            <span className="text-white font-semibold"> workflow</span>, and 
            <span className="text-white font-semibold"> challenges</span> in under 2 minutes.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link
              href="/quiz"
              className="group/cta relative inline-block"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-xl blur-lg opacity-75 group-hover/cta:opacity-100 transition-opacity" />
              <div className="relative bg-black border-2 border-green-400 rounded-xl px-12 py-6 font-mono font-bold text-lg text-green-400 hover:bg-green-400/10 transition-all flex items-center space-x-3">
                <span>GET YOUR MATCHES</span>
                <span className="text-2xl group-hover/cta:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
            
            <div className="flex items-center space-x-2 text-gray-600 font-mono text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Free • No signup • 2 minutes</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {stats.map((stat, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
                className="relative group/stat"
              >
                {hoveredStat === index && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500/30 to-blue-500/30 rounded-lg blur-md" />
                )}
                <div className={`relative bg-zinc-950/50 border rounded-lg p-6 transition-all ${
                  hoveredStat === index ? 'border-green-400/50 transform scale-105' : 'border-green-500/20'
                }`}>
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-black font-mono text-white mb-1">{stat.number}</div>
                  <div className="text-xs text-gray-500 font-mono">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="relative px-6 py-32 border-t border-green-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="font-mono text-sm text-green-400 mb-4 uppercase tracking-wider">
              <span className="text-green-400/40">// </span>THE PROBLEM
            </div>
            <h2 className="text-4xl md:text-5xl font-black font-mono text-white mb-6">
              AI Tool Overload Is <span className="text-red-400">Real</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              There are 100+ AI tools out there. Most advice is generic. You need something tailored to YOUR work.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <div key={index} className="relative group/problem">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl blur-lg opacity-0 group-hover/problem:opacity-100 transition-opacity" />
                <div className="relative bg-zinc-950/80 border border-red-500/20 group-hover/problem:border-red-400/50 rounded-xl p-8 transition-all">
                  <div className="text-5xl mb-4">{problem.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{problem.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{problem.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative px-6 py-32 border-t border-green-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="font-mono text-sm text-green-400 mb-4 uppercase tracking-wider">
              <span className="text-green-400/40">// </span>THE SOLUTION
            </div>
            <h2 className="text-4xl md:text-5xl font-black font-mono text-white mb-6">
              How It <span className="text-green-400">Actually Works</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              No generic listicles. No one-size-fits-all recommendations. Just smart matching.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative">
                {/* Connector line */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-green-500/50 to-transparent -z-10" />
                )}
                
                <div className="relative group/step">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl blur-lg opacity-0 group-hover/step:opacity-100 transition-opacity" />
                  <div className="relative bg-zinc-950/80 border border-green-500/30 group-hover/step:border-green-400/50 rounded-xl p-8 transition-all">
                    {/* Step number */}
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full font-mono font-black text-2xl text-white mb-6">
                      {item.step}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400 mb-4 leading-relaxed">{item.description}</p>
                    <div className="font-mono text-xs text-green-400 uppercase tracking-wider">
                      ⏱️ {item.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Examples Section */}
      <section className="relative px-6 py-32 border-t border-green-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="font-mono text-sm text-green-400 mb-4 uppercase tracking-wider">
              <span className="text-green-400/40">// </span>FOR EVERY ROLE
            </div>
            <h2 className="text-4xl md:text-5xl font-black font-mono text-white mb-6">
              Tailored For <span className="text-blue-400">Your</span> Work
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Role-specific questions and recommendations across 15+ industries
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {exampleRoles.map((role, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-zinc-950/50 border border-green-500/30 hover:border-green-400/50 rounded-full font-medium text-gray-300 hover:text-white transition-all cursor-default"
              >
                {role}
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-500 font-mono text-sm mb-6">
              + many more specialized roles
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative px-6 py-32 border-t border-green-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black font-mono text-white mb-8">
            READY TO FIND<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              YOUR PERFECT AI TOOLS?
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Stop wasting time on tools that weren't built for you. Get personalized recommendations in 2 minutes.
          </p>

          <Link
            href="/quiz"
            className="group/final relative inline-block"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-2xl blur-2xl opacity-75 group-hover/final:opacity-100 transition-opacity" />
            <div className="relative bg-black border-4 border-green-400 rounded-2xl px-16 py-8 font-mono font-black text-2xl text-green-400 hover:bg-green-400/10 transition-all">
              <span>START NOW</span>
              <span className="ml-4 text-3xl group-hover/final:translate-x-2 inline-block transition-transform">→</span>
            </div>
          </Link>

          <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-600 font-mono">
            <div className="flex items-center space-x-2">
              <span className="text-green-400">✓</span>
              <span>100% Free</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400">✓</span>
              <span>No Email Required</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400">✓</span>
              <span>Takes 2 Minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 py-12 border-t border-green-500/20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="font-mono text-xs text-gray-700 mb-4">
            <span className="text-green-400/40">// </span>
            Powered by multi-factor neural matching algorithm
          </div>
          <div className="font-mono text-xs text-gray-800">
            Analyzing 100+ AI tools across 15+ industries
            <span className="text-green-400/40 cursor-blink ml-1"></span>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
      `}</style>
    </div>
  )
}
