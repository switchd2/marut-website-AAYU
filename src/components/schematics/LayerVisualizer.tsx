'use client'

import { useState } from 'react'
import Image from 'next/image'
import { IconStack } from '@tabler/icons-react'

const layersInfo = {
  top: {
    image: '/images_pcb/topside.png'
  },
  bottom: {
    image: '/images_pcb/bottomside.png'
  },
  complete: {
    image: '/images_pcb/all.png'
  }
}

export default function LayerVisualizer() {
  const [activeLayer, setActiveLayer] = useState<'top' | 'bottom' | 'complete'>('top')

  return (
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
                className={`w-full text-left p-3.5 rounded border transition-all ${activeLayer === layerId
                  ? 'border-yellow bg-yellow/5 text-yellow'
                  : 'border-dark-border bg-dark-surface/30 text-white/60 hover:text-white'
                  }`}
              >
                <div className="text-xs font-bold uppercase tracking-wider">
                  {layerId === 'complete' ? 'COMPLETE BOARD' : `${layerId.toUpperCase()} LAYER`}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Viewer Panel */}
      <div className="lg:col-span-8 bg-gray-950 border border-dark-border rounded-lg overflow-hidden flex flex-col justify-center items-center p-6 relative min-h-[400px]">
        <div className="relative w-full h-[320px] md:h-[400px]">
          <Image
            src={layersInfo[activeLayer].image}
            alt="Marut FCU PCB Layer Render"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain transition-all duration-700 ease-in-out"
            priority
          />
        </div>
      </div>
    </div>
  )
}
