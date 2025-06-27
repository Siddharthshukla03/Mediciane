
"use client";

import { useState, useEffect } from 'react';
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronRight, Palette, BellRing, ShieldCheck, Languages, HelpCircle, Info, LogOut, UserCircle2, Edit3, Trash2 } from "lucide-react";
import Link from "next/link";
import { APP_NAME } from '@/config/site';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/context/LanguageContext';
import { useTheme } from 'next-themes';
import { Skeleton } from '@/components/ui/skeleton';

export default function SettingsPage() {
  const { toast } = useToast();
  const { t, locale, setLocale } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [appointmentReminders, setAppointmentReminders] = useState(true);
  const [medicationAlerts, setMedicationAlerts] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [appRegion, setAppRegion] = useState("in");

  useEffect(() => {
    setIsMounted(true);
  }, []);


  const handleSettingChange = (settingName: string, value: string | boolean) => {
    toast({
      title: "Setting Saved",
      description: `${settingName} has been updated.`,
    });
  };

  const handleLanguageChange = (value: string) => {
    setLocale(value);
    // The toast notification is now implicitly handled by the context change if desired,
    // or we can keep it for explicit user feedback.
    toast({
      title: "Language Updated",
      description: `Language has been set to ${value}.`
    });
  };

  if (!isMounted) {
    return (
       <div>
        <PageHeader
          title="Settings"
          description="Loading your preferences..."
        />
        <div className="space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
           <div className="space-y-4">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
           <div className="space-y-4">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={t('settings.title')}
        description={t('settings.description', { appName: APP_NAME })}
      />
      <div className="space-y-8">
        
        <Card className="shadow-xl hover:shadow-2xl transition-shadow">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center"><UserCircle2 className="mr-3 h-6 w-6 text-primary" />{t('settings.accountManagement.title')}</CardTitle>
            <CardDescription>{t('settings.accountManagement.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-between group" asChild>
                <Link href="/profile" className="flex items-center justify-between w-full">
                    <span>{t('settings.accountManagement.editProfile')}</span>
                    <Edit3 className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
            </Button>
            <Button variant="outline" className="w-full justify-between group">{t('settings.accountManagement.changeEmail')} <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" /></Button>
            <Button variant="outline" className="w-full justify-between group">{t('settings.accountManagement.changePassword')} <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" /></Button>
            <Button variant="outline" className="w-full justify-between text-destructive border-destructive/50 hover:text-destructive-foreground hover:bg-destructive/90 group">{t('settings.accountManagement.deleteAccount')} <Trash2 className="h-4 w-4 group-hover:text-destructive-foreground transition-colors" /></Button>
          </CardContent>
        </Card>

        <Card className="shadow-xl hover:shadow-2xl transition-shadow">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center"><BellRing className="mr-3 h-6 w-6 text-primary" />{t('settings.notifications.title')}</CardTitle>
            <CardDescription>{t('settings.notifications.description', { appName: APP_NAME })}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg shadow-sm">
              <Label htmlFor="email-notifications" className="font-medium text-card-foreground">{t('settings.notifications.email')}</Label>
              <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={(checked) => { setEmailNotifications(checked); handleSettingChange(t('settings.notifications.email'), checked ? 'Enabled' : 'Disabled'); }} />
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg shadow-sm">
              <Label htmlFor="push-notifications" className="font-medium text-card-foreground">{t('settings.notifications.push')}</Label>
              <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={(checked) => { setPushNotifications(checked); handleSettingChange(t('settings.notifications.push'), checked ? 'Enabled' : 'Disabled'); }} />
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg shadow-sm">
              <Label htmlFor="appointment-reminders" className="font-medium text-card-foreground">{t('settings.notifications.reminders')}</Label>
              <Switch id="appointment-reminders" checked={appointmentReminders} onCheckedChange={(checked) => { setAppointmentReminders(checked); handleSettingChange(t('settings.notifications.reminders'), checked ? 'Enabled' : 'Disabled'); }} />
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg shadow-sm">
              <Label htmlFor="medication-alerts" className="font-medium text-card-foreground">{t('settings.notifications.medicationAlerts')}</Label>
              <Switch id="medication-alerts" checked={medicationAlerts} onCheckedChange={(checked) => { setMedicationAlerts(checked); handleSettingChange(t('settings.notifications.medicationAlerts'), checked ? 'Enabled' : 'Disabled'); }} />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl hover:shadow-2xl transition-shadow">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center"><ShieldCheck className="mr-3 h-6 w-6 text-primary" />{t('settings.privacy.title')}</CardTitle>
            <CardDescription>{t('settings.privacy.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg shadow-sm">
              <Label htmlFor="data-sharing" className="font-medium text-card-foreground flex-1 pr-2">{t('settings.privacy.dataSharing')}</Label>
              <Switch id="data-sharing" checked={dataSharing} onCheckedChange={(checked) => { setDataSharing(checked); handleSettingChange(t('settings.privacy.dataSharing'), checked ? 'Allowed' : 'Disallowed'); }} />
            </div>
            <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg shadow-sm">
              <Label htmlFor="two-factor-auth" className="font-medium text-card-foreground">{t('settings.privacy.twoFactorAuth')}</Label>
              <Switch id="two-factor-auth" checked={twoFactorAuth} onCheckedChange={(checked) => { setTwoFactorAuth(checked); handleSettingChange(t('settings.privacy.twoFactorAuth'), checked ? 'Enabled' : 'Disabled'); }} />
            </div>
            <Button variant="outline" className="w-full justify-between group">{t('settings.privacy.activityLog')} <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" /></Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-xl hover:shadow-2xl transition-shadow">
            <CardHeader>
                <CardTitle className="font-headline text-xl flex items-center"><Palette className="mr-3 h-6 w-6 text-primary"/>{t('settings.appearance.title')}</CardTitle>
                <CardDescription>{t('settings.appearance.description', { appName: APP_NAME })}</CardDescription>
            </CardHeader>
            <CardContent>
                 <div>
                    <Label htmlFor="theme-preference">{t('settings.theme.label')}</Label>
                    <Select value={theme} onValueChange={setTheme}>
                        <SelectTrigger id="theme-preference" className="bg-background focus:border-primary shadow-sm">
                        <SelectValue placeholder={t('settings.theme.label')} />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="system">{t('settings.theme.system')}</SelectItem>
                        <SelectItem value="light">{t('settings.theme.light')}</SelectItem>
                        <SelectItem value="dark">{t('settings.theme.dark')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>

        <Card className="shadow-xl hover:shadow-2xl transition-shadow">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center"><Languages className="mr-3 h-6 w-6 text-primary" />{t('settings.language.title')}</CardTitle>
            <CardDescription>{t('settings.language.description', { appName: APP_NAME })}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="app-language">{t('settings.language.label')}</Label>
              <Select value={locale} onValueChange={handleLanguageChange}>
                <SelectTrigger id="app-language" className="bg-background focus:border-primary shadow-sm">
                  <SelectValue placeholder={t('settings.language.label')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">{t('settings.language.en')}</SelectItem>
                  <SelectItem value="hi">{t('settings.language.hi')}</SelectItem>
                  <SelectItem value="bn">{t('settings.language.bn')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="app-region">{t('settings.region.label')}</Label>
              <Select value={appRegion} onValueChange={(value) => { setAppRegion(value); handleSettingChange(t('settings.region.label'), value); }}>
                <SelectTrigger id="app-region" className="bg-background focus:border-primary shadow-sm">
                  <SelectValue placeholder={t('settings.region.label')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">{t('settings.region.us')}</SelectItem>
                  <SelectItem value="ca">{t('settings.region.ca')}</SelectItem>
                  <SelectItem value="gb">{t('settings.region.gb')}</SelectItem>
                  <SelectItem value="au">{t('settings.region.au')}</SelectItem>
                  <SelectItem value="in">{t('settings.region.in')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-xl hover:shadow-2xl transition-shadow">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center"><HelpCircle className="mr-3 h-6 w-6 text-primary" />{t('settings.help.title')}</CardTitle>
            <CardDescription>{t('settings.help.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-between group" asChild><Link href="/contact-us#faq" className="flex items-center justify-between w-full">{t('settings.help.faq')} <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" /></Link></Button>
            <Button variant="outline" className="w-full justify-between group" asChild><Link href="/contact-us" className="flex items-center justify-between w-full">{t('settings.help.contact')} <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" /></Link></Button>
            <Button variant="outline" className="w-full justify-between group" asChild><Link href="#" className="flex items-center justify-between w-full">{t('settings.help.reportIssue')} <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" /></Link></Button>
          </CardContent>
        </Card>

        <Card className="shadow-xl hover:shadow-2xl transition-shadow">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center"><Info className="mr-3 h-6 w-6 text-primary" />{t('settings.about.title', { appName: APP_NAME })}</CardTitle>
            <CardDescription>{t('settings.about.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center text-sm p-3 bg-secondary/30 rounded-lg shadow-sm">
              <span className="text-muted-foreground">{t('settings.about.version')}</span>
              <span className="font-medium text-foreground">1.0.2 (Beta)</span>
            </div>
            <Button variant="outline" className="w-full justify-between group">{t('settings.about.checkForUpdates')} <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" /></Button>
            <Button variant="link" className="w-full justify-start px-0 text-primary hover:underline" asChild><Link href="#">{t('settings.about.terms')}</Link></Button>
            <Button variant="link" className="w-full justify-start px-0 text-primary hover:underline" asChild><Link href="#">{t('settings.about.privacy')}</Link></Button>
          </CardContent>
        </Card>

        <Card className="shadow-xl hover:shadow-2xl transition-shadow border-destructive/50 bg-destructive/5">
          <CardHeader>
             <CardTitle className="font-headline text-xl flex items-center text-destructive"><LogOut className="mr-3 h-6 w-6" />{t('settings.logout.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" className="w-full" asChild>
                <Link href="/login">{t('settings.logout.button', { appName: APP_NAME })}</Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-3 text-center">{t('settings.logout.description')}</p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
