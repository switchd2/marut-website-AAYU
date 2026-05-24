import Nav from '@/components/Nav'
import Hero from '@/components/sections/Hero'
import FeatureCards from '@/components/sections/FeatureCards'
import Technology from '@/components/sections/Technology'
import OpenSource from '@/components/sections/OpenSource'
import Community from '@/components/sections/Community'
import Roadmap from '@/components/sections/Roadmap'
import Blog from '@/components/sections/Blog'
import Footer from '@/components/sections/Footer'
import { GitHubProvider } from '@/context/GitHubContext'

export default function Home() {
  return (
    <main>
      <GitHubProvider>
        <Nav />
        <Hero />
        <FeatureCards />
        <Technology />
        <OpenSource />
        <Roadmap />
        <Blog />
        <Community />
        <Footer />
      </GitHubProvider>
    </main>
  )
}
