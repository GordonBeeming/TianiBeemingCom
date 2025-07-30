import React from 'react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface AboutPageProps {
  aboutContent: string
  setAboutContent?: (content: string) => void
  isOwner?: boolean
  showAdmin?: boolean
}

export default function AboutPage({
  aboutContent,
  setAboutContent,
  isOwner,
  showAdmin
}: AboutPageProps) {
  return (
    <div className="py-8 font-body">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-primary mb-8">About Me</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1 text-center">
            <img src="/images/tiani-beeming-profile_350_flipped.png" alt="Tiani Beeming" className="w-48 h-48 mx-auto rounded-full object-cover" />
          </div>

          <div className="lg:col-span-2">
            <div className="prose max-w-none">
              <p className="text-lg leading-relaxed text-foreground mb-6">
                {aboutContent}
              </p>

              {isOwner && showAdmin && setAboutContent && (
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
}