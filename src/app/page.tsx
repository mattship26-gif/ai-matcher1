'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [text, setText] = useState('')
  const fullText = 'FIND YOUR PERFECT AI TOOL'

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-black terminal-grid scanlines relative">
      {/* Ambient glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 py-20 max-w-5xl relative z-10">
        {/* Terminal header */}
        <div className="mb-12 font-mono text-sm text-green-400/60">
          <div className="mb-2">$ initializing AI_TOOLKIT_MATCHER v3.0.1</div>
          <div className="mb-2">$ loading neural networks... <span className="text-green-400">✓</span></div>
          <div className="mb-6">$ system ready <span className="text-green-400 cursor-blink"></span></div>
        </div>

        {/* Main header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black mb-6 font-mono tracking-tight">
            <span className="text-green-400 neon-glow">{text}</span>
            <span className="text-green-400 animate-pulse">█</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Neural-powered matching algorithm • Industry-specific recommendations • Zero bullshit
          </p>
        </div>

        {/* Main card */}
        <div className="relative group">
          {/* Glow effect behind card */}
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
          
          <div className="relative bg-gradient-to-br from-zinc-950 to-black border border-green-500/30 rounded-2xl p-10 backdrop-blur-xl">
            {/* Stats grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              <div className="text-center group/stat">
                <div className="text-4xl font-black font-mono text-green-400 mb-2 group-hover/stat:neon-glow transition-all">
                  16<span className="text-2xl">+</span>
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wider font-mono">AI Tools Mapped</div>
              </div>
              
              <div className="text-center group/stat">
                <div className="text-4xl font-black font-mono text-blue-400 mb-2 group-hover/stat:neon-glow-blue transition-all">
                  10<span className="text-2xl">+</span>
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wider font-mono">Industries</div>
              </div>
              
              <div className="text-center group/stat">
                <div className="text-4xl font-black font-mono text-purple-400 mb-2 transition-all">
                  &lt;2<span className="text-2xl">min</span>
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wider font-mono">To Results</div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent mb-10" />

            {/* Features */}
            <div className="space-y-5 mb-10">
              <div className="flex items-start space-x-4 group/feature">
                <div className="text-green-400 text-2xl mt-1 group-hover/feature:neon-glow transition-all">›</div>
                <div>
                  <h3 className="text-white font-semibold mb-1 font-mono">Industry-Specific Matching</h3>
                  <p className="text-gray-500 text-sm">Accountant? Developer? Marketer? Get tools built for YOUR job.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group/feature">
                <div className="text-blue-400 text-2xl mt-1 group-hover/feature:neon-glow-blue transition-all">›</div>
                <div>
                  <h3 className="text-white font-semibold mb-1 font-mono">Role-Based Intelligence</h3>
                  <p className="text-gray-500 text-sm">Tailored to your specific role, tasks, and pain points.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group/feature">
                <div className="text-purple-400 text-2xl mt-1 transition-all">›</div>
                <div>
                  <h3 className="text-white font-semibold mb-1 font-mono">Zero Marketing Fluff</h3>
                  <p className="text-gray-500 text-sm">Real recommendations based on how you actually work.</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => router.push('/quiz')}
              className="w-full relative group/btn overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 opacity-75 group-hover/btn:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 blur-xl opacity-50 group-hover/btn:opacity-75 transition-opacity" />
              <div className="relative bg-black border-2 border-green-400 text-green-400 font-bold py-4 px-8 font-mono text-lg uppercase tracking-wider hover:bg-green-400/10 transition-all m-[2px]">
                [ Initialize Analysis ] →
              </div>
            </button>
          </div>
        </div>

        {/* Footer note */}
        <div className="text-center mt-8 font-mono text-xs text-gray-600">
          <span className="text-green-400/40">// </span>
          No tracking • No data collection • Open source mindset
          <span className="text-green-400/40 cursor-blink ml-1"></span>
        </div>
      </div>
    </div>
  )
}
