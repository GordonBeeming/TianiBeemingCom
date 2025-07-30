import { useState, useEffect } from 'react'

/**
 * Simple replacement for @github/spark useKV hook
 * Uses localStorage for persistence with JSON data loading capability
 */
export function useKV<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      console.warn(`Failed to parse stored value for key "${key}":`, error)
    }
    return defaultValue
  })

  const setStoredValue = (newValue: T) => {
    setValue(newValue)
    try {
      localStorage.setItem(key, JSON.stringify(newValue))
    } catch (error) {
      console.warn(`Failed to store value for key "${key}":`, error)
    }
  }

  return [value, setStoredValue]
}

/**
 * Hook to load portfolio data from JSON file
 */
export function usePortfolioData() {
  const [portfolioItems, setPortfolioItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        // Import the JSON data directly as a module
        const portfolioData = await import('/src/data/portfolioData.json')
        setPortfolioItems(portfolioData.default || portfolioData)
        setError(null)
      } catch (err) {
        console.error('Failed to load portfolio data:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        // Fallback to hardcoded data matching the requirements
        setPortfolioItems([
          {
            id: "elegant-wedding-cake",
            imageSrc: "/portfolio-images/wp-20150722-17-42-10-pro.jpeg",
            title: "Elegant Wedding Cake",
            description: "A stunning three-tier wedding cake featuring delicate sugar flowers and intricate piping work. This elegant design combines classic white fondant with subtle gold accents, perfect for a sophisticated celebration.",
            labels: ["Wedding", "Elegant", "Multi-tier", "Sugar Flowers", "Custom Design"]
          },
          {
            id: "childrens-birthday-castle",
            imageSrc: "/portfolio-images/img-20171026-192909-176.jpeg",
            title: "Children's Birthday Castle",
            description: "A magical castle cake designed for a child's birthday party. Complete with colorful turrets, edible flags, and whimsical decorations that bring fairy tale dreams to life.",
            labels: ["Birthday", "Children", "Castle", "Whimsical", "Colorful", "Custom Design"]
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return { portfolioItems, loading, error, setPortfolioItems }
}