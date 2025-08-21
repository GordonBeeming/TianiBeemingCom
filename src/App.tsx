import React, { useState, useRef, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogOverlay, DialogPortal, DialogTitle } from '@/components/ui/dialog'
import { Toaster } from '@/components/ui/sonner'
import portfolioData from '@/data/portfolioData.json'
import cvData from '@/data/cvData.json'
import HomePage from '@/pages/HomePage'
import PortfolioPage from '@/pages/PortfolioPage'
import ResumePage from '@/pages/ResumePage'
import AboutPage from '@/pages/AboutPage'
import ContactPage from '@/pages/ContactPage'
import ScrollToTop from '@/components/ScrollToTop'
import {
  List,
  X,
  CaretDown,
  CaretLeft,
  CaretRight
} from '@phosphor-icons/react'

type PortfolioItem = {
  id: string
  title: string
  description: string
  imageSrc: string
  labels: string[]
  featurePosition?: number
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
  const [imageLoading, setImageLoading] = useState(false);


  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>((portfolioData as any).portfolio as PortfolioItem[])
  const [aboutContent, setAboutContent] = useState(cvData.summary)
  const [cvDataState, setCvDataState] = useState<CVData>(cvData as CVData)

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Resume', path: '/resume' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ]

  useEffect(() => {
    if (location.pathname !== '/portfolio') {
      setSelectedFilter('all');
    }
  }, [location.pathname]);

  useEffect(() => {
    if (lightboxImage && scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      setShowScrollIndicator(scrollHeight > clientHeight);
    } else {
      setShowScrollIndicator(false);
    }
  }, [lightboxImage]);

  // Navigation functions for lightbox
  const getNavigationItems = () => {
    // On home page, only navigate through featured items
    if (location.pathname === '/') {
      return portfolioItems
        .filter(item => typeof item.featurePosition === 'number')
        .sort((a, b) => (a.featurePosition ?? 0) - (b.featurePosition ?? 0));
    }
    // On portfolio page or other pages, navigate through all items
    return portfolioItems;
  };

  const getCurrentItemIndex = () => {
    if (!lightboxImage) return -1;
    const navigationItems = getNavigationItems();
    return navigationItems.findIndex(item => item.id === lightboxImage.id);
  };

  const navigateToNext = () => {
    const navigationItems = getNavigationItems();
    const currentIndex = getCurrentItemIndex();
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % navigationItems.length;
    setLightboxImage(navigationItems[nextIndex]);
  };

  const navigateToPrevious = () => {
    const navigationItems = getNavigationItems();
    const currentIndex = getCurrentItemIndex();
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + navigationItems.length) % navigationItems.length;
    setLightboxImage(navigationItems[prevIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!lightboxImage) return;

      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault();
          navigateToNext();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          navigateToPrevious();
          break;
        case 'Escape':
          event.preventDefault();
          setLightboxImage(null);
          break;
      }
    };

    if (lightboxImage) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [lightboxImage, portfolioItems, location.pathname]);

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
    <nav className="bg-white/95 backdrop-blur-sm border-b sticky top-0 z-40" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-display text-xl font-bold text-primary" aria-label="Tiani Beeming - Home">
            Tiani Beeming
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8" role="menubar">
            {navigation.map(item => (
              <Link
                key={item.path}
                to={item.path}
                role="menuitem"
                aria-current={location.pathname === item.path ? 'page' : undefined}
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
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              type="button"
            >
              {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t" role="menu" aria-label="Mobile navigation menu">
          <div className="px-4 py-3 space-y-3">
            {navigation.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                role="menuitem"
                aria-current={location.pathname === item.path ? 'page' : undefined}
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
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      {renderNavigation()}

      <main id="main-content">
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
            path="/resume"
            element={<ResumePage cvDataState={cvDataState} />}
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

      {/* Enhanced Lightbox */}

      <Dialog open={!!lightboxImage} onOpenChange={() => setLightboxImage(null)}>
        <DialogPortal>
          {/* Custom darker overlay */}
          <DialogOverlay className="bg-black/80" />
          <DialogContent 
            className="max-w-5xl w-auto h-auto max-h-[95vh] flex flex-col p-0 data-[state=open]:duration-300 data-[state=closed]:duration-200"
            aria-labelledby={lightboxImage ? `lightbox-title-${lightboxImage.id}` : undefined}
            aria-describedby={lightboxImage ? `lightbox-description-${lightboxImage.id}` : undefined}
          >
            {/* Navigation buttons absolutely positioned at edge of viewport, but inside DialogContent */}
            {lightboxImage && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToPrevious();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-[60] p-3 rounded-full bg-white/90 hover:bg-white text-black shadow-lg transition-all hover:scale-110 backdrop-blur-sm"
                  style={{ position: 'fixed' }}
                  aria-label="Previous image"
                  type="button"
                >
                  <CaretLeft size={24} weight="bold" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-[60] p-3 rounded-full bg-white/90 hover:bg-white text-black shadow-lg transition-all hover:scale-110 backdrop-blur-sm"
                  style={{ position: 'fixed' }}
                  aria-label="Next image"
                  type="button"
                >
                  <CaretRight size={24} weight="bold" />
                </button>
              </>
            )}
            {lightboxImage && (
              <>
                <DialogTitle className="sr-only">
                  {lightboxImage.title}
                </DialogTitle>
                <div
                  ref={scrollContainerRef}
                  onScroll={handleScroll}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-grow overflow-y-auto p-6 hide-scrollbar relative"
                >
                <div className="bg-muted rounded-lg overflow-hidden mb-4 relative group">
                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Loading...</span>
                      </div>
                    </div>
                  )}
                  <img
                    ref={imageRef}
                    src={lightboxImage.imageSrc}
                    alt={lightboxImage.title}
                    className={`w-full h-auto object-contain transition-opacity duration-300 max-h-[calc(90vh-12rem)] ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                    onLoadStart={() => setImageLoading(true)}
                    onLoad={() => setImageLoading(false)}
                    onError={(e) => {
                      setImageLoading(false);
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
                <h3 
                  id={`lightbox-title-${lightboxImage.id}`}
                  className="font-semibold text-xl mb-2"
                >
                  {lightboxImage.title}
                </h3>
                <p 
                  id={`lightbox-description-${lightboxImage.id}`}
                  className="text-muted-foreground whitespace-pre-line mb-3"
                >
                  {lightboxImage.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {[...lightboxImage.labels].sort().map(label => (
                    <Badge key={label} variant="secondary" className="text-xs">
                      {label}
                    </Badge>
                  ))}
                </div>
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
        </DialogPortal>
      </Dialog>

      <Toaster />
    </div>
  )
}

export default App