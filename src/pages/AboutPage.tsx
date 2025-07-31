import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

interface AboutPageProps {
  aboutContent: string
}

export default function AboutPage({
  aboutContent,
}: AboutPageProps) {
  return (
    <div className="py-8 font-body">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-primary mb-8">About Me</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1 text-center">
            <LazyLoadImage
              src="/images/tiani-beeming-profile_350_flipped.png"
              alt="Tiani Beeming"
              className="w-48 h-48 mx-auto rounded-full object-cover"
              effect="blur"
            />
          </div>

          <div className="lg:col-span-2">
            <div className="prose max-w-none">
              <p className="text-lg leading-relaxed text-foreground mb-6">
                {aboutContent}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}