
'use client';

import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ClipboardList, Info, ShieldCheck, HeartPulse, Brain, Bone, Activity } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const checkupPackages = [
    {
        name: "Basic Wellness Check",
        icon: ShieldCheck,
        description: "A foundational checkup covering essential health markers for overall well-being. Ideal for routine screening.",
        price: "₹1999",
        detailsLink: "#",
        dataAiHint: "health screening basic",
        image: "https://placehold.co/600x400.png"
    },
    {
        name: "Comprehensive Heart Care",
        icon: HeartPulse,
        description: "In-depth cardiac assessment including ECG, lipid profile, and cardiologist consultation. For proactive heart health.",
        price: "₹4999",
        detailsLink: "#",
        dataAiHint: "heart care cardiology",
        image: "https://placehold.co/600x400.png"
    },
    {
        name: "Advanced Executive Health",
        icon: Brain,
        description: "A thorough evaluation designed for busy professionals, including stress markers and advanced diagnostics.",
        price: "₹7999",
        detailsLink: "#",
        dataAiHint: "executive health corporate",
        image: "https://placehold.co/600x400.png"
    },
     {
        name: "Women's Wellness Package",
        icon: Activity,
        description: "Specialized tests and consultations focusing on women's health needs across different life stages.",
        price: "₹3499",
        detailsLink: "#",
        dataAiHint: "womens health wellness",
        image: "https://placehold.co/600x400.png"
    },
];


export default function HealthCheckupsPage() {
  return (
    <div>
      <PageHeader
        title="Health Checkups"
        description="Explore and book comprehensive health checkup packages for proactive and preventive care."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {checkupPackages.map((pkg) => (
                <Card key={pkg.name} className="shadow-xl hover:shadow-2xl transition-shadow flex flex-col overflow-hidden">
                    <div className="relative h-48 w-full">
                        <Image src={pkg.image} alt={pkg.name} layout="fill" objectFit="cover" data-ai-hint={pkg.dataAiHint} />
                    </div>
                    <CardHeader>
                        <CardTitle className="flex items-center font-headline text-lg">
                            <pkg.icon className="mr-2 h-5 w-5 text-primary" />
                            {pkg.name}
                        </CardTitle>
                        <CardDescription className="text-sm h-16 overflow-hidden">{pkg.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-2xl font-semibold text-primary">{pkg.price}</p>
                    </CardContent>
                    <CardFooter className="bg-secondary/30 p-4">
                        <Button className="w-full">Book Now</Button>
                    </CardFooter>
                </Card>
            ))}
        </div>

        <Card className="mt-12 shadow-xl hover:shadow-2xl transition-shadow bg-primary/5 border-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center font-headline text-xl text-primary">
                <Info className="mr-2 h-6 w-6" /> Why Regular Checkups?
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
                <p>Regular health checkups are crucial for early detection of potential health issues, allowing for timely intervention and better management. They provide a comprehensive overview of your health status and help in maintaining a healthy lifestyle.</p>
                <ul className="list-disc list-inside space-y-1">
                    <li>Identify health risks early.</li>
                    <li>Monitor existing conditions.</li>
                    <li>Promote preventive care and healthy habits.</li>
                    <li>Build a strong relationship with your healthcare provider.</li>
                </ul>
            </CardContent>
        </Card>
    </div>
  );
}
    
