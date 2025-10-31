import { Header } from '@/components/Header'
import { ControlPanel } from '@/components/ControlPanel'
import { VisualizationChart } from '@/components/VisualizationChart'
import { ContentSection } from '@/components/ContentSection'
import { Footer } from '@/components/Footer'
import { HeightProvider } from '@/contexts/HeightContext'

export default function HomePage() {
  return (
    <HeightProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
            <ControlPanel />
            <VisualizationChart />
          </div>
        </main>
        <ContentSection />
        <Footer />
      </div>
    </HeightProvider>
  )
}
