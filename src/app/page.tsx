import Nav from '@/components/Nav'
import Hero from '@/components/sections/Hero'
import FeatureCards from '@/components/sections/FeatureCards'
import Technology from '@/components/sections/Technology'
import OpenSource from '@/components/sections/OpenSource'
import ProgressGallery from '@/components/sections/ProgressGallery'
import Community from '@/components/sections/Community'
import Roadmap from '@/components/sections/Roadmap'
import Blog from '@/components/sections/Blog'
import Footer from '@/components/sections/Footer'
import { GitHubProvider } from '@/context/GitHubContext'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Marut FCU | Open Source Tri-Mode Flight Control Unit',
  description: 'India’s first fully open source tri-mode Flight Control Unit, built by a community of innovators and contributors.',
}

export default function Home() {
  return (
    <main>
      <GitHubProvider>
        <Nav />
        <Hero />
        <FeatureCards />
        <Technology />
        <OpenSource />
        <ProgressGallery />
        <Roadmap />
        <Blog />
        <Community />
        <Footer />
      </GitHubProvider>
    </main>
  )
}
