
'use client';

import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, Send, Building } from 'lucide-react';
import { APP_NAME } from '@/config/site';
import { useToast } from '@/hooks/use-toast';
import { useState, type FormEvent } from 'react';

export default function ContactUsPage() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!name || !email || !subject || !message) {
      toast({
        title: "Missing Information",
        description: "Please fill out all fields in the contact form.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log("Contact form submitted:", { name, email, subject, message });
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We will get back to you shortly.",
    });
    
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setIsSubmitting(false);
  };

  return (
    <div>
      <PageHeader
        title="Contact Us"
        description={`Get in touch with the ${APP_NAME} team. We're here to help you on your health journey!`}
      />
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-xl hover:shadow-2xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center font-headline text-xl">
              <Send className="mr-2 h-6 w-6 text-primary" />
              Send us a Message
            </CardTitle>
            <CardDescription>
              Fill out the form below and we&apos;ll respond as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="contact-name">Full Name</Label>
                <Input id="contact-name" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required className="bg-background focus:border-primary shadow-sm"/>
              </div>
              <div>
                <Label htmlFor="contact-email">Email Address</Label>
                <Input id="contact-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-background focus:border-primary shadow-sm"/>
              </div>
              <div>
                <Label htmlFor="contact-subject">Subject</Label>
                <Input id="contact-subject" placeholder="Reason for contacting" value={subject} onChange={(e) => setSubject(e.target.value)} required className="bg-background focus:border-primary shadow-sm"/>
              </div>
              <div>
                <Label htmlFor="contact-message">Message</Label>
                <Textarea id="contact-message" placeholder="Your message..." rows={5} value={message} onChange={(e) => setMessage(e.target.value)} required className="bg-background focus:border-primary shadow-sm"/>
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <Send className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-xl hover:shadow-2xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center font-headline text-xl">
              <Building className="mr-2 h-6 w-6 text-primary" />
              Our Contact Information
            </CardTitle>
            <CardDescription>
              Other ways to reach us for inquiries or support.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start space-x-4 p-4 bg-secondary/30 rounded-lg shadow-sm">
              <Mail className="h-7 w-7 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-card-foreground">Email Us</h3>
                <p className="text-muted-foreground hover:text-primary transition-colors"><a href={`mailto:support@${APP_NAME.toLowerCase()}.com`}>support@{APP_NAME.toLowerCase()}.com</a> (Support)</p>
                <p className="text-muted-foreground hover:text-primary transition-colors"><a href={`mailto:info@${APP_NAME.toLowerCase()}.com`}>info@{APP_NAME.toLowerCase()}.com</a> (General)</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 bg-secondary/30 rounded-lg shadow-sm">
              <Phone className="h-7 w-7 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-card-foreground">Call Us</h3>
                <p className="text-muted-foreground">+91-XXX-XXXXXXX (Customer Support)</p>
                <p className="text-muted-foreground">+91-YYY-YYYYYYY (General Inquiries)</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 bg-secondary/30 rounded-lg shadow-sm">
              <MapPin className="h-7 w-7 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-card-foreground">Our Office</h3>
                <p className="text-muted-foreground">
                  Office in Civil Lines, near PVR,
                  <br />
                  Prayagraj, Uttar Pradesh, India
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
    
