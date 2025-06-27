
"use client";

import { useState, useEffect } from 'react'; // Added useEffect
import { PageHeader } from '@/components/PageHeader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, UserCircle, Search, MessageSquarePlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Message {
  id: string;
  sender: 'user' | 'provider';
  text: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  providerName: string;
  specialty: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  avatarUrl?: string;
  dataAiHint?: string;
  messages: Message[];
}

const initialMockConversations: Conversation[] = [
  {
    id: '1',
    providerName: 'Dr. Siddharth Shukla',
    specialty: 'General Practitioner',
    lastMessage: 'Yes, your test results are available. We can discuss them in your next appointment.',
    timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
    unreadCount: 1,
    avatarUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'doctor male indian',
    messages: [
      { id: 'm1', sender: 'user', text: 'Hi Dr. Shukla, are my recent blood test results in?', timestamp: new Date(Date.now() - 3600000 * 2.5) },
      { id: 'm2', sender: 'provider', text: 'Yes, your test results are available. We can discuss them in your next appointment.', timestamp: new Date(Date.now() - 3600000 * 2) },
    ],
  },
  {
    id: '2',
    providerName: 'Support Team',
    specialty: 'Medicinae Helpdesk',
    lastMessage: 'We are looking into your query about appointment scheduling.',
    timestamp: new Date(Date.now() - 3600000 * 24 * 1), // 1 day ago
    unreadCount: 0,
    avatarUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'support team logo',
    messages: [
       { id: 'm3', sender: 'user', text: 'I am having trouble scheduling an appointment for next week.', timestamp: new Date(Date.now() - 3600000 * 24 * 1.1) },
       { id: 'm4', sender: 'provider', text: 'We are looking into your query about appointment scheduling.', timestamp: new Date(Date.now() - 3600000 * 24 * 1) },
    ],
  },
   {
    id: '3',
    providerName: 'Dr. Som Kumar Singh',
    specialty: 'Cardiologist',
    lastMessage: 'Please schedule a follow-up for your blood pressure check.',
    timestamp: new Date(Date.now() - 3600000 * 24 * 2), // 2 days ago
    unreadCount: 0,
    avatarUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'doctor male indian',
    messages: [
      { id: 'm5', sender: 'user', text: 'Hello Dr. Singh, any updates on my ECG report?', timestamp: new Date(Date.now() - 3600000 * 24 * 2.2) },
      { id: 'm6', sender: 'provider', text: "Please schedule a follow-up for your blood pressure check.", timestamp: new Date(Date.now() - 3600000 * 24 * 2) },
    ],
  },
  {
    id: '4',
    providerName: 'Dr. Khushi Rajput',
    specialty: 'Dermatologist',
    lastMessage: 'Your prescription has been sent to your pharmacy.',
    timestamp: new Date(Date.now() - 3600000 * 4), // 4 hours ago
    unreadCount: 2,
    avatarUrl: 'https://placehold.co/100x100.png',
    dataAiHint: 'doctor female indian',
    messages: [
      { id: 'm7', sender: 'user', text: 'Hi Dr. Rajput, I have a question about my new skincare routine.', timestamp: new Date(Date.now() - 3600000 * 4.5) },
      { id: 'm8', sender: 'provider', text: 'Your prescription has been sent to your pharmacy.', timestamp: new Date(Date.now() - 3600000 * 4) },
    ],
  },
];


export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Load mock conversations on client side
  useEffect(() => {
    const sortedConversations = initialMockConversations.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    setConversations(sortedConversations);
    if (sortedConversations.length > 0) {
        setSelectedConversationId(sortedConversations[0].id);
    }
  }, []);

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversationId) return;

    const message: Message = {
      id: String(Date.now()),
      sender: 'user',
      text: newMessage,
      timestamp: new Date(),
    };

    setConversations(prev =>
      prev.map(convo =>
        convo.id === selectedConversationId
          ? { ...convo, messages: [...convo.messages, message], lastMessage: newMessage, timestamp: new Date() }
          : convo
      ).sort((a,b) => b.timestamp.getTime() - a.timestamp.getTime()) // Keep sorted
    );
    setNewMessage('');
    // Mock provider reply
    setTimeout(() => {
       setConversations(prev =>
        prev.map(convo =>
          convo.id === selectedConversationId
            ? { ...convo, messages: [...convo.messages, {id: String(Date.now()+1), sender: 'provider', text: "Thanks for your message. We'll get back to you shortly.", timestamp: new Date()}]}
            : convo
        ).sort((a,b) => b.timestamp.getTime() - a.timestamp.getTime()) // Keep sorted
      );
    }, 1500);
  };

  const filteredConversations = conversations.filter(convo => 
    convo.providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    convo.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-var(--header-height,4rem)-2rem)] flex flex-col">
      <PageHeader
        title="Secure Messages"
        description="Communicate securely with your healthcare providers."
        actions={<Button variant="outline"><MessageSquarePlus className="mr-2 h-4 w-4" /> New Message</Button>}
      />

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-hidden">
        {/* Conversations List */}
        <div className="md:col-span-1 lg:col-span-1 bg-card p-4 rounded-lg shadow-xl flex flex-col h-full">
          <div className="relative mb-4">
            <Input 
              type="search" 
              placeholder="Search conversations..." 
              className="pl-10 bg-background focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
          <ScrollArea className="flex-1 -mx-4">
            <div className="px-4 space-y-1">
            {filteredConversations.map((convo) => (
              <button
                key={convo.id}
                onClick={() => setSelectedConversationId(convo.id)}
                className={cn(
                  "w-full text-left p-3 rounded-lg hover:bg-secondary/50 transition-colors flex items-start space-x-3 border border-transparent",
                  selectedConversationId === convo.id && "bg-primary/10 text-primary border-primary/30"
                )}
              >
                <Avatar className="h-10 w-10 border">
                  {convo.avatarUrl && <AvatarImage src={convo.avatarUrl} alt={convo.providerName} data-ai-hint={convo.dataAiHint || "profile picture"} /> }
                  <AvatarFallback className={cn(selectedConversationId === convo.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                    {convo.providerName.split(' ').map(n=>n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-center">
                    <h3 className={cn("font-semibold text-sm truncate", selectedConversationId === convo.id ? "text-primary" : "text-card-foreground")}>{convo.providerName}</h3>
                    {convo.unreadCount > 0 && (
                      <span className="text-xs bg-accent text-accent-foreground rounded-full px-1.5 py-0.5 font-medium">
                        {convo.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{convo.specialty}</p>
                  <p className={cn("text-xs truncate mt-1", selectedConversationId === convo.id ? "text-primary/80" : "text-muted-foreground")}>{convo.lastMessage}</p>
                </div>
              </button>
            ))}
            {filteredConversations.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No conversations found.</p>}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Window */}
        <div className="md:col-span-2 lg:col-span-3 bg-card rounded-lg shadow-xl flex flex-col h-full overflow-hidden">
          {selectedConversation ? (
            <>
              <header className="p-4 border-b border-border flex items-center space-x-3 bg-secondary/30">
                <Avatar className="h-10 w-10 border">
                 {selectedConversation.avatarUrl && <AvatarImage src={selectedConversation.avatarUrl} alt={selectedConversation.providerName} data-ai-hint={selectedConversation.dataAiHint || "profile picture"} /> }
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {selectedConversation.providerName.split(' ').map(n=>n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-card-foreground">{selectedConversation.providerName}</h2>
                  <p className="text-sm text-muted-foreground">{selectedConversation.specialty}</p>
                </div>
              </header>
              <ScrollArea className="flex-1 p-6 space-y-6 bg-background/30">
                {selectedConversation.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex items-end space-x-2 max-w-[80%]",
                      msg.sender === 'user' ? "ml-auto flex-row-reverse space-x-reverse" : ""
                    )}
                  >
                    <Avatar className="h-8 w-8 border self-start">
                      {msg.sender === 'provider' && selectedConversation.avatarUrl && <AvatarImage src={selectedConversation.avatarUrl} alt={selectedConversation.providerName} data-ai-hint={selectedConversation.dataAiHint || "profile picture"} />}
                      <AvatarFallback className={cn(msg.sender === 'user' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                        {msg.sender === 'user' ? <UserCircle size={18} /> : selectedConversation.providerName.split(' ').map(n=>n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={cn(
                        "p-3 rounded-xl shadow-md",
                        msg.sender === 'user'
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-card text-card-foreground rounded-bl-none border"
                      )}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                      <p className="text-xs opacity-70 mt-1 text-right">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
              <form onSubmit={handleSendMessage} className="p-4 border-t border-border flex items-center space-x-3 bg-card">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-background focus:border-primary"
                  autoComplete="off"
                />
                <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-background/30">
              <MessageSquarePlus className="h-16 w-16 text-primary/50 mb-4" />
              <h2 className="text-xl font-semibold text-muted-foreground">Select a conversation</h2>
              <p className="text-muted-foreground">Choose a provider from the list to view messages or start a new one.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
