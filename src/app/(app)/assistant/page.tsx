
'use client';

import { useState, type FormEvent, useRef, useEffect } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { answerHealthQuestions, type AnswerHealthQuestionsOutput } from '@/ai/flows/answer-health-questions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Send, Sparkles, UserCircle, AlertTriangle, Bot } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export default function AssistantPage() {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [chatHistory]);

  const handleSubmit = async (event?: FormEvent) => {
    if (event) event.preventDefault();
    if (!question.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: question,
      timestamp: new Date(),
    };
    setChatHistory(prev => [...prev, userMessage]);
    const currentQuestion = question; // Capture question before clearing
    setQuestion(''); 
    setError(null);
    setIsLoading(true);

    try {
      const result: AnswerHealthQuestionsOutput = await answerHealthQuestions({ question: currentQuestion });
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: result.answer,
        timestamp: new Date(),
      };
      setChatHistory(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('AI Assistant error:', err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(`Failed to get answer: ${errorMessage}`);
      const errorResponseMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: `Sorry, I encountered an error processing your request for: "${currentQuestion}". Error: ${errorMessage}. Please try a different question or rephrase.`,
        timestamp: new Date(),
      };
      setChatHistory(prev => [...prev, errorResponseMessage]);
      toast({
        title: "AI Assistant Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const quickQuestions = [
    "What are common symptoms of the flu?",
    "How can I improve my sleep quality?",
    "What are some healthy lunch ideas?",
    "Tell me about the benefits of regular exercise.",
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-var(--header-height,4rem)-2rem)]">
      <PageHeader
        title="AI Health Assistant"
        description="Ask general health questions and get AI-powered answers instantly."
      />
      <Card className="flex-1 flex flex-col shadow-xl hover:shadow-2xl transition-shadow overflow-hidden border">
        <CardHeader className="bg-card">
          <CardTitle className="font-headline text-xl flex items-center">
            <Sparkles className="mr-2 text-primary" /> Chat with Your AI Assistant
          </CardTitle>
          <CardDescription>
            This assistant provides general health information. It is not a substitute for professional medical advice. For medical emergencies, please contact your doctor or local emergency services.
          </CardDescription>
        </CardHeader>
        <ScrollArea className="flex-1 p-4 md:p-6 bg-background/40" ref={scrollAreaRef}>
          <div className="space-y-6 mb-4">
            {chatHistory.map((msg) => (
              <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                {msg.sender === 'assistant' && (
                  <Avatar className="w-8 h-8 border bg-primary/10 text-primary">
                    <AvatarFallback><Bot size={18}/></AvatarFallback>
                  </Avatar>
                )}
                <div className={`max-w-[75%] p-3 rounded-xl shadow-md ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-br-none' 
                      : 'bg-card text-card-foreground rounded-bl-none border border-border'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  <p className="text-xs opacity-60 mt-1.5 text-right">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {msg.sender === 'user' && (
                  <Avatar className="w-8 h-8 border bg-muted">
                    <AvatarFallback><UserCircle size={18} className="text-muted-foreground"/></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                 <Avatar className="w-8 h-8 border bg-primary/10 text-primary">
                    <AvatarFallback><Bot size={18}/></AvatarFallback>
                  </Avatar>
                <div className="max-w-[70%] p-3 rounded-lg shadow-md bg-card text-card-foreground border border-border">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                </div>
              </div>
            )}
            {chatHistory.length === 0 && !isLoading && (
                 <div className="text-center text-muted-foreground py-12">
                    <Sparkles size={48} className="mx-auto mb-6 text-primary opacity-70" />
                    <p className="text-lg mb-6">How can I help you today?</p>
                    <p className="text-sm mb-3 font-medium">Try one of these quick questions:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {quickQuestions.map(q => (
                            <Button key={q} variant="outline" size="sm" className="bg-card hover:bg-secondary/50" onClick={() => {
                                setQuestion(q);
                                // User can then click send, or we can auto-submit by calling handleSubmit() here.
                            }}>{q}</Button>
                        ))}
                    </div>
                 </div>
            )}
          </div>
        </ScrollArea>
        {error && (
          <div className="p-4 border-t border-border">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}
        <CardFooter className="p-4 border-t border-border bg-card sticky bottom-0">
          <form onSubmit={handleSubmit} className="flex w-full items-center gap-3">
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your health question... (e.g., What are symptoms of diabetes?)"
              rows={1}
              className="flex-1 resize-none min-h-[42px] max-h-[120px] bg-background focus:border-primary"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
            <Button type="submit" disabled={isLoading || !question.trim()} size="icon">
              <Send className="h-5 w-5" />
              <span className="sr-only">Send question</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
