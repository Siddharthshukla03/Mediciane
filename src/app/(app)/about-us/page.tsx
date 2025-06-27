
'use client';

import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Target, Eye, Users } from 'lucide-react';
import { APP_NAME } from '@/config/site';
import Image from 'next/image';

export default function AboutUsPage() {
  return (
    <div>
      <PageHeader
        title={`About ${APP_NAME}`}
        description={`Learn more about our mission, vision, and the team dedicated to revolutionizing healthcare at ${APP_NAME}.`}
      />
      <div className="space-y-8">
        <Card className="shadow-xl hover:shadow-2xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center font-headline text-xl">
              <Info className="mr-2 h-6 w-6 text-primary" />
              Our Story
            </CardTitle>
            <CardDescription>
              Dedicated to empowering your health journey with innovative technology and compassionate care.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Welcome to {APP_NAME}! We are a passionate team committed to transforming the healthcare landscape by providing accessible, intelligent, and personalized solutions. Our platform leverages cutting-edge technology, including advanced AI, to help you seamlessly manage your medical records, schedule appointments, understand your health better, and communicate effectively with healthcare providers.
            </p>
            <p>
              We believe that everyone deserves to be in control of their health. Our tools and insights are designed to lead to better health outcomes, foster a more informed healthcare experience, and empower individuals to make proactive decisions about their well-being.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-xl hover:shadow-2xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center font-headline text-lg">
                <Target className="mr-2 h-5 w-5 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>To empower individuals with accessible and intelligent health solutions, fostering proactive wellness and informed decision-making for a healthier future.</p>
            </CardContent>
          </Card>
          <Card className="shadow-xl hover:shadow-2xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center font-headline text-lg">
                <Eye className="mr-2 h-5 w-5 text-primary" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>To be the leading digital health companion, recognized for innovation, user-centricity, and a commitment to improving lives through technology.</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-xl hover:shadow-2xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center font-headline text-xl">
                <Users className="mr-2 h-6 w-6 text-primary" />
                Meet the (Future) Team
            </CardTitle>
            <CardDescription>
                The minds and hearts behind {APP_NAME}.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <div className="mt-2 p-8 border border-dashed rounded-lg text-center text-muted-foreground bg-secondary/30">
                <Image
                    src="https://placehold.co/600x300.png"
                    alt="Team placeholder"
                    width={600}
                    height={300}
                    className="rounded-lg mx-auto mb-6 shadow-md"
                    data-ai-hint="diverse team working"
                />
                <Info className="mx-auto h-10 w-10 text-primary mb-4" />
                <p className="text-lg">Our dedicated team of innovators, healthcare professionals, and technology experts is growing.</p>
                <p className="text-sm">More detailed information about our team members, their expertise, and our company culture will be shared here soon as we continue to build a healthier tomorrow, together.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
    
