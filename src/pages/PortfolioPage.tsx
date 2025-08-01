import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ListFilter } from 'lucide-react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { motion, AnimatePresence } from 'framer-motion'
import 'react-lazy-load-image-component/src/effects/blur.css'

type PortfolioItem = {
  id: string
  title: string
  description: string
  imageSrc: string
  labels: string[]
}

interface PortfolioPageProps {
  portfolioItems: PortfolioItem[]
  selectedFilter: string
  setSelectedFilter: (filter: string) => void
  setLightboxImage?: (item: PortfolioItem) => void
}

export default function PortfolioPage({
  portfolioItems,
  selectedFilter,
  setSelectedFilter,
  setLightboxImage
}: PortfolioPageProps) {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)
  const [touchActiveCard, setTouchActiveCard] = useState<string | null>(null)

  const labelCounts = portfolioItems.flatMap(item => item.labels).reduce((acc, label) => {
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedLabels = Object.keys(labelCounts).sort((a, b) => labelCounts[b] - labelCounts[a]);

  const filteredItems = selectedFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.labels.includes(selectedFilter))

  const activeFiltersCount = selectedFilter === 'all' ? 0 : 1

  // Close touch overlay when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (touchActiveCard && !(event.target as Element).closest('.portfolio-card')) {
        setTouchActiveCard(null)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [touchActiveCard])

  const handleCardClick = (item: PortfolioItem) => {
    // On touch devices, first tap shows overlay, second tap opens lightbox
    if ('ontouchstart' in window) {
      if (touchActiveCard === item.id) {
        // Second tap - open lightbox
        setLightboxImage?.(item)
        setTouchActiveCard(null)
      } else {
        // First tap - show overlay
        setTouchActiveCard(item.id)
      }
    } else {
      // Desktop - direct lightbox open
      setLightboxImage?.(item)
    }
  }

  return (
    <div className="py-8 font-body">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="font-display text-4xl font-bold text-primary">Portfolio</h1>
            <Sheet open={isFilterDrawerOpen} onOpenChange={setIsFilterDrawerOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="relative">
                  <ListFilter className="w-4 h-4 mr-2" />
                  Filter
                  {activeFiltersCount > 0 && (
                    <Badge
                      variant="secondary"
                      className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs rounded-full bg-primary text-primary-foreground"
                    >
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 sm:w-[500px] md:w-[600px] flex flex-col p-0">
                <SheetHeader className="px-6 pt-6 pb-4 border-b">
                  <SheetTitle>Filter Portfolio</SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto">
                  <div className="px-6 py-4 space-y-4">
                    <Button
                      variant={selectedFilter === 'all' ? 'default' : 'outline'}
                      onClick={() => {
                        setSelectedFilter('all')
                        setIsFilterDrawerOpen(false)
                      }}
                      className="w-full justify-between"
                      size="sm"
                    >
                      <span>Show All</span>
                      <Badge variant="secondary" className="ml-2">
                        {portfolioItems.length}
                      </Badge>
                    </Button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {sortedLabels.map(label => (
                        <Button
                          key={label}
                          variant={selectedFilter === label ? 'default' : 'outline'}
                          onClick={() => {
                            setSelectedFilter(label)
                            setIsFilterDrawerOpen(false)
                          }}
                          className="w-full justify-between"
                          size="sm"
                        >
                          <span className="truncate">{label}</span>
                          <Badge variant="secondary" className="ml-2 shrink-0">
                            {labelCounts[label]}
                          </Badge>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <p className="text-lg text-muted-foreground">A showcase of my pastry work and culinary creations</p>
        </div>

        {/* Portfolio Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {selectedFilter === 'all' ? 'No portfolio items yet.' : `No items found for "${selectedFilter}".`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => (
              <Card
                key={item.id}
                className="portfolio-card group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 relative overflow-hidden"
                onClick={() => handleCardClick(item)}
              >
                <CardContent className="p-0 relative">
                  <div className="aspect-[4/3] bg-muted overflow-hidden relative">
                    <LazyLoadImage
                      src={item.imageSrc}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      effect="blur"
                      onError={e => {
                        // Fallback to placeholder if image fails to load
                        const target = e.target as HTMLImageElement
                        target.classList.add('hidden')
                        const nextEl = target.nextElementSibling
                        if (nextEl) {
                          nextEl.classList.remove('hidden')
                          nextEl.classList.add('flex')
                        }
                      }}
                    />
                    <div className="w-full h-full bg-muted hidden items-center justify-center absolute top-0 left-0">
                      <span className="text-muted-foreground">Image: {item.title}</span>
                    </div>
                    
                    {/* Hover/Touch Overlay */}
                    <motion.div
                      className={`absolute inset-0 bg-black/70 text-white p-6 flex flex-col justify-end transition-opacity duration-300 ${
                        touchActiveCard === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <AnimatePresence>
                        {(touchActiveCard === item.id || !('ontouchstart' in window)) && (
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="flex flex-wrap gap-2 mb-3">
                              {item.labels.map(label => (
                                <Badge key={label} variant="secondary" className="text-xs bg-white/20 text-white border-white/30 hover:bg-white/30">
                                  {label}
                                </Badge>
                              ))}
                            </div>
                            <h3 className="font-semibold text-lg mb-2 text-white">{item.title}</h3>
                            <p className="text-white/90 text-sm line-clamp-3">{item.description}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}