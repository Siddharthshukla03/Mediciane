
'use client';

import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HospitalIcon, Info, Search, MapPin } from 'lucide-react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function HospitalsPage() {
  return (
    <div>
      <PageHeader
        title="Find a Hospital"
        description="Search for hospitals and medical centers by name, location, or services offered."
      />
      <Card className="shadow-xl hover:shadow-2xl transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center font-headline text-xl">
            <HospitalIcon className="mr-2 h-6 w-6 text-primary" />
            Our Network Hospitals
          </CardTitle>
          <CardDescription>
            Browse our affiliated hospitals or use the filters to find one that meets your needs.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <div className="mb-8 p-6 bg-secondary/30 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                <Search className="mr-2 h-5 w-5 text-primary" />
                Search Hospitals
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input type="text" placeholder="Hospital name or keyword..." className="bg-background focus:border-primary" />
                <Select>
                    <SelectTrigger className="bg-background focus:border-primary">
                        <SelectValue placeholder="Select City/Region" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="gurgaon">Gurgaon</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="prayagraj">Prayagraj</SelectItem>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="bangalore">Bangalore</SelectItem>
                    </SelectContent>
                </Select>
                 <Select>
                    <SelectTrigger className="bg-background focus:border-primary">
                        <SelectValue placeholder="Filter by Services" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="emergency">24/7 Emergency</SelectItem>
                        <SelectItem value="cardiac_care">Cardiac Care</SelectItem>
                        <SelectItem value="maternity">Maternity Services</SelectItem>
                        <SelectItem value="oncology">Oncology</SelectItem>
                        <SelectItem value="orthopedics">Orthopedics</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button className="mt-4 w-full md:w-auto">
                <Search className="mr-2 h-4 w-4"/> Find Hospitals
            </Button>
          </div>

          <div className="mt-6 p-8 border border-dashed rounded-lg text-center text-muted-foreground bg-card">
            <Image 
                src="https://placehold.co/600x300.png"
                alt="Hospital building"
                width={600}
                height={300}
                className="rounded-lg mx-auto mb-6 shadow-md"
                data-ai-hint="hospital building modern"
            />
            <Info className="mx-auto h-10 w-10 text-primary mb-4" />
            <p className="text-lg font-medium">Hospital Listings & Map View Coming Soon!</p>
            <p className="text-sm">
              We are working on integrating a comprehensive list of hospitals with detailed information, services offered, and an interactive map for easy navigation. Please check back soon for updates.
            </p>
            <Button variant="outline" className="mt-6">
                <MapPin className="mr-2 h-4 w-4" /> View Nearby (Feature Coming Soon)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
    
