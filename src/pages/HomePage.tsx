import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

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
  const featuredItems = portfolioItems
    .filter(item => typeof item.featurePosition === 'number')
    .sort((a, b) => (a.featurePosition ?? 0) - (b.featurePosition ?? 0));

  return (
    <div className="font-body">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img src="/images/tiani-beeming-profile_350.png" alt="Tiani Beeming" className="w-56 h-56 mx-auto mb-8 rounded-full object-cover" />

          <h1 className="font-display text-4xl lg:text-6xl font-bold text-primary mb-6">
            Tiani Beeming
          </h1>

          <p className="font-display text-xl lg:text-2xl text-foreground mb-8">
            Professional Pastry Chef
          </p>

          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            {aboutContent.split('.')[0]}. Creating beautiful and delicious desserts with precision and artistry.
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
                  className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                  onClick={() => setLightboxImage?.(item)}
                >
                  <CardContent className="p-0">
                    <div className="aspect-[4/3] bg-muted rounded-t-lg overflow-hidden">
                      <img
                        src={item.imageSrc}
                        alt={item.title}
                        className="w-full h-full object-cover"
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
                        <span className="text-muted-foreground">Image: {item.title}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.labels.map(label => (
                          <Badge key={label} variant="secondary" className="text-xs">
                            {label}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-3">{item.description}</p>
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