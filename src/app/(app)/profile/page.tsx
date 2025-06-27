
"use client";

import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UploadCloud, UserCircle2, Save, Mail, Phone, CalendarDays, MapPin, Heart, ShieldAlert, Users } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, type ChangeEvent, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { APP_NAME } from "@/config/site";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name is too long"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name is too long"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone: z.string().optional(),
  dob: z.string().optional(), 
  
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
  
  bloodType: z.string().optional(),
  allergies: z.string().optional(),
  currentProblems: z.string().optional(),
  diagnosedConditions: z.string().optional(),
  
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const initialProfileData: ProfileFormData = {
  firstName: "Alex", 
  lastName: "Doe",  
  email: "alex.doe@example.com", 
  phone: "+91 98765 43210",
  dob: "1990-01-01",
  street: "123 Health Avenue, Wellness Apartments",
  city: "Wellville",
  state: "CA",
  zip: "90210",
  country: "USA",
  bloodType: "O Positive",
  allergies: "Peanuts, Pollen, Dust Mites",
  currentProblems: "Occasional migraines, seasonal allergies",
  diagnosedConditions: "Mild Asthma (Childhood)",
  emergencyContactName: "Jane R. Doe (Spouse)",
  emergencyContactPhone: "+91 98765 11223",
};


export default function ProfilePage() {
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>("https://placehold.co/128x128.png"); // Default placeholder
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialProfileData,
  });

  useEffect(() => {
    const storedFirstName = localStorage.getItem('userFirstName');
    const storedLastName = localStorage.getItem('userLastName');
    
    reset({
      ...initialProfileData,
      firstName: storedFirstName || initialProfileData.firstName,
      lastName: storedLastName || initialProfileData.lastName,
    });
  }, [reset]);


  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    setIsFormSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    
    console.log("Profile data submitted:", data);
    if (profileImage) console.log("Profile image to upload:", profileImage.name);

    if (data.firstName) localStorage.setItem('userFirstName', data.firstName);
    if (data.lastName) localStorage.setItem('userLastName', data.lastName);
    
    toast({
      title: "Profile Updated Successfully!",
      description: "Your profile information has been saved.",
    });
    setIsFormSubmitting(false);
  };
  

  return (
    <div>
      <PageHeader
        title="Your Health Profile"
        description={`Manage your personal, medical, and emergency contact information with ${APP_NAME}.`}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="shadow-xl hover:shadow-2xl transition-shadow mb-8 bg-card">
          <CardHeader className="items-center text-center p-6">
            <div className="relative mb-4">
              <Avatar className="w-32 h-32 border-4 border-primary/30 shadow-lg ring-2 ring-primary/20">
                <AvatarImage src={profileImagePreview || undefined} alt="Profile Photo" data-ai-hint="person face portrait" />
                <AvatarFallback className="bg-muted text-muted-foreground">
                  <UserCircle2 size={64} />
                </AvatarFallback>
              </Avatar>
              <Button type="button" size="icon" variant="outline" className="absolute bottom-1 right-1 rounded-full bg-card hover:bg-secondary/80 w-10 h-10 shadow-md" onClick={() => document.getElementById('profile-photo-upload')?.click()}>
                <UploadCloud size={20} className="text-primary"/>
                <span className="sr-only">Upload photo</span>
              </Button>
              <Input id="profile-photo-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>
            <Controller name="firstName" control={control} render={({ field }) => (
                <CardTitle className="font-headline text-2xl text-primary">{field.value} {control._formValues.lastName}</CardTitle>
            )}/>
            <Controller name="email" control={control} render={({ field }) => (
                 <CardDescription className="text-muted-foreground">{field.value}</CardDescription>
            )}/>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow lg:col-span-1">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center"><UserCircle2 className="mr-2 text-primary"/>Personal Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Controller name="firstName" control={control} render={({ field }) => <Input id="firstName" {...field} className="bg-background focus:border-primary shadow-sm" />} />
                {errors.firstName && <p className="text-destructive text-xs mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Controller name="lastName" control={control} render={({ field }) => <Input id="lastName" {...field} className="bg-background focus:border-primary shadow-sm" />} />
                {errors.lastName && <p className="text-destructive text-xs mt-1">{errors.lastName.message}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Controller name="email" control={control} render={({ field }) => <Input id="email" type="email" {...field} className="bg-background focus:border-primary shadow-sm" />} />
                {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Contact Number</Label>
                <Controller name="phone" control={control} render={({ field }) => <Input id="phone" type="tel" {...field} placeholder="e.g., +91 90000 00000" className="bg-background focus:border-primary shadow-sm"/>} />
              </div>
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Controller name="dob" control={control} render={({ field }) => <Input id="dob" type="date" {...field} className="bg-background focus:border-primary shadow-sm"/>} />
              </div>
            </CardContent>
          </Card>

          {/* Address & Medical Info Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                <CardTitle className="font-headline text-xl flex items-center"><MapPin className="mr-2 text-primary"/>Address Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                <div>
                    <Label htmlFor="street">Street Address</Label>
                    <Controller name="street" control={control} render={({ field }) => <Input id="street" {...field} className="bg-background focus:border-primary shadow-sm"/>} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                    <Label htmlFor="city">City</Label>
                    <Controller name="city" control={control} render={({ field }) => <Input id="city" {...field} className="bg-background focus:border-primary shadow-sm"/>} />
                    </div>
                    <div>
                    <Label htmlFor="state">State / Province</Label>
                    <Controller name="state" control={control} render={({ field }) => <Input id="state" {...field} className="bg-background focus:border-primary shadow-sm"/>} />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                    <Label htmlFor="zip">Zip / Postal Code</Label>
                    <Controller name="zip" control={control} render={({ field }) => <Input id="zip" {...field} className="bg-background focus:border-primary shadow-sm"/>} />
                    </div>
                    <div>
                    <Label htmlFor="country">Country</Label>
                    <Controller name="country" control={control} render={({ field }) => <Input id="country" {...field} className="bg-background focus:border-primary shadow-sm"/>} />
                    </div>
                </div>
                </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                <CardTitle className="font-headline text-xl flex items-center"><Heart className="mr-2 text-primary"/>Medical Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                    <Label htmlFor="bloodType">Blood Type</Label>
                    <Controller name="bloodType" control={control} render={({ field }) => <Input id="bloodType" {...field} placeholder="e.g., O+" className="bg-background focus:border-primary shadow-sm"/>} />
                    </div>
                    <div>
                    <Label htmlFor="allergies">Allergies</Label>
                    <Controller name="allergies" control={control} render={({ field }) => <Input id="allergies" {...field} placeholder="e.g., Peanuts, Penicillin" className="bg-background focus:border-primary shadow-sm"/>} />
                    </div>
                </div>
                <div>
                    <Label htmlFor="currentProblems">Current Health Problems / Symptoms</Label>
                    <Controller name="currentProblems" control={control} render={({ field }) => <Textarea id="currentProblems" rows={3} {...field} placeholder="Describe any current health issues..." className="bg-background focus:border-primary shadow-sm"/>} />
                </div>
                <div>
                    <Label htmlFor="diagnosedConditions">Diagnosed Diseases / Conditions</Label>
                    <Controller name="diagnosedConditions" control={control} render={({ field }) => <Textarea id="diagnosedConditions" rows={3} {...field} placeholder="List any diagnosed conditions..." className="bg-background focus:border-primary shadow-sm"/>} />
                </div>
                </CardContent>
            </Card>
            
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                <CardTitle className="font-headline text-xl flex items-center"><ShieldAlert className="mr-2 text-primary"/>Emergency Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                    <Label htmlFor="emergencyContactName">Full Name</Label>
                    <Controller name="emergencyContactName" control={control} render={({ field }) => <Input id="emergencyContactName" {...field} className="bg-background focus:border-primary shadow-sm"/>} />
                    </div>
                    <div>
                    <Label htmlFor="emergencyContactPhone">Phone Number</Label>
                    <Controller name="emergencyContactPhone" control={control} render={({ field }) => <Input id="emergencyContactPhone" type="tel" {...field} className="bg-background focus:border-primary shadow-sm"/>} />
                    </div>
                </div>
                </CardContent>
            </Card>
          </div>
        </div>

        <CardFooter className="mt-8 p-0">
          <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isFormSubmitting}>
            {isFormSubmitting ? <Save className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save All Changes
          </Button>
        </CardFooter>
      </form>
    </div>
  );
}

