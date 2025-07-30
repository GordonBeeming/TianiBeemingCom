import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ListFilter } from 'lucide-react'

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

  const labelCounts = portfolioItems.flatMap(item => item.labels).reduce((acc, label) => {
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedLabels = Object.keys(labelCounts).sort((a, b) => labelCounts[b] - labelCounts[a]);

  const filteredItems = selectedFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.labels.includes(selectedFilter))

  const activeFiltersCount = selectedFilter === 'all' ? 0 : 1

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
              <SheetContent side="left" className="w-80 sm:max-w-sm">
                <SheetHeader>
                  <SheetTitle>Filter Portfolio</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
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
                  <div className="space-y-2">
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
                        <span>{label}</span>
                        <Badge variant="secondary" className="ml-2">
                          {labelCounts[label]}
                        </Badge>
                      </Button>
                    ))}
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
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 relative"
                onClick={() => setLightboxImage?.(item)}
              >
                <CardContent className="p-0">
                  <div
                    className="aspect-[4/3] bg-muted rounded-t-lg overflow-hidden"
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