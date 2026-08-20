require('dotenv').config();
const { generateSyllabus } = require('./services/geminiService');

async function test() {
  try {
    const syllabus = await generateSyllabus("UPSC");
    console.log("Success! Syllabus:");
    console.log(JSON.stringify(syllabus, null, 2));
  } catch (e) {
    console.error("Failed:", e.message);
  }
}
test();
