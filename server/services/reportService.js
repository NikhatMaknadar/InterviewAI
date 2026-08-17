const { GoogleGenAI } = require("@google/genai");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

Rules:

- Base the report only on the interview data provided.
- Give fair and constructive feedback.
- Keep the summary suitable for a fresher.
- Focus on technical performance, communication, strengths and areas for improvement.
- Return ONLY valid JSON.
- Do not include markdown or explanations outside the JSON.
`;

  const models = [
    "gemini-3.6-flash",
    "gemini-3.5-flash-lite",
    "gemini-2.5-flash",
  ];

  for (const model of models) {
    try {
      console.log(`Trying report Gemini model: ${model}`);

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });

      const cleaned = response.text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const result = JSON.parse(cleaned);

      console.log(`Interview report generated successfully using: ${model}`);

      return result;
    } catch (error) {
      const status = error.status || error.code;

      console.error(
        `Report Gemini model ${model} failed with status: ${status}`,
      );

      // Try fallback model for temporary availability/quota errors
      if (status === 429 || status === 503 || status === 500) {
        console.log("Trying next Gemini fallback model...");
        await sleep(1000);
        continue;
      }

      // Unexpected error
      throw error;
    }
  }

  const reportError = new Error(
    "AI interview report is temporarily unavailable. Gemini models are currently unavailable or the API quota has been exceeded. Please try again later.",
  );

  reportError.status = 503;

  throw reportError;
};

module.exports = {
  generateInterviewReport,
};
