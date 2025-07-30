import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Download } from '@phosphor-icons/react'

type ResumeData = {
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

interface ResumePageProps {
  cvDataState: ResumeData
}

export default function ResumePage({ cvDataState }: ResumePageProps) {
  return (
    <div className="py-8 font-body">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-primary mb-4">Resume</h1>
          <a href="/resume/Tiani-Beeming-CV.pdf" download="Tiani-Beeming-CV.pdf">
            <Button className="mb-8">
              <Download size={16} className="mr-2" />
              Download Resume as PDF
            </Button>
          </a>
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
              <p className="text-muted-foreground leading-relaxed">{cvDataState.summary}</p>
            </section>

            <Separator className="my-8" />

            {/* Experience */}
            <section className="mb-8">
              <h3 className="font-semibold text-xl mb-6 text-primary">Work Experience</h3>
              <div className="space-y-6">
                {cvDataState.careerHistory.map((exp, index) => (
                  <div key={index}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <h4 className="font-semibold text-lg">{exp.role}</h4>
                      <span className="text-muted-foreground text-sm">{exp.period}</span>
                    </div>
                    <p className="font-medium text-accent mb-2">{exp.company}</p>
                    {exp.responsibilities && (
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        {exp.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <Separator className="my-8" />

            {/* Education */}
            <section className="mb-8">
              <h3 className="font-semibold text-xl mb-6 text-primary">Education</h3>
              <div className="space-y-4">
                {cvDataState.education.map((edu, index) => (
                  <div key={index}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                      <div>
                        <h4 className="font-semibold">{edu.qualification}</h4>
                        <p className="text-accent">{edu.institution}</p>
                      </div>
                      <span className="text-muted-foreground text-sm">{edu.year}</span>
                    </div>
                    {edu.details && (
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
                        {edu.details.map((detail, i) => <li key={i}>{detail}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <Separator className="my-8" />

            {/* Skills */}
            <section>
              <h3 className="font-semibold text-xl mb-6 text-primary">Core Skills</h3>
              <div className="flex flex-wrap gap-3">
                {cvDataState.skills.map((skill, index) => (
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
}