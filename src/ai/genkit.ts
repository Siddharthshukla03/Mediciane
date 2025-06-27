import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const plugins = [];

if (process.env.GOOGLE_API_KEY) {
  plugins.push(googleAI());
} else {
  // Add a prominent warning for developers.
  console.warn(
    `\n\n**************************************************************************************************\n` +
    `*** 🚨 WARNING: GOOGLE_API_KEY is not set in your environment.                                     ***\n` +
    `*** AI features will not work until the key is provided in the .env file.                        ***\n` +
    `**************************************************************************************************\n`
  );
}

export const ai = genkit({
  plugins,
});
