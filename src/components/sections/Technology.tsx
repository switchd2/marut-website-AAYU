'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import { IconPlane, IconDrone, IconPropeller, IconChevronDown } from '@tabler/icons-react'

const modes = [
  {
    icon: IconPlane,
    title: 'FIXED WING',
    body: 'Optimised PID loops for fixed-wing aerodynamics, with full support for traditional rudder, elevator, and aileron configurations.',
  },
  {
    icon: IconDrone,
    title: 'VTOL',
    body: 'Seamless transition logic between hover and cruise modes. Handles tilt-rotor, tailsitter, and hybrid VTOL configurations.',
  },
  {
    icon: IconPropeller,
    title: 'MULTIROTOR',
    body: 'Proposed multirotor firmware with support for quadcopters, hexacopters and custom frame geometries.',
  },
]

export default function Technology() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  return (
    <section id="technology" className="section-padding max-w-7xl mx-auto px-6">
      <div className="mb-16">
        <SectionHeading
          label="THE TECHNOLOGY"
          heading="One FCU. Three Modes."
          subheading="Infinite possibilities."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {modes.map((mode) => {
          const Icon = mode.icon
          return (
            <div key={mode.title} className="relative bg-dark-card border border-dark-border rounded-lg p-8 group hover:border-yellow/40 hover:shadow-[0_0_20px_rgba(0,255,85,0.15)] transition-all duration-300">
              <Icon size={32} className="text-yellow mb-6" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">{mode.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{mode.body}</p>
            </div>
          )
        })}
      </div>

      <div className="border border-dark-border rounded-lg p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <p className="text-xl font-bold text-white">&quot;All three modes. One unified codebase. One community.&quot;</p>
        
        <div className="relative w-full sm:w-auto" ref={dropdownRef}>
          <Button variant="primary" onClick={() => setDropdownOpen(!dropdownOpen)}>
            EXPLORE THE ARCHITECTURE <IconChevronDown size={16} className={`inline ml-2 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
          </Button>

          {dropdownOpen && (
            <div className="absolute right-0 bottom-full md:bottom-auto md:top-full mb-3 md:mb-0 md:mt-2 w-full sm:w-56 bg-dark-card border border-dark-border rounded shadow-[0_4px_25px_rgba(0,0,0,0.9)] z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <Link 
                href="/firmware" 
                className="block px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-white/80 hover:text-yellow hover:bg-dark-surface/50 border-b border-dark-border transition-colors"
              >
                Firmware Suite
              </Link>
              <Link 
                href="/schematics" 
                className="block px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-white/80 hover:text-yellow hover:bg-dark-surface/50 border-b border-dark-border transition-colors"
              >
                PCB Schematics
              </Link>
              <Link 
                href="/documentation" 
                className="block px-5 py-3.5 text-xs font-bold uppercase tracking-widest text-white/80 hover:text-yellow hover:bg-dark-surface/50 transition-colors"
              >
                Documentation
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
