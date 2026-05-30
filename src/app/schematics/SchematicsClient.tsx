'use client'

import { useState } from 'react'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/sections/Footer'
import Button from '@/components/ui/Button'
import SectionHeading from '@/components/ui/SectionHeading'
import { IconCpu, IconStack, IconDownload, IconExternalLink, IconInfoCircle } from '@tabler/icons-react'

export default function SchematicsClient() {
  const [activeLayer, setActiveLayer] = useState<'top' | 'bottom' | 'power' | 'traces'>('top')
  const [activePort, setActivePort] = useState<string>('uart1')

  const layersInfo = {
    top: {
      name: 'Top Silkscreen & Assembly',
      desc: 'Visualizes the placement of main discrete ICs (STM32, ICM IMU, BMP Baro), passives, and connector pinouts on the top copper layer.',
      effect: 'brightness-[0.9] contrast-[1.1] hue-rotate-[120deg] saturate-[1.5]'
    },
    bottom: {
      name: 'Bottom Components',
      desc: 'Shows components mounted on the back of the board, including standard pin headers, solder pads, and telemetry headers.',
      effect: 'grayscale invert contrast-[1.2] opacity-75'
    },
    power: {
      name: 'Power Planes & Ground Fill',
      desc: 'Highlights the heavy-duty 5V and 3.3V power routing grids along with the continuous ground planes configured to suppress EMI.',
      effect: 'hue-rotate-[240deg] invert brightness-[0.7] saturate-[2]'
    },
    traces: {
      name: 'Inner Layer Differential Signal Traces',
      desc: 'Displays the high-speed SPI, I2C, and UART signal track geometries routed on internal board layer planes.',
      effect: 'sepia contrast-[1.5] brightness-[0.8] saturate-[3]'
    }
  }

  const pinouts = {
    uart1: {
      title: 'UART1 (RC Receiver Connection)',
      pinout: [
        { pin: '5V', desc: 'Power supply for RC Receiver' },
        { pin: 'GND', desc: 'Ground return' },
        { pin: 'PA10 (RX1)', desc: 'SBUS / IBUS / CRSF signal input (inverted internally for SBUS)' },
        { pin: 'PA9 (TX1)', desc: 'SmartPort / Telemetry output' }
      ]
    },
    uart3: {
      title: 'UART3 & I2C1 (GPS & Compass)',
      pinout: [
        { pin: '5V', desc: 'GPS module power supply' },
        { pin: 'GND', desc: 'Ground return' },
        { pin: 'PB11 (RX3)', desc: 'GPS RX coordinate transfer' },
        { pin: 'PB10 (TX3)', desc: 'GPS TX configuration' },
        { pin: 'PB6 (SCL1)', desc: 'I2C Clock for external magnetometer' },
        { pin: 'PB7 (SDA1)', desc: 'I2C Data for external magnetometer' }
      ]
    },
    motors: {
      title: 'PWM / DSHOT (Motor Connectors)',
      pinout: [
        { pin: 'M1 (PA0)', desc: 'Motor 1 ESC controller signal (PWM channel 1 / DSHOT)' },
        { pin: 'M2 (PA1)', desc: 'Motor 2 ESC controller signal (PWM channel 2 / DSHOT)' },
        { pin: 'M3 (PA2)', desc: 'Motor 3 ESC controller signal (PWM channel 3 / DSHOT)' },
        { pin: 'M4 (PA3)', desc: 'Motor 4 ESC controller signal (PWM channel 4 / DSHOT)' }
      ]
    }
  }

  return (
    <main className="bg-dark text-white min-h-screen flex flex-col justify-between">
      <Nav />

      <div className="pt-28 pb-16 flex-1 max-w-7xl mx-auto px-6 w-full">
        {/* Heading */}
        <div className="mb-12">
          <SectionHeading
            label="HARDWARE SPEC"
            heading="CAD & SCHEMATICS"
            subheading="Fully open hardware architectures. Download Gerber, layout, and schematic files."
          />
        </div>

        {/* Top Section: Interactive Layer Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Controls */}
          <div className="lg:col-span-4 bg-dark-card border border-dark-border rounded-lg p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6 border-b border-dark-border pb-4">
                <IconStack className="text-yellow" size={18} />
                <h3 className="text-sm font-unbounded font-black uppercase tracking-wider text-white">Layer Visualizer</h3>
              </div>

              <p className="text-xs text-white/50 mb-6 leading-relaxed">
                Toggle through different PCB CAD layout slices. The viewer simulates physical trace groups and board layers.
              </p>

              <div className="space-y-3">
                {(Object.keys(layersInfo) as Array<keyof typeof layersInfo>).map((layerId) => (
                  <button
                    type="button"
                    key={layerId}
                    onClick={() => setActiveLayer(layerId)}
                    className={`w-full text-left p-3.5 rounded border transition-all ${
                      activeLayer === layerId
                        ? 'border-yellow bg-yellow/5 text-yellow'
                        : 'border-dark-border bg-dark-surface/30 text-white/60 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold uppercase tracking-wider mb-1">
                      {layerId.toUpperCase()} LAYER
                    </div>
                    <div className="text-[10px] opacity-80 leading-normal">
                      {layersInfo[layerId].name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-dark-border">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Layer Description</h4>
              <p className="text-xs text-white/70 leading-relaxed font-sans">
                {layersInfo[activeLayer].desc}
              </p>
            </div>
          </div>

          {/* Viewer Panel */}
          <div className="lg:col-span-8 bg-gray-950 border border-dark-border rounded-lg overflow-hidden flex flex-col justify-center items-center p-6 relative min-h-[400px]">
            {/* Visualizer Frame */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-dark/80 px-3 py-1.5 rounded border border-dark-border z-10 font-mono text-[10px] text-yellow">
              <span className="size-1.5 bg-yellow rounded-full animate-ping"></span>
              RENDER: {activeLayer.toUpperCase()}
            </div>

            <div className="relative w-full h-[320px] md:h-[400px]">
              <Image
                src="/pcb_image_hero.png"
                alt="Marut FCU PCB Layer Render"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={`object-contain transition-all duration-700 ease-in-out ${layersInfo[activeLayer].effect}`}
                priority
              />
            </div>
          </div>
        </div>

        {/* Pinout Configurator Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Selection List */}
          <div className="lg:col-span-4 bg-dark-card border border-dark-border rounded-lg p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6 border-b border-dark-border pb-4">
              <IconCpu className="text-yellow" size={18} />
              <h3 className="text-sm font-unbounded font-black uppercase tracking-wider text-white">Pin Assignments</h3>
            </div>

            <p className="text-xs text-white/50 mb-6 leading-relaxed">
              Select an interface connector below to display the pin connections on the STM32 flight controller system.
            </p>

            <div className="flex flex-col gap-3">
              {[
                { id: 'uart1', label: 'UART1 (RC Receiver)' },
                { id: 'uart3', label: 'UART3 / I2C1 (GPS & Mag)' },
                { id: 'motors', label: 'Motor Signal Outputs' }
              ].map((port) => (
                <button
                    type="button"
                  key={port.id}
                  onClick={() => setActivePort(port.id)}
                  className={`w-full text-left p-3.5 rounded border transition-all text-xs font-bold uppercase tracking-wider ${
                    activePort === port.id
                      ? 'border-yellow text-yellow bg-yellow/5'
                      : 'border-dark-border text-white/60 hover:text-white hover:bg-dark-surface/20'
                  }`}
                >
                  {port.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pinout Table Display */}
          <div className="lg:col-span-8 bg-dark-card border border-dark-border rounded-lg p-6 md:p-8">
            <h4 className="text-xs font-unbounded font-black uppercase tracking-wider text-white mb-6 flex items-center gap-2">
              <IconInfoCircle className="text-yellow" size={16} />
              {pinouts[activePort as keyof typeof pinouts].title}
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-dark-border text-white/40 uppercase text-[10px]">
                    <th className="pb-3 w-1/4">Pin Label</th>
                    <th className="pb-3 w-3/4">Function Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-border/40 text-white/80">
                  {pinouts[activePort as keyof typeof pinouts].pinout.map((pinRow) => (
                    <tr key={`${activePort}-${pinRow.pin}`} className="hover:bg-dark-surface/10">
                      <td className="py-3.5 font-bold text-yellow">{pinRow.pin}</td>
                      <td className="py-3.5 font-sans text-white/60 leading-normal">{pinRow.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* CAD Downloads Hub */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-6 md:p-8">
          <h3 className="text-sm font-unbounded font-black uppercase tracking-wider text-white mb-6 border-b border-dark-border pb-4">
            CAD File Repositories
          </h3>
          <p className="text-xs text-white/50 mb-8 max-w-3xl leading-relaxed">
            All design schematics, CAD assembly files, BOM component specifications, and ready-to-fabricate Gerber files are completely open source. You are free to download, customize, and fabricate boards for your projects.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'PDF Schematics',
                desc: 'Complete full multi-page hardware schematic drawing details, signal pathways, and component layouts.',
                format: 'PDF (v1.2)',
                btnLabel: 'DOWNLOAD SCHEMATIC'
              },
              {
                title: 'Gerber Packages',
                desc: 'Ready-to-manufacture ZIP files containing drill coordinate files, cooper layer traces, and mask patterns.',
                format: 'ZIP (Standard RS-274X)',
                btnLabel: 'DOWNLOAD GERBERS'
              },
              {
                title: 'KiCad CAD Files',
                desc: 'Active design file directories. Edit schematics, adjust routing paths, or modify component sizes.',
                format: 'KICAD_PROJ (v7.0)',
                btnLabel: 'CLONE DESIGN DIRECTORY'
              }
            ].map((card) => (
              <div key={card.title} className="bg-dark border border-dark-border rounded p-6 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-extrabold text-yellow uppercase tracking-widest mb-1">{card.format}</div>
                  <h4 className="text-sm font-unbounded font-black uppercase text-white mb-3">{card.title}</h4>
                  <p className="text-xs text-white/40 leading-relaxed mb-6 font-sans">{card.desc}</p>
                </div>
                <Button variant="secondary" href="https://github.com/lawslefthand/Marut_FCU/">
                  <IconDownload size={14} className="inline mr-1" /> {card.btnLabel}
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[10px] text-white/40 font-mono">Licensed under CERN Open Hardware License v2 - Permissive</span>
            <a 
              href="https://github.com/lawslefthand/Marut_FCU/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-bold uppercase tracking-widest text-yellow hover:text-yellow-hover flex items-center gap-1 transition-colors"
            >
              PROJECT REPOSITORY ON GITHUB <IconExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
