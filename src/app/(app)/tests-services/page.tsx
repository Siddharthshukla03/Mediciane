
'use client';

import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { FlaskConical, Beaker, Scan, Droplets, Info, Microscope, HeartPulse } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const testsAndServices = [
    {
        name: "Complete Blood Count (CBC)",
        icon: Droplets,
        category: "Pathology",
        description: "Evaluates overall health and detects a wide range of disorders, including anemia and infection.",
        price: "₹300 - ₹600",
        image: "https://placehold.co/600x400.png",
        dataAiHint: "blood test lab"
    },
    {
        name: "Lipid Profile",
        icon: HeartPulse,
        category: "Pathology",
        description: "Measures cholesterol and triglyceride levels, assessing risk for heart disease.",
        price: "₹500 - ₹1000",
        image: "https://placehold.co/600x400.png",
        dataAiHint: "heart health cholesterol"
    },
    {
        name: "X-Ray Imaging",
        icon: Scan,
        category: "Radiology",
        description: "Uses electromagnetic waves to create images of internal body structures, primarily bones.",
        price: "₹400 - ₹1500 per view",
        image: "https://placehold.co/600x400.png",
        dataAiHint: "xray skeleton medical"
    },
    {
        name: "Ultrasound (Sonography)",
        icon: Beaker, // Placeholder, might need better icon
        category: "Radiology",
        description: "Uses sound waves to produce images of organs, tissues, and blood flow.",
        price: "₹800 - ₹2500",
        image: "https://placehold.co/600x400.png",
        dataAiHint: "ultrasound sonogram medical"
    },
     {
        name: "MRI Scan",
        icon: Scan,
        category: "Radiology",
        description: "Detailed imaging using magnetic fields and radio waves, excellent for soft tissues.",
        price: "₹4000 - ₹12000",
        image: "https://placehold.co/600x400.png",
        dataAiHint: "mri scan medical"
    },
     {
        name: "Biopsy & Histopathology",
        icon: Microscope,
        category: "Pathology",
        description: "Microscopic examination of tissue samples to diagnose diseases, especially cancer.",
        price: "₹1500 - ₹5000+",
        image: "https://placehold.co/600x400.png",
        dataAiHint: "microscope lab science"
    }
];

export default function TestsServicesPage() {
  return (
    <div>
      <PageHeader
        title="Diagnostic Tests & Medical Services"
        description="Find information about various diagnostic tests and medical services offered to support your health."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testsAndServices.map((service) => (
            <Card key={service.name} className="shadow-xl hover:shadow-2xl transition-shadow flex flex-col overflow-hidden">
                <div className="relative h-48 w-full">
                    <Image src={service.image} alt={service.name} layout="fill" objectFit="cover" data-ai-hint={service.dataAiHint} />
                </div>
                <CardHeader>
                    <CardTitle className="flex items-center font-headline text-lg">
                        <service.icon className="mr-2 h-5 w-5 text-primary" />
                        {service.name}
                    </CardTitle>
                    <CardDescription className="text-xs text-primary">{service.category}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground mb-2 h-16 overflow-hidden">{service.description}</p>
                    <p className="text-lg font-semibold text-foreground">{service.price}</p>
                </CardContent>
                <CardFooter className="bg-secondary/30 p-4">
                     <Button asChild className="w-full">
                        <Link href="#">Learn More / Book</Link>
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>

       <Card className="mt-12 shadow-xl hover:shadow-2xl transition-shadow bg-primary/5 border-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center font-headline text-xl text-primary">
                    <Info className="mr-2 h-6 w-6" /> Understanding Your Tests
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
                <p>Diagnostic tests are essential tools that help doctors understand your health, diagnose conditions, and plan treatments. If your doctor recommends a test, don&apos;t hesitate to ask questions about its purpose, what to expect, and how to prepare.</p>
                <p>{`Our platform aims to provide clear information and easy booking for a wide range of tests and services. For AI-powered analysis of your reports, visit the "Medical Documents" section.`}</p>
                 <Button variant="outline" asChild className="mt-2 border-primary text-primary hover:bg-primary/10">
                    <Link href="/documents">Analyze My Reports</Link>
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
    
