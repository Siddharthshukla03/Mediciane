
'use client';

import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Brain, Heart, Activity, Bone, Eye, ShieldPlus, Info } from 'lucide-react'; // Or ListTree, Stethoscope etc.
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const specialities = [
    { name: "Cardiology", icon: Heart, description: "Diagnosis and treatment of heart diseases and cardiovascular conditions.", image: "https://placehold.co/600x400.png", dataAiHint:"heart anatomy medical", link: "/doctors?speciality=cardiology"},
    { name: "Dermatology", icon: Activity, description: "Care for skin, hair, and nail conditions, from acne to skin cancer.", image: "https://placehold.co/600x400.png", dataAiHint:"skin care beauty", link: "/doctors?speciality=dermatology"},
    { name: "Neurology", icon: Brain, description: "Treatment of disorders of the nervous system, including brain, spinal cord, and nerves.", image: "https://placehold.co/600x400.png", dataAiHint:"brain neurons neurology", link: "/doctors?speciality=neurology"},
    { name: "Orthopedics", icon: Bone, description: "Management of musculoskeletal system issues, including bones, joints, and muscles.", image: "https://placehold.co/600x400.png", dataAiHint:"bones skeleton orthopedic", link: "/doctors?speciality=orthopedics"},
    { name: "Ophthalmology", icon: Eye, description: "Medical and surgical care for eye conditions and vision problems.", image: "https://placehold.co/600x400.png", dataAiHint:"eye vision ophthalmology", link: "/doctors?speciality=ophthalmology"},
    { name: "General Medicine", icon: ShieldPlus, description: "Comprehensive primary care, diagnosis, and treatment of common illnesses.", image: "https://placehold.co/600x400.png", dataAiHint:"doctor patient consultation", link: "/doctors?speciality=general"},
];


export default function SpecialitiesPage() {
  return (
    <div>
      <PageHeader
        title="Medical Specialities"
        description="Explore various medical specialities and find expert doctors associated with each field."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialities.map((spec) => (
                <Card key={spec.name} className="shadow-xl hover:shadow-2xl transition-shadow flex flex-col overflow-hidden">
                     <div className="relative h-48 w-full">
                        <Image src={spec.image} alt={spec.name} layout="fill" objectFit="cover" data-ai-hint={spec.dataAiHint} />
                    </div>
                    <CardHeader>
                        <CardTitle className="flex items-center font-headline text-lg">
                            <spec.icon className="mr-2 h-5 w-5 text-primary" />
                            {spec.name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground">{spec.description}</p>
                    </CardContent>
                    <CardFooter className="bg-secondary/30 p-4">
                        <Button asChild className="w-full">
                            <Link href={spec.link}>Find Doctors</Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
        <Card className="mt-12 shadow-xl hover:shadow-2xl transition-shadow bg-primary/5 border-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center font-headline text-xl text-primary">
                    <Info className="mr-2 h-6 w-6" /> Navigating Your Health
                </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
                <p>Understanding medical specialities can help you find the right care for your specific health needs. Each field focuses on particular body systems or conditions. If you're unsure which specialist to consult, your General Practitioner (GP) can provide guidance and referrals.</p>
            </CardContent>
        </Card>
    </div>
  );
}
    
