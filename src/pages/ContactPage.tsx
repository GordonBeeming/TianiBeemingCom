import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Envelope, Phone, LinkedinLogo, InstagramLogo } from '@phosphor-icons/react'

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
    handle: string;
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
  cvDataState: CVData | null
}

export default function ContactPage({ cvDataState }: ContactPageProps) {
  const [showEmail, setShowEmail] = useState(false)
  const [showPhone, setShowPhone] = useState(false)

  if (!cvDataState) {
    return (
      <div className="py-8 font-body">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>Loading contact data...</p>
        </div>
      </div>
    )
  }

  const maskedEmail = cvDataState.contact.email.replace('@', ' [at] ').replace(/\./g, ' [dot] ');
  const maskedPhone = `${cvDataState.contact.phone.slice(0, 3)} ... ... ${cvDataState.contact.phone.slice(-3)}`;

  const socialIcons: { [key: string]: React.ReactElement } = {
    LinkedIn: <LinkedinLogo size={20} className="text-primary" />,
    Instagram: <InstagramLogo size={20} className="text-primary" />,
  }

  return (
    <div className="py-8 font-body">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-primary mb-4">Contact</h1>
          <p className="text-lg text-muted-foreground">Let's discuss your next pastry project</p>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="font-semibold text-xl mb-6 text-center">Get in Touch</h2>
            <div className="space-y-4 max-w-sm mx-auto">
              <div className="flex items-center space-x-3">
                <Envelope size={20} className="text-primary" />
                <span>{showEmail ? cvDataState.contact.email : maskedEmail}</span>
                <Button variant="link" size="sm" onClick={() => setShowEmail(!showEmail)}>
                  {showEmail ? 'Hide' : 'Show'}
                </Button>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-primary" />
                <span>{showPhone ? cvDataState.contact.phone : maskedPhone}</span>
                <Button variant="link" size="sm" onClick={() => setShowPhone(!showPhone)}>
                  {showPhone ? 'Hide' : 'Show'}
                </Button>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-xl mb-6 text-center">Find me on Social Media</h2>
            <div className="space-y-4 max-w-sm mx-auto">
              {cvDataState.socialMedia.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  {socialIcons[social.name] || null}
                  <span>{social.handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}