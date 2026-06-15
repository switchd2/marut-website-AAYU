'use client'

import Nav from '@/components/Nav'
import Footer from '@/components/sections/Footer'
import SectionHeading from '@/components/ui/SectionHeading'
import LayerVisualizer from '@/components/schematics/LayerVisualizer'
import PCBBuilder from '@/components/schematics/PCBBuilder'
import DownloadsHub from '@/components/schematics/DownloadsHub'

export default function SchematicsClient() {
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
        <LayerVisualizer />

        {/* Scroll-Jacked PCB Builder Section */}
        <PCBBuilder />

        {/* CAD Downloads Hub */}
        <DownloadsHub />
      </div>

      <Footer />
    </main>
  )
}
