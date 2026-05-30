'use client'

import { useState } from 'react'
import Image from 'next/image'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import { IconCode, IconBug, IconShare, IconUser } from '@tabler/icons-react'
import { useGitHub } from '@/context/GitHubContext'

export default function Community() {
  const { data, loading } = useGitHub()
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const contributors = data?.contributors || [
    { login: 'lawslefthand', avatar_url: 'https://github.com/lawslefthand.png', html_url: 'https://github.com/lawslefthand' }
  ]

  const handleShareClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (navigator.share) {
      navigator.share({
        title: 'Marut FCU',
        text: 'Check out Marut FCU, India\'s first fully open-source tri-mode Flight Control Unit!',
        url: 'https://github.com/lawslefthand/Marut_FCU/',
      }).catch((err) => {
        console.log('Error sharing:', err)
        setIsShareOpen(true)
      })
    } else {
      setIsShareOpen(true)
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://github.com/lawslefthand/Marut_FCU/')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="section-padding max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <SectionHeading 
          heading="BUILT BY THE COMMUNITY" 
          subheading="Join a growing team of engineers, pilots, and open-source enthusiasts."
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* Card 1: CONTRIBUTE CODE */}
        <a 
          href="https://github.com/lawslefthand/Marut_FCU/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-dark-card border border-dark-border rounded-lg p-8 text-center block hover:border-yellow/40 hover:shadow-[0_0_20px_rgba(0,255,85,0.15)] hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        >
          <IconCode size={32} className="text-yellow mb-5 mx-auto" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-3">CONTRIBUTE CODE</h3>
          <p className="text-sm text-white/50 leading-relaxed">Submit PRs, fix bugs, build features. All skill levels welcome.</p>
        </a>

        {/* Card 2: REPORT ISSUES */}
        <a 
          href="https://github.com/lawslefthand/Marut_FCU/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-dark-card border border-dark-border rounded-lg p-8 text-center block hover:border-yellow/40 hover:shadow-[0_0_20px_rgba(0,255,85,0.15)] hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        >
          <IconBug size={32} className="text-yellow mb-5 mx-auto" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-3">REPORT ISSUES</h3>
          <p className="text-sm text-white/50 leading-relaxed">Help us find and squash problems. Open an issue on GitHub.</p>
        </a>

        {/* Card 3: SPREAD THE WORD */}
        <button
          type="button"
          onClick={handleShareClick}
          className="bg-dark-card border border-dark-border rounded-lg p-8 text-center block hover:border-yellow/40 hover:shadow-[0_0_20px_rgba(0,255,85,0.15)] hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        >
          <IconShare size={32} className="text-yellow mb-5 mx-auto" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-3">SPREAD THE WORD</h3>
          <p className="text-sm text-white/50 leading-relaxed">Star the repo. Tell your community. Help the project grow.</p>
        </button>
      </div>
      
      <div className="text-sm font-semibold uppercase tracking-widest text-white/40 mb-6 text-center">
        OUR CONTRIBUTORS
      </div>
      
      <div className="flex flex-wrap justify-center gap-3 mb-8 max-w-4xl mx-auto min-h-[40px]">
        {loading ? (
          Array.from({ length: 12 }).map((_, idx) => (
            <div key={`contributor-skeleton-${idx}`} className="size-10 rounded-full bg-dark-surface border border-dark-border flex items-center justify-center animate-pulse">
              <IconUser size={16} className="text-white/20" />
            </div>
          ))
        ) : (
          contributors.map((c) => (
            <div key={c.login} className="group relative">
              <a 
                href={c.html_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block size-10 rounded-full overflow-hidden border border-dark-border hover:border-yellow hover:scale-110 transition-all duration-200"
              >
                <Image
                  src={c.avatar_url}
                  alt={c.login}
                  width={40}
                  height={40}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </a>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-dark-card border border-dark-border rounded text-[10px] uppercase font-bold tracking-widest text-yellow opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 shadow-lg">
                {c.login}
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="text-center">
        <Button variant="secondary" href="https://github.com/lawslefthand/Marut_FCU/">JOIN US ON GITHUB →</Button>
      </div>

      {isShareOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/80 backdrop-blur-sm p-4">
          <div className="bg-dark border border-yellow/30 rounded-lg p-6 max-w-md w-full relative shadow-[0_0_30px_rgba(0,255,85,0.15)]">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-unbounded font-black uppercase tracking-wider text-yellow">
                Spread the word
              </h3>
              <button type="button" 
                onClick={() => setIsShareOpen(false)}
                aria-label="Close share dialog"
                className="text-white/40 hover:text-white transition-colors text-lg"
              >
                ✕
              </button>
            </div>

            {/* Description */}
            <p className="text-sm text-white/70 leading-relaxed mb-6">
              Help Marut FCU grow by sharing India&apos;s first fully open-source tri-mode Flight Control Unit with your community.
            </p>

            {/* Link Copy Box */}
            <div className="flex border border-dark-border rounded bg-dark-surface p-1 mb-6 items-center">
              <input 
                type="text" 
                aria-label="GitHub repository link"
                readOnly 
                value="https://github.com/lawslefthand/Marut_FCU"
                className="bg-transparent text-xs text-white/85 px-3 py-2 flex-1 outline-none font-mono"
              />
              <button type="button" 
                onClick={handleCopyLink}
                aria-label="Copy GitHub repository link"
                className="text-xs font-bold uppercase tracking-wider bg-yellow text-dark px-4 py-2 rounded hover:bg-yellow-hover transition-colors"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            {/* Social Share Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("Check out Marut FCU, India's first fully open-source tri-mode Flight Control Unit! ✈️🛸")}&url=${encodeURIComponent("https://github.com/lawslefthand/Marut_FCU")}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-dark-border rounded py-2.5 px-3 hover:border-yellow/30 hover:bg-yellow/5 transition-all text-xs font-bold uppercase tracking-wider text-white"
              >
                Share on X
              </a>
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://github.com/lawslefthand/Marut_FCU")}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-dark-border rounded py-2.5 px-3 hover:border-yellow/30 hover:bg-yellow/5 transition-all text-xs font-bold uppercase tracking-wider text-white"
              >
                Share on LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
