
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppLogo } from "@/components/AppLogo";
import Link from "next/link";
import { LogIn, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { APP_NAME } from "@/config/site";

const NEW_USER_EMAIL_FOR_DEMO = "newuser@example.com";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (email === NEW_USER_EMAIL_FOR_DEMO) {
        localStorage.removeItem('userFirstName'); 
        router.push("/onboarding");
      } else {
        router.push("/dashboard");
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <div className="mb-8 text-center">
        <AppLogo iconSize={48} textSize="text-4xl" showText={true} linkHref="/"/>
        <p className="text-muted-foreground mt-2 text-lg">Your intelligent health companion.</p>
      </div>
      <Card className="w-full max-w-md shadow-2xl bg-card border border-border">
        <CardHeader className="text-center p-6">
          <CardTitle className="text-3xl font-headline text-primary">Sign In to {APP_NAME}</CardTitle>
          <CardDescription className="pt-1">Enter your credentials below. Use <code className="bg-muted px-1 py-0.5 rounded text-xs">newuser@example.com</code> to see the onboarding flow.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background focus:border-primary shadow-sm h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background focus:border-primary shadow-sm h-11"
              />
            </div>
            <div className="flex items-center justify-end text-sm">
              <Link href="#" className="font-medium text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
              {isLoading ? (
                <LogIn className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <LogIn className="mr-2 h-5 w-5" />
              )}
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="p-6 border-t border-border mt-2">
          <div className="text-center text-sm w-full">
            <p className="text-muted-foreground">
              Don&apos;t have an account yet?{' '}
              <Link href="#" className="font-medium text-primary hover:underline flex items-center justify-center gap-1">
                <UserPlus size={16}/> Sign Up Now
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
       <footer className="mt-12 text-center text-muted-foreground text-xs">
        <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
        <p className="mt-1">
            <Link href="#" className="hover:underline">Privacy Policy</Link> &bull; <Link href="#" className="hover:underline">Terms of Service</Link>
        </p>
      </footer>
    </div>
  );
}

