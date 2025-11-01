import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const useVertexAI = process.env.GOOGLE_GENAI_USE_VERTEXAI === 'true';

let ai;

if (useVertexAI) {
  ai = new GoogleGenAI({
    vertexai: true,
    project: process.env.GOOGLE_CLOUD_PROJECT,
    location: process.env.GOOGLE_CLOUD_LOCATION,
  });
} else {
  ai = new GoogleGenAI({
    vertexai: false,
    apiKey: process.env.GEMINI_API_KEY,
  });
}

export { ai }; // ✅ Make sure this export exists
