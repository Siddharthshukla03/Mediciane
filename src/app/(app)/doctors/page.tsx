
'use client';

import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Info, Search } from 'lucide-react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function DoctorsPage() {
  return (
    <div>
      <PageHeader
        title="Find a Doctor"
        description="Search for healthcare professionals by speciality, location, and availability to suit your needs."
      />
      <Card className="shadow-xl hover:shadow-2xl transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center font-headline text-xl">
            <Users className="mr-2 h-6 w-6 text-primary" />
            Meet Our Experts
          </CardTitle>
          <CardDescription>
            Connect with experienced doctors and specialists dedicated to your well-being.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8 p-6 bg-secondary/30 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                <Search className="mr-2 h-5 w-5 text-primary" />
                Filter Doctors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input type="text" placeholder="Doctor name or keyword..." className="bg-background focus:border-primary" />
                <Select>
                    <SelectTrigger className="bg-background focus:border-primary">
                        <SelectValue placeholder="Select Speciality" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="gp">General Practitioner</SelectItem>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="dermatology">Dermatology</SelectItem>
                        <SelectItem value="neurology">Neurology</SelectItem>
                        <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    </SelectContent>
                </Select>
                 <Select>
                    <SelectTrigger className="bg-background focus:border-primary">
                        <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="gurgaon">Gurgaon</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="prayagraj">Prayagraj</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button className="mt-4 w-full md:w-auto">
                <Search className="mr-2 h-4 w-4"/> Search Doctors
            </Button>
          </div>

          <div className="mt-6 p-8 border border-dashed rounded-lg text-center text-muted-foreground bg-card">
            <Image 
                src="https://placehold.co/600x300.png"
                alt="Doctors working together"
                width={600}
                height={300}
                className="rounded-lg mx-auto mb-6 shadow-md"
                data-ai-hint="doctors team diverse"
            />
            <Info className="mx-auto h-10 w-10 text-primary mb-4" />
            <p className="text-lg font-medium">Doctor Profiles Coming Soon!</p>
            <p className="text-sm">
              We are diligently working to bring you a comprehensive directory of highly qualified doctors. 
              Soon, you'll be able to view detailed profiles, specializations, patient reviews, and book appointments directly.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
    
