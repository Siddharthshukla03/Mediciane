
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from './ui/button';
import { ExternalLink } from 'lucide-react';

interface Ad {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  dataAiHint: string;
  cta: string;
}

// Mock data - in a real app, this would be personalized
const mockAds: Ad[] = [
  {
    id: '1',
    title: 'Stay Active with Our Fitness Program',
    description: 'Join our tailored fitness program designed for your health needs. Get stronger, feel better!',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'fitness exercise group',
    link: '#',
    cta: 'Learn More',
  },
  {
    id: '2',
    title: 'Mindful Eating: A Healthier You',
    description: 'Discover the benefits of mindful eating with our expert-led workshops and resources.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'healthy food vegetables',
    link: '#',
    cta: 'Explore Workshops',
  },
   {
    id: '3',
    title: 'Better Sleep, Better Health',
    description: 'Improve your sleep quality with our proven techniques and professional guidance.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'sleep wellness moon',
    link: '#',
    cta: 'Get Sleep Tips',
  },
];

export function HealthAdWidget() {
  // In a real app, you might select one or two ads based on user history
  const selectedAds = mockAds.slice(0, 2);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold tracking-tight font-headline text-foreground mb-6">Health & Wellness Spotlight</h2>
      <div className="grid gap-8 md:grid-cols-2">
        {selectedAds.map((ad) => (
          <Card key={ad.id} className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-card">
            <CardHeader className="p-0 relative">
              <Image
                src={ad.imageUrl}
                alt={ad.title}
                width={600}
                height={300} // Adjusted height for better aspect ratio in cards
                className="object-cover w-full h-48 md:h-56" // Responsive height
                data-ai-hint={ad.dataAiHint}
              />
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-xl font-headline mb-2 text-primary">{ad.title}</CardTitle>
              <CardDescription>{ad.description}</CardDescription>
            </CardContent>
            <CardFooter className="bg-secondary/20 p-4">
              <Button asChild variant="outline" className="w-full group border-primary text-primary hover:bg-primary/10">
                <a href={ad.link} target="_blank" rel="noopener noreferrer">
                  {ad.cta} <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
