
'use client';

import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';
import { Search, Info, Frown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  // Mock search results for demonstration
  const mockResults = query ? [
    { id: 'doc1', type: 'Doctor', name: 'Dr. Siddharth Shukla', specialty: 'General Practitioner', link: '/doctors' },
    { id: 'hosp1', type: 'Hospital', name: 'City General Hospital', location: 'Gurgaon', link: '/hospitals' },
    { id: 'spec1', type: 'Speciality', name: 'Cardiology', description: 'Heart related issues', link: '/specialities' },
    { id: 'article1', type: 'Article', title: `Understanding ${query}`, snippet: 'Learn more about managing symptoms...', link: '#' },
  ].filter(item => item.name?.toLowerCase().includes(query.toLowerCase()) || item.title?.toLowerCase().includes(query.toLowerCase()) || item.specialty?.toLowerCase().includes(query.toLowerCase())) : [];


  return (
    <div>
      <PageHeader
        title="Search Results"
        description={query ? `Showing results for "${query}"` : "Enter a search term in the dashboard to discover relevant information."}
      />
      <Card className="shadow-xl hover:shadow-2xl transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center font-headline text-xl">
            <Search className="mr-2 h-6 w-6 text-primary" />
            Search Results
          </CardTitle>
          {query && <CardDescription>Your search for &quot;{query}&quot; yielded the following results:</CardDescription>}
        </CardHeader>
        <CardContent>
          {!query ? (
            <div className="mt-6 p-8 border border-dashed rounded-lg text-center text-muted-foreground bg-secondary/30">
                <Image 
                    src="https://placehold.co/600x300.png"
                    alt="Magnifying glass illustration"
                    width={600}
                    height={300}
                    className="rounded-lg mx-auto mb-6 shadow-md"
                    data-ai-hint="search discovery concept"
                />
                <Info className="mx-auto h-10 w-10 text-primary mb-4" />
                <p className="text-lg font-medium">Please Enter a Search Term</p>
                <p className="text-sm">Use the search bar on the dashboard to find doctors, hospitals, specialities, or health information.</p>
                <Button asChild className="mt-6">
                    <Link href="/dashboard">Back to Dashboard</Link>
                </Button>
            </div>
          ) : mockResults.length > 0 ? (
            <div className="space-y-6 mt-4">
                {mockResults.map(result => (
                    <Card key={result.id} className="shadow-md hover:shadow-lg transition-shadow bg-card">
                        <CardHeader>
                            <CardTitle className="text-lg text-primary">{result.type}: {result.name || result.title}</CardTitle>
                            {result.specialty && <CardDescription>Specialty: {result.specialty}</CardDescription>}
                            {result.location && <CardDescription>Location: {result.location}</CardDescription>}
                        </CardHeader>
                        <CardContent>
                            {result.snippet && <p className="text-muted-foreground text-sm">{result.snippet}</p>}
                            {result.description && <p className="text-muted-foreground text-sm">{result.description}</p>}
                             <Button variant="link" asChild className="p-0 h-auto mt-2 text-primary">
                                <Link href={result.link || '#'}>View Details</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
          ) : (
            <div className="mt-6 p-8 border border-dashed rounded-lg text-center text-muted-foreground bg-secondary/30">
                <Image 
                    src="https://placehold.co/600x300.png"
                    alt="No results found illustration"
                    width={600}
                    height={300}
                    className="rounded-lg mx-auto mb-6 shadow-md"
                    data-ai-hint="empty state sad"
                />
                <Frown className="mx-auto h-10 w-10 text-destructive mb-4" />
                <p className="text-lg font-medium">No Results Found for &quot;{query}&quot;</p>
                <p className="text-sm">Try refining your search terms or check for typos. If you need help, our AI assistant might be able to guide you.</p>
                <div className="mt-6 space-x-3">
                    <Button asChild>
                        <Link href="/dashboard">New Search</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/assistant">Ask AI Assistant</Link>
                    </Button>
                </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
    
