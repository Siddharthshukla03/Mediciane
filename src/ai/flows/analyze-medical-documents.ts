
'use server';

/**
 * @fileOverview Analyzes medical documents to provide a clear, detailed summary.
 *
 * - analyzeMedicalDocuments - A function that handles the medical document analysis process.
 * - AnalyzeMedicalDocumentsInput - The input type for the analyzeMedicalDocuments function.
 * - AnalyzeMedicalDocumentsOutput - The return type for the analyzeMedicalDocuments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeMedicalDocumentsInputSchema = z.object({
  medicalDocuments: z
    .string()
    .describe(
      "A medical document (e.g., lab report, imaging report summary, discharge summary) provided as a data URI. Must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  userDescription: z.string().describe('Brief description from the user about their current symptoms, relevant medical history, or specific questions they have concerning the document.'),
});

export type AnalyzeMedicalDocumentsInput = z.infer<
  typeof AnalyzeMedicalDocumentsInputSchema
>;

const AnalyzeMedicalDocumentsOutputSchema = z.object({
  report: z.string().describe("A comprehensive report in Markdown format, including sections for Summary, Key Points, and Questions for Your Doctor."),
});

export type AnalyzeMedicalDocumentsOutput = z.infer<
  typeof AnalyzeMedicalDocumentsOutputSchema
>;

export async function analyzeMedicalDocuments(
  input: AnalyzeMedicalDocumentsInput
): Promise<AnalyzeMedicalDocumentsOutput> {
  return analyzeMedicalDocumentsFlow(input);
}

// Rewritten with string concatenation to prevent any possible parsing errors with Turbopack.
const promptText = 'You are an expert AI medical assistant. Your role is to analyze a medical document and help a user understand it in simple terms, empowering them to have a more productive conversation with their doctor.' +
'\n\n' +
'ABSOLUTELY DO NOT PROVIDE A DIAGNOSIS OR DIRECT MEDICAL ADVICE. Your analysis is for informational purposes only.' +
'\n\n' +
'**User\'s Context/Concern:**\n' +
'{{{userDescription}}}' +
'\n\n' +
'**Medical Document to Analyze:**\n' +
'{{media url=medicalDocuments}}' +
'\n\n' +
'**Your Task: Generate a single text report formatted in Markdown.** The report must include the following sections with clear headings:' +
'\n\n' +
'### Analysis Summary\n' +
'Provide a clear, simple summary and breakdown of the document\'s key findings. Explain any complex medical terms in plain language.' +
'\n\n' +
'### Key Points\n' +
'Create a bulleted list of the most important points, values, or observations from the document.' +
'\n\n' +
'### Questions for Your Doctor\n' +
'Create a bulleted list of 2-4 specific, relevant questions the user can ask their doctor based on the document\'s content.' +
'\n\n' +
'### Disclaimer\n' +
'Include this exact disclaimer: "This is an AI-generated analysis for informational purposes only and is not a substitute for professional medical advice. Always consult with a qualified healthcare provider for any medical concerns."'


const prompt = ai.definePrompt({
  name: 'analyzeMedicalDocumentsPrompt',
  input: {schema: AnalyzeMedicalDocumentsInputSchema},
  output: {schema: AnalyzeMedicalDocumentsOutputSchema},
  model: 'googleai/gemini-pro-vision',
  prompt: promptText,
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
    ],
  },
});

const analyzeMedicalDocumentsFlow = ai.defineFlow(
  {
    name: 'analyzeMedicalDocumentsFlow',
    inputSchema: AnalyzeMedicalDocumentsInputSchema,
    outputSchema: AnalyzeMedicalDocumentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);

    if (!output || !output.report) {
      throw new Error("The AI could not generate a report for this document. This may be because the document is unreadable, its content triggered the AI's safety filters, or an internal error occurred. Please try with a different document.");
    }
    
    return output;
  }
);
