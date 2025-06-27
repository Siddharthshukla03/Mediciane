// src/ai/flows/answer-health-questions.ts
'use server';

/**
 * @fileOverview An AI agent that answers general health questions.
 *
 * - answerHealthQuestions - A function that answers user's health questions.
 * - AnswerHealthQuestionsInput - The input type for the answerHealthQuestions function.
 * - AnswerHealthQuestionsOutput - The return type for the answerHealthQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerHealthQuestionsInputSchema = z.object({
  question: z.string().describe('The question about the user\u0027s health status.'),
});
export type AnswerHealthQuestionsInput = z.infer<typeof AnswerHealthQuestionsInputSchema>;

const AnswerHealthQuestionsOutputSchema = z.object({
  answer: z.string().describe('The answer to the user\u0027s health question.'),
});
export type AnswerHealthQuestionsOutput = z.infer<typeof AnswerHealthQuestionsOutputSchema>;

export async function answerHealthQuestions(input: AnswerHealthQuestionsInput): Promise<AnswerHealthQuestionsOutput> {
  return answerHealthQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerHealthQuestionsPrompt',
  input: {schema: AnswerHealthQuestionsInputSchema},
  output: {schema: AnswerHealthQuestionsOutputSchema},
  model: 'gemini-pro',
  prompt: `You are a virtual AI health assistant. A user will ask a question about their health, and you should answer it to the best of your ability.\n\nQuestion: {{{question}}}`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_NONE',
      },
    ],
  },
});

const answerHealthQuestionsFlow = ai.defineFlow(
  {
    name: 'answerHealthQuestionsFlow',
    inputSchema: AnswerHealthQuestionsInputSchema,
    outputSchema: AnswerHealthQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
