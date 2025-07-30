import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Envelope } from '@phosphor-icons/react'

type CVData = {
  name: string;
  contact: {
    email: string;
    phone: string;
  };
  summary: string;
  socialMedia: Array<{
    name: string;
    url: string;
  }>;
  careerHistory: Array<{
    role: string;
    company: string;
    period: string;
    responsibilities?: string[];
  }>;
  skills: string[];
  languages: string[];
  education: Array<{
    qualification: string;
    institution: string;
    year: string;
    details?: string[];
  }>;
}

interface ContactPageProps {
  cvDataState: CVData
}

export default function ContactPage({ cvDataState }: ContactPageProps) {
  return (
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
                <span>{cvDataState.contact.email}</span>
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
}