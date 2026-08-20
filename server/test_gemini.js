require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

async function test() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: 'Say hello'
    });
    console.log("Success! Text:", response.text);
  } catch (e) {
    console.error("Failed:", e.message);
  }
}
test();
