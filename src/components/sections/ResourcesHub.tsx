'use client'

import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import { IconBook, IconCpu, IconBinary } from '@tabler/icons-react'

const resources = [
  {
    title: 'REFERENCE MANUALS',
    description: 'Explore the comprehensive developer guides, API references, configuration manuals, and hardware specs.',
    href: '/documentation',
    btnLabel: 'BROWSE DOCS',
    icon: IconBook,
  },
  {
    title: 'INTERACTIVE SCHEMATICS',
    description: 'Explore our interactive 3D PCB layout viewers, download schematic PDFs, and check trace designs.',
    href: '/schematics',
    btnLabel: 'EXPLORE VIEWER',
    icon: IconCpu,
  },
  {
    title: 'FIRMWARE BINARIES',
    description: 'Download ready-to-flash binaries, view compilation steps, and get the core board support package source.',
    href: '/firmware',
    btnLabel: 'GET FIRMWARE',
    icon: IconBinary,
  },
]

export default function ResourcesHub() {
  return (
    <section id="developer-resources" className="section-padding bg-dark border-t border-dark-border relative">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] bg-yellow/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16 text-center">
          <SectionHeading
            label="DEVELOPER RESOURCES"
            heading="ACCESS THE BLUEPRINTS"
            subheading="Comprehensive tools and reference guides for developers and hardware engineers"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((res) => {
            const Icon = res.icon
            return (
              <div
                key={res.title}
                className="group bg-dark-card border border-dark-border rounded-lg p-8 flex flex-col justify-between transition-all duration-300 hover:border-yellow/45 hover:shadow-[0_0_30px_rgba(0,255,85,0.06)]"
              >
                <div>
                  <div className="size-14 rounded-lg bg-yellow/5 border border-yellow/10 flex items-center justify-center mb-6 group-hover:bg-yellow group-hover:border-yellow transition-all duration-300">
                    <Icon size={24} className="text-yellow group-hover:text-dark transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-unbounded font-black uppercase text-white tracking-wider mb-4">
                    {res.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-8">
                    {res.description}
                  </p>
                </div>
                <div>
                  <Button variant="secondary" href={res.href}>
                    {res.btnLabel} →
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
