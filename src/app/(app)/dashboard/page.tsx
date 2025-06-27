
"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from "next/link";
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowRight, Calendar, FileText, Sparkles, User, Bell, Clock, AlertCircle, Sun, Moon } from "lucide-react";
import { HealthAdWidget } from '@/components/HealthAdWidget';
import { APP_NAME } from '@/config/site';
import { useTheme } from 'next-themes';
import { Skeleton } from '@/components/ui/skeleton';


// Mock data, in a real app this would come from an API
const mockAppointments = [
  { id: '1', title: 'Follow-up Check', date: new Date(new Date().setHours(10,0,0,0)), doctor: 'Dr. Siddharth Shukla'},
  { id: '2', title: 'Eye Exam', date: new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(11,0,0,0)), doctor: 'Dr. Anya Sharma'},
  { id: '3', title: 'Annual Physical Exam', date: new Date(new Date().setDate(new Date().getDate() + 7)), doctor: 'Dr. Siddharth Shukla' },
];

const mockNotifications = [
  { id: '1', type: 'message', title: 'New Message from Dr. Singh', message: 'Please review your latest ECG results.', timestamp: new Date(Date.now() - 3600000 * 1) },
  { id: '2', type: 'alert', title: 'Medication Refill Due', message: 'Your prescription for Metformin needs a refill.', timestamp: new Date(Date.now() - 3600000 * 24 * 2) },
  { id: '3', type: 'update', title: 'New Lab Results', message: 'Your blood test results are available.', timestamp: new Date(Date.now() - 3600000 * 5)},
];


export default function DashboardPage() {
  const [userName, setUserName] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // This is client-side only to avoid hydration errors
    const storedFirstName = localStorage.getItem('userFirstName');
    setUserName(storedFirstName || "User");
    setIsMounted(true);
  }, []);

  const quickActionCards = [
    { title: "Schedule Appointment", description: "Manage your upcoming visits.", icon: Calendar, href: "/appointments", color: "text-blue-500", bgColor: "bg-blue-500/10" },
    { title: "Analyze Document", description: "Get AI insights on your reports.", icon: FileText, href: "/documents", color: "text-green-500", bgColor: "bg-green-500/10" },
    { title: "Ask AI Assistant", description: "Get answers to health questions.", icon: Sparkles, href: "/assistant", color: "text-purple-500", bgColor: "bg-purple-500/10" },
    { title: "View Your Profile", description: "Update your personal details.", icon: User, href: "/profile", color: "text-orange-500", bgColor: "bg-orange-500/10" },
  ];
  
  const upcomingAppointments = useMemo(() => {
    // This calculation is now safe as it's within a 'use client' component
    // and its rendering is handled conditionally.
    const now = new Date();
    return mockAppointments
        .filter(appt => appt.date >= now)
        .sort((a,b) => a.date.getTime() - b.date.getTime())
        .slice(0, 3);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title={isMounted ? `Welcome Back, ${userName || 'User'}!` : `Welcome Back...`}
        description="Here’s a quick overview of your health dashboard."
        actions={
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9 text-muted-foreground hover:text-primary hover:bg-primary/10" disabled={!isMounted}>
            {isMounted ? (
                <>
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </>
            ) : (
                <Skeleton className="h-5 w-5" />
            )}
        </Button>
        }
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {quickActionCards.map((card) => (
           <Card key={card.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${card.bgColor}`}>
                  <card.icon className={`h-6 w-6 ${card.color}`} />
                </div>
                <CardTitle className="font-headline text-lg text-card-foreground">{card.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{card.description}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full group">
                <Link href={card.href}>
                  Go to Section <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2 items-start">
        <Card className="shadow-xl hover:shadow-2xl transition-shadow">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center">
              <Calendar className="mr-3 h-6 w-6 text-primary"/>
              Upcoming Appointments
            </CardTitle>
            <CardDescription>Your next scheduled visits.</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                    {upcomingAppointments.map(appt => (
                        <div key={appt.id} className="flex items-center p-3 bg-secondary/40 rounded-lg">
                            <Avatar className="h-10 w-10 mr-4 bg-primary/10">
                                <AvatarFallback className="text-primary font-bold">
                                    {isMounted ? new Date(appt.date).getDate() : <Skeleton className="h-4 w-4"/>}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="font-semibold text-card-foreground">{appt.title}</p>
                                <p className="text-sm text-muted-foreground">{appt.doctor}</p>
                            </div>
                            <div className="text-right">
                                {isMounted ? (
                                  <>
                                    <p className="text-sm font-medium text-primary">{new Date(appt.date).toLocaleDateString(undefined, { weekday: 'short' })}</p>
                                    <p className="text-xs text-muted-foreground">{new Date(appt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                  </>
                                ) : (
                                  <>
                                    <Skeleton className="h-4 w-10 mb-1" />
                                    <Skeleton className="h-3 w-16" />
                                  </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-muted-foreground py-4 text-center">No upcoming appointments.</p>
            )}
          </CardContent>
           <CardFooter>
                <Button variant="link" asChild className="w-full text-primary">
                    <Link href="/appointments">View All Appointments</Link>
                </Button>
            </CardFooter>
        </Card>

        <Card className="shadow-xl hover:shadow-2xl transition-shadow">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center">
                <Bell className="mr-3 h-6 w-6 text-primary"/>
                Recent Notifications
            </CardTitle>
            <CardDescription>Your latest alerts and updates.</CardDescription>
          </CardHeader>
          <CardContent>
             {mockNotifications.length > 0 ? (
                <div className="space-y-3">
                    {mockNotifications.slice(0,3).map(notif => (
                        <div key={notif.id} className="flex items-start gap-3 p-3 bg-secondary/40 rounded-lg">
                           {notif.type === 'alert' ? <AlertCircle className="h-5 w-5 mt-1 text-red-500 flex-shrink-0" /> : <Clock className="h-5 w-5 mt-1 text-blue-500 flex-shrink-0" />}
                           <div>
                             <p className="font-semibold text-card-foreground text-sm">{notif.title}</p>
                             <p className="text-xs text-muted-foreground">{notif.message}</p>
                           </div>
                        </div>
                    ))}
                </div>
             ) : (
                 <p className="text-sm text-muted-foreground py-4 text-center">No new notifications.</p>
             )}
          </CardContent>
            <CardFooter>
                <Button variant="link" asChild className="w-full text-primary">
                    <Link href="/notifications">View All Notifications</Link>
                </Button>
            </CardFooter>
        </Card>
      </div>
      
      <HealthAdWidget />

    </div>
  );
}
