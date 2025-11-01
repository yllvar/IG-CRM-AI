import { OpenAI } from 'openai';
import dotenv from 'dotenv';
dotenv.config();
console.log("🔑 OpenAI Key:", process.env.OPENAI_API_KEY); // REMOVE after testing

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
