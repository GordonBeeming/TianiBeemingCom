import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { motion, AnimatePresence } from 'framer-motion'
import 'react-lazy-load-image-component/src/effects/blur.css'

type PortfolioItem = {
  id: string
  title: string
  description: string
  imageSrc: string
  labels: string[]
  featurePosition?: number
}

interface HomePageProps {
  aboutContent: string
  portfolioItems: PortfolioItem[]
  setLightboxImage?: (item: PortfolioItem) => void
}

export default function HomePage({
  aboutContent,
  portfolioItems,
  setLightboxImage
}: HomePageProps) {
  const [touchActiveCard, setTouchActiveCard] = useState<string | null>(null)
  
  const featuredItems = portfolioItems
    .filter(item => typeof item.featurePosition === 'number')
    .sort((a, b) => (a.featurePosition ?? 0) - (b.featurePosition ?? 0));

  // Close touch overlay when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (touchActiveCard && !(event.target as Element).closest('.featured-card')) {
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
    <div className="font-body">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <LazyLoadImage
            src="/images/tiani-beeming-profile_350.png"
            alt="Tiani Beeming"
            className="w-56 h-56 mx-auto mb-8 rounded-full object-cover"
            effect="blur"
          />

          <h1 className="font-display text-4xl lg:text-6xl font-bold text-primary mb-6">
            Tiani Beeming
          </h1>

          <p className="font-display text-xl lg:text-2xl text-foreground mb-8">
            Professional Pastry Chef
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/portfolio">
              <Button size="lg" className="font-medium">
                View My Work
              </Button>
            </Link>
            <Link to="/resume">
              <Button size="lg" variant="outline" className="font-medium">
                See My Resume
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Work Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-center mb-12">Featured Work</h2>

          {featuredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No featured items to display.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredItems.map(item => (
                <Card
                  key={item.id}
                  className="featured-card group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 relative overflow-hidden"
                  onClick={() => handleCardClick(item)}
                >
                  <CardContent className="p-0 relative">
                    <div className="aspect-square bg-muted overflow-hidden relative">
                      <LazyLoadImage
                        src={item.imageSrc}
                        alt={item.title}
                        className="w-full h-full object-cover object-center"
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
                        className={`absolute inset-0 bg-black/50 text-white p-6 flex flex-col justify-end transition-opacity duration-300 ${
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

          {portfolioItems.length > featuredItems.length && (
            <div className="text-center mt-12">
              <Link to="/portfolio">
                <Button variant="outline">
                  View All Work
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}