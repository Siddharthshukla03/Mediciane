
"use client";

import { useState, useEffect } from 'react'; // Added useEffect
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'; // Added CardFooter
import { Bell, CheckCircle, AlertCircle, Info, X, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type NotificationType = 'reminder' | 'alert' | 'update' | 'message';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  link?: string;
}

const initialMockNotifications: Notification[] = [
  {
    id: '1',
    type: 'reminder',
    title: 'Appointment Reminder',
    message: 'Your appointment with Dr. Shukla is tomorrow at 10:00 AM.',
    timestamp: new Date(new Date().setDate(new Date().getDate() + 0.5)), // 12 hours from now
    read: false,
    link: '/appointments'
  },
  {
    id: '2',
    type: 'alert',
    title: 'Medication Refill Due',
    message: 'Your prescription for Metformin needs a refill soon.',
    timestamp: new Date(Date.now() - 3600000 * 24 * 2), // 2 days ago
    read: true,
  },
  {
    id: '3',
    type: 'update',
    title: 'New Lab Results Available',
    message: 'Your recent blood test results are now available in your documents.',
    timestamp: new Date(Date.now() - 3600000 * 5), // 5 hours ago
    read: false,
    link: '/documents'
  },
  {
    id: '4',
    type: 'message',
    title: 'New Message from Dr. Singh',
    message: 'Dr. Singh has sent you a new secure message regarding your query.',
    timestamp: new Date(Date.now() - 3600000 * 1), // 1 hour ago
    read: false,
    link: '/messages'
  },
  {
    id: '5',
    type: 'update',
    title: 'Profile Information Updated',
    message: 'Your contact information was successfully updated.',
    timestamp: new Date(Date.now() - 3600000 * 24 * 5), // 5 days ago
    read: true,
  },
];

const getNotificationIcon = (type: NotificationType, read: boolean) => {
  const colorClass = read ? "text-muted-foreground" : 
    type === 'reminder' ? "text-blue-500" :
    type === 'alert' ? "text-red-500" :
    type === 'update' ? "text-green-500" :
    type === 'message' ? "text-purple-500" :
    "text-gray-500";

  switch (type) {
    case 'reminder': return <Bell className={cn("h-5 w-5", colorClass)} />;
    case 'alert': return <AlertCircle className={cn("h-5 w-5", colorClass)} />;
    case 'update': return <Info className={cn("h-5 w-5", colorClass)} />;
    case 'message': return <MessageSquare className={cn("h-5 w-5", colorClass)} />;
    default: return <Info className={cn("h-5 w-5", colorClass)} />;
  }
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setNotifications(initialMockNotifications.sort((a,b) => b.timestamp.getTime() - a.timestamp.getTime()));
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div>
      <PageHeader
        title="Notifications"
        description="Stay updated with important alerts, messages, and reminders."
        actions={
          unreadCount > 0 ? (
            <Button onClick={markAllAsRead} variant="outline" size="sm">
              <CheckCircle className="mr-2 h-4 w-4" /> Mark all as read ({unreadCount})
            </Button>
          ) : null
        }
      />

      {notifications.length === 0 ? (
        <Card className="shadow-xl hover:shadow-2xl transition-shadow">
            <CardContent className="p-10 text-center text-muted-foreground">
                <Bell size={48} className="mx-auto mb-6 opacity-50 text-primary/70" />
                <p className="text-lg">You have no notifications at the moment.</p>
                <p className="text-sm mt-1">Check back later for updates.</p>
            </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={cn(
                "shadow-lg hover:shadow-xl transition-shadow relative border",
                !notification.read && "border-primary/50 bg-primary/5",
                notification.read && "bg-card"
              )}
            >
              <Button variant="ghost" size="icon" className="absolute top-3 right-3 h-7 w-7 text-muted-foreground hover:text-destructive z-10" onClick={() => deleteNotification(notification.id)}>
                  <X size={16} />
                  <span className="sr-only">Delete notification</span>
              </Button>
              <CardHeader className="flex flex-row items-start space-x-4 pb-2 pt-5">
                <div className="flex-shrink-0 pt-1">{getNotificationIcon(notification.type, notification.read)}</div>
                <div className="flex-1">
                  <CardTitle className={cn("text-base font-semibold", !notification.read ? "text-primary" : "text-card-foreground")}>{notification.title}</CardTitle>
                  <CardDescription className="text-xs">
                    {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pl-12 pb-4 pt-0">
                <p className={cn("text-sm", !notification.read ? "text-foreground" : "text-muted-foreground")}>{notification.message}</p>
              </CardContent>
              {(notification.link || !notification.read) && (
                <CardFooter className="pl-12 pb-4 pt-2 border-t border-border/50 mt-2 flex items-center justify-end space-x-3">
                    {notification.link && (
                        <Button asChild variant="link" size="sm" className="p-0 h-auto text-primary">
                            <Link href={notification.link}>View Details</Link>
                        </Button>
                    )}
                    {!notification.read && (
                        <Button onClick={() => markAsRead(notification.id)} variant="outline" size="sm" className="bg-background">
                            Mark as read
                        </Button>
                    )}
                </CardFooter>
              )}
              {!notification.read && 
                <Badge variant="default" className="absolute top-4 left-4 text-xs px-1.5 py-0.5 bg-accent text-accent-foreground">New</Badge>
              }
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
