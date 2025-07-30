import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Toaster } from '@/components/ui/sonner'
import { useKV } from '@github/spark/hooks'
import { 
  Menu, 
  X, 
  Download, 
  Envelope, 
  Plus, 
  Edit, 
  Trash, 
  Eye,
  EyeOff 
} from '@phosphor-icons/react'
import { toast } from 'sonner'

type PortfolioItem = {
  id: string
  title: string
  description: string
  image: string
  labels: string[]
}

type CVData = {
  summary: string
  experience: Array<{
    title: string
    company: string
    period: string
    description: string
  }>
  education: Array<{
    degree: string
    school: string
    period: string
  }>
  skills: string[]
}

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [lightboxImage, setLightboxImage] = useState<PortfolioItem | null>(null)
  const [showAdmin, setShowAdmin] = useState(false)
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null)

  const [portfolioItems, setPortfolioItems] = useKV<PortfolioItem[]>('portfolio-items', [])
  const [aboutContent, setAboutContent] = useKV('about-content', 
    "I'm Tiani Beeming, a passionate pastry chef with over 5 years of experience creating beautiful and delicious desserts. My work combines traditional techniques with modern innovation to create memorable culinary experiences."
  )
  const [cvData, setCvData] = useKV<CVData>('cv-data', {
    summary: "Experienced pastry chef with expertise in French techniques, custom cake design, and team leadership.",
    experience: [
      {
        title: "Senior Pastry Chef",
        company: "Elite Bakery",
        period: "2020 - Present",
        description: "Lead pastry operations and custom cake design for high-end clientele."
      }
    ],
    education: [
      {
        degree: "Culinary Arts Diploma",
        school: "Culinary Institute",
        period: "2018 - 2020"
      }
    ],
    skills: ["French Pastry Techniques", "Custom Cake Design", "Team Leadership", "Menu Development"]
  })

  const [user, setUser] = useState<any>(null)

  React.useEffect(() => {
    spark.user().then(setUser)
  }, [])

  const isOwner = user?.isOwner

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'CV', id: 'cv' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' }
  ]

  const allLabels = Array.from(new Set(portfolioItems.flatMap(item => item.labels)))
  const filteredItems = selectedFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.labels.includes(selectedFilter))

  const addPortfolioItem = (item: Omit<PortfolioItem, 'id'>) => {
    const newItem = {
      ...item,
      id: Date.now().toString()
    }
    setPortfolioItems(current => [...current, newItem])
    toast.success('Portfolio item added')
  }

  const updatePortfolioItem = (id: string, updates: Partial<PortfolioItem>) => {
    setPortfolioItems(current => 
      current.map(item => item.id === id ? { ...item, ...updates } : item)
    )
    toast.success('Portfolio item updated')
  }

  const deletePortfolioItem = (id: string) => {
    setPortfolioItems(current => current.filter(item => item.id !== id))
    toast.success('Portfolio item deleted')
  }

  const renderNavigation = () => (
    <nav className="bg-white/95 backdrop-blur-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="font-display text-xl font-bold text-primary">
            Tiani Beeming
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigation.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`font-body text-sm font-medium transition-colors ${
                  currentPage === item.id 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {item.name}
              </button>
            ))}
            {isOwner && (
              <button
                onClick={() => setShowAdmin(!showAdmin)}
                className="font-body text-sm font-medium text-accent hover:text-accent/80"
              >
                {showAdmin ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-foreground hover:text-primary"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-3">
            {navigation.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id)
                  setMobileMenuOpen(false)
                }}
                className={`block w-full text-left font-body text-sm font-medium transition-colors ${
                  currentPage === item.id ? 'text-primary' : 'text-foreground hover:text-primary'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )

  const renderHome = () => (
    <div className="font-body">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-32 h-32 mx-auto mb-8 bg-muted rounded-full flex items-center justify-center">
            <span className="text-muted-foreground text-sm">Photo</span>
          </div>
          
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
            <Button 
              size="lg" 
              onClick={() => setCurrentPage('portfolio')}
              className="font-medium"
            >
              View My Work
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => setCurrentPage('cv')}
              className="font-medium"
            >
              See My CV
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Work Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-center mb-12">Featured Work</h2>
          
          {portfolioItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Portfolio items will appear here.</p>
              {isOwner && showAdmin && (
                <Button 
                  onClick={() => setEditingItem({ id: '', title: '', description: '', image: '', labels: [] })}
                  className="mt-4"
                >
                  <Plus size={16} className="mr-2" />
                  Add First Item
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.slice(0, 3).map(item => (
                <Card 
                  key={item.id}
                  className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                  onClick={() => setLightboxImage(item)}
                >
                  <CardContent className="p-0">
                    <div className="aspect-[4/3] bg-muted rounded-t-lg flex items-center justify-center">
                      <span className="text-muted-foreground">Image: {item.title}</span>
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
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {portfolioItems.length > 3 && (
            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                onClick={() => setCurrentPage('portfolio')}
              >
                View All Work
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )

  const renderPortfolio = () => (
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
            Show All
          </Button>
          {allLabels.map(label => (
            <Button
              key={label}
              variant={selectedFilter === label ? 'default' : 'outline'}
              onClick={() => setSelectedFilter(label)}
              size="sm"
            >
              {label}
            </Button>
          ))}
        </div>

        {/* Admin Controls */}
        {isOwner && showAdmin && (
          <div className="mb-8 p-4 bg-accent/10 rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Admin Controls</h3>
              <Button
                onClick={() => setEditingItem({ id: '', title: '', description: '', image: '', labels: [] })}
                size="sm"
              >
                <Plus size={16} className="mr-2" />
                Add Item
              </Button>
            </div>
          </div>
        )}

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
                    className="aspect-[4/3] bg-muted rounded-t-lg flex items-center justify-center"
                    onClick={() => setLightboxImage(item)}
                  >
                    <span className="text-muted-foreground">Image: {item.title}</span>
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
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                </CardContent>
                
                {/* Admin overlay */}
                {isOwner && showAdmin && (
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation()
                        setEditingItem(item)
                      }}
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation()
                        deletePortfolioItem(item.id)
                      }}
                    >
                      <Trash size={14} />
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  const renderCV = () => (
    <div className="py-8 font-body">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-primary mb-4">Curriculum Vitae</h1>
          <Button className="mb-8">
            <Download size={16} className="mr-2" />
            Download CV as PDF
          </Button>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl font-bold text-primary mb-2">Tiani Beeming</h2>
              <p className="text-lg text-muted-foreground">Professional Pastry Chef</p>
            </div>

            {/* Summary */}
            <section className="mb-8">
              <h3 className="font-semibold text-xl mb-4 text-primary">Professional Summary</h3>
              <p className="text-muted-foreground leading-relaxed">{cvData.summary}</p>
            </section>

            <Separator className="my-8" />

            {/* Experience */}
            <section className="mb-8">
              <h3 className="font-semibold text-xl mb-6 text-primary">Work Experience</h3>
              <div className="space-y-6">
                {cvData.experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <h4 className="font-semibold text-lg">{exp.title}</h4>
                      <span className="text-muted-foreground text-sm">{exp.period}</span>
                    </div>
                    <p className="font-medium text-accent mb-2">{exp.company}</p>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <Separator className="my-8" />

            {/* Education */}
            <section className="mb-8">
              <h3 className="font-semibold text-xl mb-6 text-primary">Education</h3>
              <div className="space-y-4">
                {cvData.education.map((edu, index) => (
                  <div key={index}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                      <div>
                        <h4 className="font-semibold">{edu.degree}</h4>
                        <p className="text-accent">{edu.school}</p>
                      </div>
                      <span className="text-muted-foreground text-sm">{edu.period}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <Separator className="my-8" />

            {/* Skills */}
            <section>
              <h3 className="font-semibold text-xl mb-6 text-primary">Core Skills</h3>
              <div className="flex flex-wrap gap-3">
                {cvData.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAbout = () => (
    <div className="py-8 font-body">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-primary mb-8">About Me</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1 text-center">
            <div className="w-48 h-48 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
              <span className="text-muted-foreground">Professional Photo</span>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="prose max-w-none">
              <p className="text-lg leading-relaxed text-foreground mb-6">
                {aboutContent}
              </p>
              
              {isOwner && showAdmin && (
                <div className="mt-8 p-4 bg-accent/10 rounded-lg">
                  <Label htmlFor="about-edit">Edit About Content</Label>
                  <Textarea
                    id="about-edit"
                    value={aboutContent}
                    onChange={(e) => setAboutContent(e.target.value)}
                    className="mt-2"
                    rows={4}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderContact = () => (
    <div className="py-8 font-body">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-primary mb-4">Contact</h1>
          <p className="text-lg text-muted-foreground">Let's discuss your next pastry project</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="font-semibold text-xl mb-6">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Envelope size={20} className="text-primary" />
                <span>tiani.beeming@email.com</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="font-semibold text-xl mb-6">Send a Message</h2>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message..." rows={4} />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background font-body">
      {renderNavigation()}
      
      <main>
        {currentPage === 'home' && renderHome()}
        {currentPage === 'portfolio' && renderPortfolio()}
        {currentPage === 'cv' && renderCV()}
        {currentPage === 'about' && renderAbout()}
        {currentPage === 'contact' && renderContact()}
      </main>

      {/* Lightbox */}
      <Dialog open={!!lightboxImage} onOpenChange={() => setLightboxImage(null)}>
        <DialogContent className="max-w-4xl">
          {lightboxImage && (
            <div>
              <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center mb-4">
                <span className="text-muted-foreground">Image: {lightboxImage.title}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {lightboxImage.labels.map(label => (
                  <Badge key={label} variant="secondary" className="text-xs">
                    {label}
                  </Badge>
                ))}
              </div>
              <h3 className="font-semibold text-xl mb-2">{lightboxImage.title}</h3>
              <p className="text-muted-foreground">{lightboxImage.description}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Portfolio Item Dialog */}
      <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
        <DialogContent>
          {editingItem && (
            <PortfolioItemForm
              item={editingItem}
              onSave={(data) => {
                if (editingItem.id) {
                  updatePortfolioItem(editingItem.id, data)
                } else {
                  addPortfolioItem(data)
                }
                setEditingItem(null)
              }}
              onCancel={() => setEditingItem(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  )
}

function PortfolioItemForm({ 
  item, 
  onSave, 
  onCancel 
}: { 
  item: PortfolioItem
  onSave: (data: Omit<PortfolioItem, 'id'>) => void
  onCancel: () => void
}) {
  const [title, setTitle] = useState(item.title)
  const [description, setDescription] = useState(item.description)
  const [image, setImage] = useState(item.image)
  const [labelsText, setLabelsText] = useState(item.labels.join(', '))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      title,
      description,
      image,
      labels: labelsText.split(',').map(l => l.trim()).filter(Boolean)
    })
  }

  return (
    <div>
      <h2 className="font-semibold text-xl mb-4">
        {item.id ? 'Edit Portfolio Item' : 'Add Portfolio Item'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>
        <div>
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="URL to image"
          />
        </div>
        <div>
          <Label htmlFor="labels">Labels (comma-separated)</Label>
          <Input
            id="labels"
            value={labelsText}
            onChange={(e) => setLabelsText(e.target.value)}
            placeholder="Wedding Cake, Birthday Cake, Custom Design"
          />
        </div>
        <div className="flex gap-3">
          <Button type="submit">Save</Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

export default App