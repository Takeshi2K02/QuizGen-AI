import axios from 'axios';
import { GEMINI_API_KEY } from '../config/gemini.js';

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export async function generateQuizFromPassage(passage) {
  const prompt = `Generate a well-formatted MCQ in JSON from this passage:

${passage}

Use the following format:
{
  "question": "string",
  "options": ["string", "string", "string", "string", "string"],
  "correctIndex": number,
  "explanation": "string"
}`;

  const res = await axios.post(
    `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
    {
      contents: [{ parts: [{ text: prompt }] }],
    }
  );

  return res.data;
}