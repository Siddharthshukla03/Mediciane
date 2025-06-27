
"use client";

import { useState, useEffect, useMemo, type FormEvent } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { PlusCircle, CalendarDays, Clock, Users, Edit3, Trash2 } from 'lucide-react';
import { format, isSameDay, startOfDay } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface Appointment {
  id: string;
  title: string;
  date: Date;
  doctor: string;
  notes?: string;
}

const initialMockAppointments: Appointment[] = [
  { id: '1', title: 'Annual Physical Exam', date: new Date(new Date().setDate(new Date().getDate() + 7)), doctor: 'Dr. Siddharth Shukla', notes: 'Routine check-up, bring fasting blood work results.' },
  { id: '2', title: 'Dental Cleaning & Check-up', date: new Date(new Date().setDate(new Date().getDate() + 14)), doctor: 'Dr. Som Kumar Singh', notes: 'Standard cleaning and review. Mentioned slight tooth sensitivity.' },
  { id: '3', title: 'Dermatology Consultation', date: new Date(new Date().setDate(new Date().getDate() + 30)), doctor: 'Dr. Khushi Rajput', notes: 'Follow-up on skin rash treatment. Prepare list of current medications.' },
  { id: 'appt_today_10am', title: 'Follow-up Check', date: new Date(new Date().setHours(10,0,0,0)), doctor: 'Dr. Siddharth Shukla', notes: 'Discuss recent lab results.'},
  { id: 'appt_today_2pm', title: 'Physiotherapy Session', date: new Date(new Date().setHours(14,0,0,0)), doctor: 'Kinetic Physiotherapy Clinic', notes: 'Focus on knee rehabilitation.'},
  { id: 'appt_tomorrow_11am', title: 'Eye Exam', date: new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(11,0,0,0)), doctor: 'Dr. Anya Sharma', notes: 'Annual vision check.'},
];

// Generate time slots from 10 AM to 5 PM at 30-min intervals
const timeSlots = Array.from({ length: 15 }, (_, i) => {
    const hour = 10 + Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    return `${String(hour).padStart(2, '0')}:${minute}`;
});


export default function AppointmentsPage() {
  const [now, setNow] = useState<Date | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

  const [formTitle, setFormTitle] = useState('');
  const [formDoctor, setFormDoctor] = useState('');
  const [formTime, setFormTime] = useState('10:00'); // Default to the first time slot
  const [formNotes, setFormNotes] = useState('');
  const [formDate, setFormDate] = useState<Date | undefined>(new Date());

  const { toast } = useToast();

  useEffect(() => {
    setNow(new Date());
    setAppointments(initialMockAppointments.sort((a,b) => a.date.getTime() - b.date.getTime()));
  }, []);

  const appointmentDates = useMemo(() => {
    return appointments.map(appt => startOfDay(appt.date));
  }, [appointments]);

  const displayedAppointments = useMemo(() => {
    if (!selectedDate) {
        // If no date is selected, show all upcoming appointments from today onwards
        return appointments
            .filter(appt => now && appt.date >= startOfDay(now))
            .sort((a,b) => a.date.getTime() - b.date.getTime());
    }
    // Filter appointments for the selected date
    return appointments
      .filter(appt => isSameDay(appt.date, selectedDate))
      .sort((a,b) => a.date.getTime() - b.date.getTime());
  }, [appointments, selectedDate, now]);

  const handleOpenFormModal = (dateForForm?: Date, appointmentToEdit?: Appointment) => {
    const targetDate = dateForForm || selectedDate || new Date();
    if (appointmentToEdit) {
      setEditingAppointment(appointmentToEdit);
      setFormTitle(appointmentToEdit.title);
      setFormDoctor(appointmentToEdit.doctor);
      setFormTime(format(appointmentToEdit.date, 'HH:mm'));
      setFormNotes(appointmentToEdit.notes || '');
      setFormDate(appointmentToEdit.date);
    } else {
      setEditingAppointment(null);
      setFormTitle('');
      setFormDoctor('');
      setFormTime('10:00'); 
      setFormNotes('');
      setFormDate(targetDate);
    }
    setIsFormModalOpen(true);
  };

  const handleSubmitAppointmentForm = (e: FormEvent) => {
    e.preventDefault();
    if (!formDate || !formTitle || !formDoctor || !formTime) {
      toast({ title: "Missing Information", description: "Please fill all required fields.", variant: "destructive"});
      return;
    }

    const [hours, minutes] = formTime.split(':').map(Number);
    const appointmentDateTime = new Date(formDate); 
    appointmentDateTime.setHours(hours, minutes, 0, 0);

    if (!editingAppointment && appointmentDateTime < new Date()) {
        toast({ title: "Invalid Date/Time", description: "Cannot schedule appointments in the past.", variant: "destructive"});
        return;
    }

    if (editingAppointment) {
      setAppointments(prev => prev.map(appt => appt.id === editingAppointment.id ? { ...appt, title: formTitle, date: appointmentDateTime, doctor: formDoctor, notes: formNotes } : appt).sort((a,b) => a.date.getTime() - b.date.getTime()));
      toast({ title: "Appointment Updated!", description: `${formTitle} with ${formDoctor} updated successfully.`});
    } else {
      const newAppointment: Appointment = {
        id: String(Date.now()),
        title: formTitle,
        date: appointmentDateTime,
        doctor: formDoctor,
        notes: formNotes,
      };
      setAppointments(prev => [...prev, newAppointment].sort((a,b) => a.date.getTime() - b.date.getTime()));
      toast({ title: "Appointment Scheduled!", description: `${formTitle} with ${formDoctor} on ${format(appointmentDateTime, "PPP 'at' p")}.`});
    }
    setIsFormModalOpen(false);
  };

  const handleDeleteAppointment = (appointmentId: string, appointmentTitle: string) => {
    setAppointments(prev => prev.filter(a => a.id !== appointmentId));
    toast({title: "Appointment Cancelled", description: `${appointmentTitle} has been removed from your schedule.`});
  };

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Manage Appointments"
        description="View your schedule by date and manage your appointments."
        actions={
          <Button onClick={() => handleOpenFormModal(selectedDate || new Date())}>
            <PlusCircle className="mr-2 h-4 w-4" /> Schedule New Appointment
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="md:col-span-1">
          <Card className="shadow-xl hover:shadow-2xl transition-shadow h-full">
            <CardHeader>
              <CardTitle className="font-headline text-lg flex items-center">
                <CalendarDays className="mr-2 h-5 w-5 text-primary"/> Select Date
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 md:p-2 flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  if (!editingAppointment && date) setFormDate(date);
                }}
                className="rounded-md border shadow-inner bg-card [&_button]:text-base"
                modifiers={{ 
                  booked: appointmentDates,
                  disabled: (date) => now ? date < startOfDay(now) && !isSameDay(date, startOfDay(now)) : false
                }}
                modifiersClassNames={{
                    booked: "border-2 border-primary rounded-md",
                }}
                footer={selectedDate && <p className="text-xs text-muted-foreground text-center pt-2">Selected: {format(selectedDate, 'PPP')}</p>}
              />
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 flex flex-col min-h-0">
          <Card className="shadow-xl hover:shadow-2xl transition-shadow flex-1 flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline text-lg flex items-center">
                <Users className="mr-2 h-5 w-5 text-primary"/>
                Appointments for {selectedDate ? format(selectedDate, 'PPP') : 'All Upcoming'}
              </CardTitle>
              <CardDescription>
                {displayedAppointments.length > 0
                  ? `You have ${displayedAppointments.length} appointment(s) scheduled.`
                  : "No appointments found for this selection."}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden">
              <ScrollArea className="h-full"> 
                <div className="p-4 space-y-4">
                {displayedAppointments.length > 0 ? (
                  displayedAppointments.map((appt) => (
                    <Card key={appt.id} className="bg-background hover:shadow-md transition-shadow border rounded-lg">
                      <CardHeader className="pb-3 flex-row justify-between items-start">
                        <div>
                          <CardTitle className="text-md text-primary">{appt.title}</CardTitle>
                          <CardDescription className="text-xs pt-0.5 flex items-center">
                            <Users className="mr-1.5 h-3 w-3 text-muted-foreground"/> {appt.doctor}
                          </CardDescription>
                        </div>
                        <Badge variant={appt.date < (now || new Date()) && !isSameDay(appt.date, (now || new Date())) ? "outline" : "default"} 
                               className={appt.date < (now || new Date()) && !isSameDay(appt.date, (now || new Date())) ? "border-muted-foreground text-muted-foreground" : "bg-primary/10 text-primary border-primary/30"}>
                          <Clock className="mr-1.5 h-3 w-3"/>{format(appt.date, 'p')}
                        </Badge>
                      </CardHeader>
                      {appt.notes && (
                        <CardContent className="py-2 text-xs border-t mt-2">
                          <p className="font-semibold text-muted-foreground mb-1">Notes:</p>
                          <p className="text-foreground bg-secondary/40 p-2 rounded-md whitespace-pre-wrap">{appt.notes}</p>
                        </CardContent>
                      )}
                      <CardFooter className="flex justify-end gap-2 pt-3 pb-3 border-t bg-secondary/20">
                        <Button variant="outline" size="sm" onClick={() => handleOpenFormModal(appt.date, appt)}>
                          <Edit3 className="mr-1.5 h-3 w-3" /> Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteAppointment(appt.id, appt.title)}>
                          <Trash2 className="mr-1.5 h-3 w-3" /> Cancel
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                      <CalendarDays size={40} className="mx-auto mb-3 text-primary opacity-60" />
                      <p className="text-md font-medium">No appointments for {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'your selection'}.</p>
                      <p className="text-xs">Select another date or schedule a new one using the button above.</p>
                  </div>
                )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isFormModalOpen} onOpenChange={setIsFormModalOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="font-headline text-xl text-primary">
              {editingAppointment ? 'Edit Appointment' : 'Schedule New Appointment'}
            </DialogTitle>
            <DialogDescription>
              {editingAppointment ? 'Update the details below.' : `Fill in the details for your appointment on ${formDate ? format(formDate, 'PPP') : 'the selected date'}.`}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitAppointmentForm} className="space-y-4 py-2">
            <div>
              <Label htmlFor="form-title">Appointment Title</Label>
              <Input id="form-title" placeholder="e.g., Annual Check-up" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} required className="bg-background focus:border-primary shadow-sm"/>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="form-date-display">Date</Label>
                    <Input id="form-date-display" type="text" value={formDate ? format(formDate, 'PPP') : ''} readOnly disabled className="bg-muted cursor-not-allowed shadow-sm"/>
                </div>
                <div>
                    <Label htmlFor="form-time">Time</Label>
                    <Select value={formTime} onValueChange={setFormTime} required>
                        <SelectTrigger id="form-time" className="bg-background focus:border-primary shadow-sm">
                            <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                        <SelectContent>
                            {timeSlots.map(time => (
                                <SelectItem key={time} value={time}>{format(new Date(`1970-01-01T${time}`), 'p')}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div>
              <Label htmlFor="form-doctor">Doctor / Specialist</Label>
                <Select value={formDoctor} onValueChange={setFormDoctor} required>
                <SelectTrigger id="form-doctor" className="bg-background focus:border-primary shadow-sm">
                  <SelectValue placeholder="Select a doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dr. Siddharth Shukla">Dr. Siddharth Shukla (General Practitioner)</SelectItem>
                  <SelectItem value="Dr. Som Kumar Singh">Dr. Som Kumar Singh (Cardiologist)</SelectItem>
                  <SelectItem value="Dr. Khushi Rajput">Dr. Khushi Rajput (Dermatologist)</SelectItem>
                  <SelectItem value="Dr. Anya Sharma">Dr. Anya Sharma (Ophthalmologist)</SelectItem>
                  <SelectItem value="Kinetic Physiotherapy Clinic">Kinetic Physiotherapy Clinic</SelectItem>
                  <SelectItem value="Other">Other (Specify in notes)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="form-notes">Notes (Optional)</Label>
              <Textarea id="form-notes" placeholder="e.g., Specific concerns, previous history for this visit." value={formNotes} onChange={(e) => setFormNotes(e.target.value)} rows={3} className="bg-background focus:border-primary shadow-sm"/>
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsFormModalOpen(false)}>Close</Button>
              <Button type="submit" className="min-w-[150px]">
                <PlusCircle className="mr-2 h-4 w-4" /> {editingAppointment ? 'Save Changes' : 'Schedule'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

