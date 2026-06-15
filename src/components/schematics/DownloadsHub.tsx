'use client'

import Button from '@/components/ui/Button'
import { IconDownload, IconExternalLink } from '@tabler/icons-react'

export default function DownloadsHub() {
  return (
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
            btnLabel: 'DOWNLOAD SCHEMATIC',
            href: '/schematics/schematics_pdf.pdf',
            download: true,
            target: '_blank'
          },
          {
            title: 'Gerber Packages',
            desc: 'Ready-to-manufacture ZIP files containing drill coordinate files, cooper layer traces, and mask patterns.',
            format: 'ZIP (Standard RS-274X)',
            btnLabel: 'DOWNLOAD GERBERS',
            href: 'https://github.com/lawslefthand/Marut_FCU/',
            target: '_blank'
          },
          {
            title: 'EasyEDA Project Files',
            desc: 'Active design file directories. Edit schematics, adjust routing paths, or modify component sizes.',
            format: 'EASYEDA (v3.0)',
            btnLabel: 'CLONE DESIGN DIRECTORY',
            href: 'https://github.com/lawslefthand/Marut_FCU/',
            target: '_blank'
          }
        ].map((card) => (
          <div key={card.title} className="bg-dark border border-dark-border rounded p-6 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-extrabold text-yellow uppercase tracking-widest mb-1">{card.format}</div>
              <h4 className="text-sm font-unbounded font-black uppercase text-white mb-3">{card.title}</h4>
              <p className="text-xs text-white/40 leading-relaxed mb-6 font-sans">{card.desc}</p>
            </div>
            <Button variant="secondary" href={card.href} download={card.download} target={card.target} rel="noopener noreferrer">
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
  )
}
