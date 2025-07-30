import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

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
  const labelCounts = portfolioItems.flatMap(item => item.labels).reduce((acc, label) => {
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedLabels = Object.keys(labelCounts).sort((a, b) => labelCounts[b] - labelCounts[a]);

  const filteredItems = selectedFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.labels.includes(selectedFilter))

  return (
    <div className="py-8 font-body">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-primary mb-4">Portfolio</h1>
          <p className="text-lg text-muted-foreground">A showcase of my pastry work and culinary creations</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <Button
            variant={selectedFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedFilter('all')}
            size="sm"
          >
            Show All ({portfolioItems.length})
          </Button>
          {sortedLabels.map(label => (
            <Button
              key={label}
              variant={selectedFilter === label ? 'default' : 'outline'}
              onClick={() => setSelectedFilter(label)}
              size="sm"
            >
              {label} ({labelCounts[label]})
            </Button>
          ))}
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
                className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 relative"
              >
                <CardContent className="p-0">
                  <div
                    className="aspect-[4/3] bg-muted rounded-t-lg overflow-hidden"
                    onClick={() => setLightboxImage?.(item)}
                  >
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
      </div>
    </div>
  )
}