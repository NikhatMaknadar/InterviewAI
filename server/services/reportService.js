const { GoogleGenAI } = require("@google/genai");

const generateInterviewReport = async (interview) => {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const prompt = `
You are an expert technical interviewer.

Below is the complete interview data.

${JSON.stringify(interview)}

Generate ONLY valid JSON.

{
  "overallPerformance": "Excellent | Good | Average | Needs Improvement",

  "summary": "...",

  "strengths": [
    "...",
    "..."
  ],

  "weaknesses": [
    "...",
    "..."
  ],

  "roadmap": [
    "...",
    "...",
    "..."
  ],

  "recommendedResources": [
    "...",
    "...",
    "..."
  ]
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  const cleaned = response.text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
};

module.exports = {
  generateInterviewReport,
};
