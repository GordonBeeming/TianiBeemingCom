import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

type PortfolioItem = {
  id: string
  title: string
  description: string
  imageSrc: string
  labels: string[]
}

interface PortfolioItemFormProps {
  item: PortfolioItem
  onSave: (data: Omit<PortfolioItem, 'id'>) => void
  onCancel: () => void
}

export function PortfolioItemForm({
  item,
  onSave,
  onCancel
}: PortfolioItemFormProps) {
  const [title, setTitle] = useState(item.title)
  const [description, setDescription] = useState(item.description)
  const [imageSrc, setImageSrc] = useState(item.imageSrc)
  const [labelsText, setLabelsText] = useState(item.labels.join(', '))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      title,
      description,
      imageSrc,
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
          <Label htmlFor="imageSrc">Image URL</Label>
          <Input
            id="imageSrc"
            value={imageSrc}
            onChange={(e) => setImageSrc(e.target.value)}
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