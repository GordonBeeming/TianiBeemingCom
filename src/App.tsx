import React, { useState, useRef, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Toaster } from '@/components/ui/sonner'
import portfolioData from '@/data/portfolioData.json'
import cvData from '@/data/cvData.json'
import HomePage from '@/pages/HomePage'
import PortfolioPage from '@/pages/PortfolioPage'
import CVPage from '@/pages/CVPage'
import AboutPage from '@/pages/AboutPage'
import ContactPage from '@/pages/ContactPage'
import {
  List,
  X,
  CaretDown
} from '@phosphor-icons/react'

type PortfolioItem = {
  id: string
  title: string
  description: string
  imageSrc: string
  labels: string[]
}

type CVData = {
  name: string;
  contact: {
    email: string;
    phone: string;
  };
  summary: string;
  socialMedia: Array<{
    name: string;
    url: string;
    handle: string;
  }>;
  careerHistory: Array<{
    role: string;
    company: string;
    period: string;
    responsibilities?: string[];
  }>;
  skills: string[];
  languages: string[];
  education: Array<{
    qualification: string;
    institution: string;
    year: string;
    details?: string[];
  }>;
}

function App() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [lightboxImage, setLightboxImage] = useState<PortfolioItem | null>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);


  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>((portfolioData as any).portfolio as PortfolioItem[])
  const [aboutContent, setAboutContent] = useState(cvData.summary)
  const [cvDataState, setCvDataState] = useState<CVData>(cvData as CVData)

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'CV', path: '/cv' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ]

  useEffect(() => {
    if (lightboxImage && scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      setShowScrollIndicator(scrollHeight > clientHeight);
    } else {
      setShowScrollIndicator(false);
    }
  }, [lightboxImage]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      // Hide indicator when user is near the bottom
      if (scrollHeight - scrollTop - clientHeight < 20) {
        setShowScrollIndicator(false);
      }
    }
  };

  const renderNavigation = () => (
    <nav className="bg-white/95 backdrop-blur-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-display text-xl font-bold text-primary">
            Tiani Beeming
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigation.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-body text-sm font-medium transition-colors ${location.pathname === item.path
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-foreground hover:text-primary'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-foreground hover:text-primary"
            >
              {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-3">
            {navigation.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full text-left font-body text-sm font-medium transition-colors ${location.pathname === item.path ? 'text-primary' : 'text-foreground hover:text-primary'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )

  return (
    <div className="min-h-screen bg-background font-body">
      {renderNavigation()}

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                aboutContent={aboutContent}
                portfolioItems={portfolioItems}
                setLightboxImage={setLightboxImage}
              />
            }
          />
          <Route
            path="/portfolio"
            element={
              <PortfolioPage
                portfolioItems={portfolioItems}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                setLightboxImage={setLightboxImage}
              />
            }
          />
          <Route
            path="/cv"
            element={<CVPage cvDataState={cvDataState} />}
          />
          <Route
            path="/about"
            element={
              <AboutPage
                aboutContent={aboutContent}
              />
            }
          />
          <Route
            path="/contact"
            element={<ContactPage cvDataState={cvDataState} />}
          />
        </Routes>
      </main>

      {/* Lightbox */}
      <Dialog open={!!lightboxImage} onOpenChange={() => setLightboxImage(null)}>
        <DialogContent className="max-w-4xl w-auto h-auto max-h-[90vh] flex flex-col p-0">
          {lightboxImage && (
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex-grow overflow-y-auto p-6 hide-scrollbar relative"
            >
              <div
                className="bg-muted rounded-lg overflow-hidden mb-4 relative group"
              >
                <img
                  ref={imageRef}
                  src={lightboxImage.imageSrc}
                  alt={lightboxImage.title}
                  className="w-full h-auto object-contain transition-opacity duration-300 max-h-[calc(90vh-12rem)]"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    e.currentTarget.classList.add('hidden');
                    const nextEl = e.currentTarget.nextElementSibling;
                    if (nextEl) {
                      nextEl.classList.remove('hidden');
                      nextEl.classList.add('flex');
                    }
                  }}
                />
                <div className="w-full h-full bg-muted hidden items-center justify-center">
                  <span className="text-muted-foreground">Image: {lightboxImage.title}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {lightboxImage.labels.map(label => (
                  <Badge key={label} variant="secondary" className="text-xs">
                    {label}
                  </Badge>
                ))}
              </div>
              <h3 className="font-semibold text-xl mb-2">{lightboxImage.title}</h3>
              <p className="text-muted-foreground whitespace-pre-line">{lightboxImage.description}</p>
              {showScrollIndicator && (
                <div className="sticky bottom-0 left-1/2 -translate-x-1/2 w-full h-12 flex justify-center items-end pointer-events-none">
                  <div className="bg-background/80 backdrop-blur-sm rounded-full p-1">
                    <CaretDown size={24} className="animate-bounce text-primary" />
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  )
}

export default App