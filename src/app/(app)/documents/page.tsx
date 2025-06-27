
'use client';

import { useState, type FormEvent, useEffect, useRef } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { analyzeMedicalDocuments, type AnalyzeMedicalDocumentsOutput } from '@/ai/flows/analyze-medical-documents';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, FileText, UploadCloud, AlertTriangle, CheckCircle2, Sparkles, Eye, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

interface Document {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  url: string; 
  fileData?: string; 
  analysis?: AnalyzeMedicalDocumentsOutput | null;
}

const initialMockDocuments: Document[] = [
  { id: 'doc1_1705305600000', name: 'Blood Test Results_Jan2024.pdf', type: 'PDF', uploadedAt: '2024-01-15', url: '#' },
  { id: 'doc2_1703059200000', name: 'MRI Scan_Spine_Dec2023.jpeg', type: 'JPEG Image', uploadedAt: '2023-12-20', url: '#' },
  { id: 'doc3_1700000000000', name: 'Consultation Notes_DrShukla.docx', type: 'DOCX', uploadedAt: '2023-11-05', url: '#' },
];

export default function DocumentsPage() {
  const [userDescription, setUserDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAnalysisResult, setCurrentAnalysisResult] = useState<AnalyzeMedicalDocumentsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document[]>(initialMockDocuments);
  const [showDocumentsTable, setShowDocumentsTable] = useState(true); // Default to show
  const analysisSectionRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setError(null); 
      setCurrentAnalysisResult(null); 
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!file) {
      setError('Please select a medical document to upload.');
      toast({ title: "File Missing", description: "Please select a document for analysis.", variant: "destructive"});
      return;
    }
    if (!userDescription.trim()) {
        setError('Please provide a description of your medical history or condition.');
        toast({ title: "Description Missing", description: "Please provide a description to aid the analysis.", variant: "destructive"});
        return;
    }
    setError(null);
    setIsLoading(true);
    setCurrentAnalysisResult(null);
    
    setTimeout(() => {
        analysisSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);


    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Data = e.target?.result as string;
      try {
        const result = await analyzeMedicalDocuments({
          medicalDocuments: base64Data,
          userDescription: userDescription,
        });
        setCurrentAnalysisResult(result);

        const newDoc: Document = {
            id: `doc_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9]/g, "")}`, 
            name: file.name,
            type: file.type || 'File',
            uploadedAt: new Date().toISOString().split('T')[0],
            url: '#', 
            fileData: base64Data, 
            analysis: result,
        };
        setDocuments(prevDocs => [newDoc, ...prevDocs].sort((a,b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())); 
        setShowDocumentsTable(true); 

        toast({
          title: "Analysis Complete",
          description: "Medical document analysis finished successfully. Results below.",
          variant: "default",
          action: <CheckCircle2 className="text-green-500" />,
        });
        setFile(null);
        setUserDescription('');
        if(fileInputRef.current) fileInputRef.current.value = "";

      } catch (err) {
        console.error('Analysis error:', err);
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred during analysis.";
        setError(`Failed to analyze document: ${errorMessage}`);
        setCurrentAnalysisResult(null);
        toast({
          title: "Analysis Failed",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = (_error) => {
        console.error('File reading error:', reader.error);
        setError('Failed to read the file. Please try again.');
        setIsLoading(false);
        toast({
          title: "File Reading Error",
          description: "Could not read the selected file.",
          variant: "destructive",
        });
    };
    reader.readAsDataURL(file);
  };

  const handleViewAnalysis = (doc: Document) => {
    setCurrentAnalysisResult(doc.analysis || null);
    if (!doc.analysis) {
        toast({title: "No Analysis", description: "This document has not been analyzed or analysis data is unavailable.", variant: "default"})
    }
    setTimeout(() => { 
        analysisSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  return (
    <div>
      <PageHeader
        title="Medical Document Center"
        description="Securely manage your health records and leverage AI for insightful analysis."
      />
       <input type="file" id="document-upload-input-hidden" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.heic,.heif" />

      <div className="grid gap-8 lg:grid-cols-1">
        
        <Card className="shadow-xl hover:shadow-2xl transition-shadow">
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <CardTitle className="font-headline text-xl flex items-center">
                            <Sparkles className="mr-2 h-5 w-5 text-primary"/> AI Medical Analysis
                        </CardTitle>
                        <CardDescription>Upload a document and provide context for AI-powered insights.</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => document.getElementById('document-upload-input-hidden')?.click()} className="w-full sm:w-auto">
                        <UploadCloud className="mr-2 h-4 w-4" /> Upload Document for Analysis
                    </Button>
                </div>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6 pt-4">
                    <div>
                        <Label htmlFor="userDescription" className="block text-sm font-medium text-foreground mb-1">
                        Your Medical History / Condition Description (Required for Analysis)
                        </Label>
                        <Textarea
                        id="userDescription"
                        value={userDescription}
                        onChange={(e) => setUserDescription(e.target.value)}
                        placeholder="e.g., 35-year-old male with persistent cough for 2 weeks, relevant past conditions, and specific questions about this document."
                        rows={4}
                        required
                        className="bg-background focus:border-primary shadow-sm"
                        />
                    </div>
                    <div>
                        <Label htmlFor="medicalDocumentFile" className="block text-sm font-medium text-foreground mb-1">
                        Selected Document
                        </Label>
                        <Input
                        id="medicalDocumentFile"
                        type="text"
                        readOnly
                        value={file ? file.name : "No file selected. Click 'Upload Document' above."}
                        className="bg-muted focus:border-primary cursor-default shadow-sm"
                        onClick={() => document.getElementById('document-upload-input-hidden')?.click()}
                        />
                         {file && <p className="text-xs text-muted-foreground mt-1">Type: {file.type}, Size: {(file.size / 1024).toFixed(1)} KB</p>}
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <Button type="submit" disabled={isLoading || !file || !userDescription.trim()} className="w-full sm:w-auto min-w-[180px]">
                        {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                        <Sparkles className="mr-2 h-4 w-4" />
                        )}
                        Analyze Document
                    </Button>
                    <Button type="button" variant="secondary" onClick={() => setShowDocumentsTable(prev => !prev)} disabled={documents.length === 0}  className="w-full sm:w-auto">
                        <Eye className="mr-2 h-4 w-4" /> {showDocumentsTable ? "Hide" : "View"} Stored Documents ({documents.length})
                    </Button>
                </CardFooter>
            </form>
        </Card>

        <div ref={analysisSectionRef} className="space-y-6 pt-6">
          {error && !isLoading && ( 
            <Alert variant="destructive" className="shadow-md">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error During Analysis</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {currentAnalysisResult && !isLoading && (
            <Card className="shadow-xl bg-card border border-green-500/50">
                <CardHeader className="bg-green-500/10">
                <CardTitle className="font-headline text-xl text-green-700 flex items-center">
                    <CheckCircle2 className="mr-2" /> AI Analysis Report
                </CardTitle>
                <CardDescription className="text-green-600">
                    This AI-generated report is for informational purposes only. Always consult a qualified healthcare provider.
                </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="bg-secondary/50 rounded-lg shadow-inner p-4 text-foreground">
                    <pre className="whitespace-pre-wrap font-sans text-sm">{currentAnalysisResult.report}</pre>
                  </div>
                </CardContent>
            </Card>
          )}
           {isLoading && (
             <Card className="shadow-lg border-primary/30">
                <CardContent className="p-6 flex flex-col items-center justify-center min-h-[250px]">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-6" />
                    <p className="text-lg text-primary font-semibold">Analyzing Your Document...</p>
                    <p className="text-sm text-muted-foreground mt-1">This may take a few moments. Please wait.</p>
                </CardContent>
             </Card>
           )}
           {!isLoading && !currentAnalysisResult && !error && (
             <Card className="shadow-lg border-dashed border-2 border-border">
                <CardContent className="p-6 flex flex-col items-center justify-center min-h-[250px] text-center">
                    <Image src="https://placehold.co/300x200.png" alt="AI analysis placeholder" data-ai-hint="ai brain data" width={300} height={200} className="mb-6 rounded-lg opacity-70"/>
                    <Sparkles className="h-12 w-12 text-primary/70 mb-4" />
                    <p className="text-lg text-muted-foreground font-medium">AI Analysis Area</p>
                    <p className="text-sm text-muted-foreground mt-1">Upload a document and provide a description to get started. Analysis results will appear here.</p>
                </CardContent>
             </Card>
           )}
        </div>

      </div>

        {showDocumentsTable && (
            <Card className="mt-10 shadow-xl hover:shadow-2xl transition-shadow">
                <CardHeader>
                <CardTitle className="font-headline text-xl flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-primary"/> Stored Documents
                </CardTitle>
                <CardDescription>Access and manage your uploaded medical records. Click "AI Insights" to see previous results.</CardDescription>
                </CardHeader>
                <CardContent>
                {documents.length > 0 ? (
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Document Name</TableHead>
                            <TableHead className="hidden sm:table-cell">Type</TableHead>
                            <TableHead>Uploaded At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {documents.map((doc) => (
                            <TableRow key={doc.id} className="hover:bg-secondary/30">
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-primary/80 flex-shrink-0" />
                                <span className="truncate" title={doc.name}>{doc.name}</span>
                                </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">{doc.type}</TableCell>
                            <TableCell>{doc.uploadedAt}</TableCell>
                            <TableCell className="text-right space-x-1 sm:space-x-2">
                                {doc.fileData ? (
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={doc.fileData} target="_blank" download={doc.name}>View Doc</Link>
                                    </Button>
                                ) : (
                                    <Button variant="outline" size="sm" asChild disabled={doc.url === '#'}>
                                        <Link href={doc.url} target="_blank">View Doc</Link>
                                    </Button>
                                )}
                                {doc.analysis && (
                                     <Button variant="outline" size="sm" onClick={() => handleViewAnalysis(doc)}>AI Insights</Button>
                                )}
                                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive-foreground hover:bg-destructive/90 px-2" onClick={() => {
                                    setDocuments(docs => docs.filter(d => d.id !== doc.id));
                                    if(currentAnalysisResult && documents.find(d => d.id === doc.id)?.analysis === currentAnalysisResult) {
                                        setCurrentAnalysisResult(null);
                                    }
                                    toast({ title: "Document Deleted", description: `${doc.name} has been removed.` });
                                }}>
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
                                </Button>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="text-center py-10 text-muted-foreground">
                        <FileText size={48} className="mx-auto mb-4 text-primary opacity-50" />
                        <p className="text-lg font-medium">No Documents Stored Yet</p>
                        <p className="text-sm">Upload documents using the form above to manage them here.</p>
                    </div>
                )}
                </CardContent>
            </Card>
        )}
    </div>
  );
}
