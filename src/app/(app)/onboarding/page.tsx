
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AppLogo } from '@/components/AppLogo';
import { useToast } from '@/hooks/use-toast';
import { APP_NAME } from '@/config/site';
import { UserPlus, Send, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const onboardingSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50, 'First name is too long'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50, 'Last name is too long'),
  // Consider adding DOB, Gender, etc., for a more complete profile
});

type OnboardingFormData = z.infer<typeof onboardingSchema>;

export default function OnboardingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });

  const onSubmit = async (data: OnboardingFormData) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate saving data

    try {
      localStorage.setItem('userFirstName', data.firstName);
      localStorage.setItem('userLastName', data.lastName); // Store last name too
      
      toast({
        title: `Welcome to ${APP_NAME}, ${data.firstName}!`,
        description: 'Your basic details have been saved. You are now being redirected to your dashboard.',
        action: <CheckCircle className="text-green-500"/>,
      });
      router.push('/dashboard');
    } catch (error) {
      console.error("Failed to save to localStorage or navigate:", error);
      toast({
        title: 'Onboarding Error',
        description: 'Could not complete your setup. Please try again or contact support.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <div className="mb-8 text-center">
        <AppLogo iconSize={48} textSize="text-4xl" showText={true} linkHref="/" />
        <p className="text-muted-foreground mt-2 text-lg">Just a few more details to personalize your experience.</p>
      </div>
      <Card className="w-full max-w-md shadow-2xl bg-card border border-border">
        <CardHeader className="text-center p-6">
          <UserPlus className="mx-auto h-12 w-12 text-primary mb-3" />
          <CardTitle className="text-3xl font-headline text-primary">Welcome to {APP_NAME}!</CardTitle>
          <CardDescription className="pt-1">Please tell us a bit about yourself to get started.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => <Input id="firstName" {...field} placeholder="e.g., Alex" className="bg-background focus:border-primary shadow-sm h-11" />}
              />
              {errors.firstName && <p className="text-destructive text-xs mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => <Input id="lastName" {...field} placeholder="e.g., Doe" className="bg-background focus:border-primary shadow-sm h-11" />}
              />
              {errors.lastName && <p className="text-destructive text-xs mt-1">{errors.lastName.message}</p>}
            </div>
            {/* Future fields like DOB, Gender can be added here */}
            <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
              {isLoading ? <Send className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
              Complete Setup & Go to Dashboard
            </Button>
          </form>
        </CardContent>
         <CardFooter className="p-6 border-t border-border mt-2">
            <p className="text-xs text-muted-foreground text-center w-full">
                By completing setup, you agree to our <Link href="#" className="underline hover:text-primary">Terms of Service</Link> and <Link href="#" className="underline hover:text-primary">Privacy Policy</Link>.
            </p>
        </CardFooter>
      </Card>
      <footer className="mt-12 text-center text-muted-foreground text-xs">
        <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
         <p className="mt-1">Need help? <Link href="/contact-us" className="hover:underline text-primary">Contact Support</Link></p>
      </footer>
    </div>
  );
}

