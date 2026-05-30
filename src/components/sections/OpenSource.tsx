'use client'

import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import { useGitHub } from '@/context/GitHubContext'
import AnimatedNumber from '@/components/ui/AnimatedNumber'
import { IconGitFork } from '@tabler/icons-react'

export default function OpenSource() {
  const { data, loading } = useGitHub()

  const stars = data?.stars ?? 13
  const contributorsCount = data?.contributorsCount ?? 5
  const forks = data?.forks ?? 2

  return (
    <section id="open-source" className="section-padding bg-dark-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading heading="FULLY OPEN. FULLY YOURS." />

            <p className="text-white/60 text-base leading-relaxed mt-6 mb-8">
              Every schematic, every firmware commit, every PCB layout remains open to the world. Fork it, improve it, build on it. No CLAs. No commercial locks. Just open collaboration. FOREVER.
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-4 mb-8 items-center min-h-[24px]">
              {loading ? (
                <>
                  <div className="flex items-center gap-2">
                    <span>⭐</span>
                    <div className="h-5 w-24 bg-dark-border animate-pulse rounded" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span>👥</span>
                    <div className="h-5 w-24 bg-dark-border animate-pulse rounded" />
                  </div>
                  <div className="flex items-center gap-2">
                    <IconGitFork size={18} className="text-white/30" />
                    <div className="h-5 w-16 bg-dark-border animate-pulse rounded" />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">
                      ⭐ <AnimatedNumber value={stars} /> GitHub Stars
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">
                      👥 <AnimatedNumber value={contributorsCount} /> Contributors
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <IconGitFork size={18} className="text-yellow" />
                    <span className="text-white font-bold">
                      <AnimatedNumber value={forks} /> Forks
                    </span>
                  </div>
                </>
              )}
            </div>

            <Button variant="primary" href="https://github.com/lawslefthand/Marut_FCU/">VIEW ON GITHUB →</Button>
          </div>

          <div className="bg-dark rounded-lg border border-dark-border overflow-hidden">
            <div className="bg-dark-surface border-b border-dark-border px-4 py-3 flex items-center gap-2">
              <div className="size-3 rounded-full bg-[#FF5F56]" />
              <div className="size-3 rounded-full bg-[#FFBD2E]" />
              <div className="size-3 rounded-full bg-[#27C93F]" />
              <div className="text-xs text-white/30 ml-2 font-mono">bash</div>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
              <div><span className="text-yellow">$</span> <span className="text-white">git clone https://github.com/lawslefthand/Marut_FCU.git</span></div>
              <div><span className="text-yellow">$</span> <span className="text-white">cd Marut_FCU</span></div>
              <div><span className="text-yellow">$</span> <span className="text-white">make configure TARGET=VTOL</span></div>
              <div><br /></div>
              <div><span className="text-white/50">&gt; Configuring Marut FCU v0.1.0...</span></div>
              <div><span className="text-green-400">&gt; Target: VTOL ✓</span></div>
              <div><span className="text-green-400">&gt; Build system: Ready ✓</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
