
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { APP_NAME } from "@/config/site";
import { Lightbulb, ShieldCheck, Stethoscope, CalendarDays, ArrowRight, Zap, Users, HeartPulse } from "lucide-react";
import Link from "next/link";
import { AppLogo } from "@/components/AppLogo";

export default function HomePage() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Secure Health Records",
      description: "Safely store, manage, and access your medical documents anytime, anywhere with top-tier encryption and privacy controls.",
      imageSrc: "https://placehold.co/600x400.png",
      aiHint: "digital security health records"
    },
    {
      icon: Lightbulb,
      title: "AI-Powered Insights",
      description: "Leverage advanced AI to understand complex medical reports, get personalized health suggestions, and proactive wellness tips.",
      imageSrc: "https://placehold.co/600x400.png",
      aiHint: "artificial intelligence brain healthcare"
    },
    {
      icon: CalendarDays,
      title: "Effortless Scheduling",
      description: "Book and manage appointments with healthcare providers seamlessly. Get timely reminders so you never miss a check-up.",
      imageSrc: "https://placehold.co/600x400.png",
      aiHint: "online calendar doctor appointment"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Navbar - STICKY, not FIXED, ensuring it doesn't overlap content */}
      <header className="w-full py-4 px-6 md:px-10 sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
          <div className="container mx-auto flex justify-between items-center">
            <AppLogo iconSize={28} textSize="text-2xl" showText={true} linkHref="/" />
            <nav className="hidden md:flex items-center space-x-4">
                 <Button variant="ghost" asChild className="hover:text-primary transition-colors">
                    <Link href="#features">Features</Link>
                </Button>
                <Button variant="ghost" asChild className="hover:text-primary transition-colors">
                    <Link href="#testimonials">Testimonials</Link>
                </Button>
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
                    <Link href="/login">Login / Sign Up</Link>
                </Button>
            </nav>
            <div className="md:hidden">
              <Button asChild size="sm">
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </div>
      </header>
      
      {/* Main content - no manual padding needed, flex-grow handles layout */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section id="hero" className="w-full py-20 md:py-28 text-center bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-6">
            <div className="inline-flex items-center justify-center bg-primary text-primary-foreground p-4 rounded-full mb-8 shadow-lg transform hover:scale-110 transition-transform">
              <HeartPulse size={56} />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 font-headline tracking-tight">
              Welcome to {APP_NAME}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Your intelligent health companion for managing records, appointments, and gaining AI-powered insights. Take control of your health journey today.
            </p>
            <div className="space-x-4">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <Link href="/login">Get Started <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border-primary text-primary hover:bg-primary/10">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-16 md:py-24 bg-background">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-4 font-headline">Why Choose {APP_NAME}?</h2>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-16">Discover the tools that empower your health and wellness, designed for you.</p>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden bg-card transform hover:-translate-y-2 flex flex-col">
                  <div className="relative w-full h-56">
                      <Image
                      src={feature.imageSrc}
                      alt={feature.title}
                      layout="fill"
                      objectFit="cover"
                      data-ai-hint={feature.aiHint}
                      />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <feature.icon className="text-accent w-10 h-10 flex-shrink-0" />
                      <CardTitle className="text-2xl font-headline text-card-foreground">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 flex-grow">
                    <CardDescription className="text-base text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section Placeholder */}
        <section id="testimonials" className="w-full py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-6 text-center">
              <Users size={48} className="mx-auto mb-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-headline">Loved by Users Like You</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
                  See what our users are saying about their experience with {APP_NAME}.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                  {[1,2,3].map(i => (
                      <Card key={i} className="shadow-lg hover:shadow-xl transition-shadow bg-card p-6">
                          <CardContent className="space-y-4">
                              <Image src="https://placehold.co/80x80.png" alt={`User ${i}`} data-ai-hint="person face happy" width={80} height={80} className="rounded-full mx-auto mb-4 border-2 border-primary" />
                              <p className="text-muted-foreground italic">&quot;{APP_NAME} has revolutionized how I manage my health. The AI insights are incredibly helpful!&quot;</p>
                              <p className="font-semibold text-card-foreground">- User {i}</p>
                          </CardContent>
                      </Card>
                  ))}
              </div>
          </div>
        </section>


        {/* Call to Action Section */}
        <section className="w-full py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto px-6 text-center">
              <Zap size={48} className="mx-auto mb-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-headline">Ready to Take Control of Your Health?</h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                  Join {APP_NAME} today and experience a smarter, more personalized way to manage your well-being.
              </p>
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                  <Link href="/login">Sign Up Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full py-8 bg-background border-t border-border">
          <div className="container mx-auto px-6 text-center text-muted-foreground text-sm">
            <AppLogo iconSize={24} textSize="text-lg" className="justify-center mb-4"/>
            <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
               <Link href="/contact-us" className="hover:text-primary transition-colors">Contact Us</Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
