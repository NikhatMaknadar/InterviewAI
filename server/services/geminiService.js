const { GoogleGenAI } = require("@google/genai");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const analyzeResume = async (resumeText) => {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const prompt = `
You are an expert HR recruiter and ATS system.

Analyze the following resume.

Return ONLY valid JSON.

Format:
{
  "atsScore": number,
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "technicalQuestions": [],
  "hrQuestions": [],
  "roadmap": []
}

Resume:
${resumeText}
`;

  // Primary model + fallback models
  const models = [
    "gemini-3.6-flash",
    "gemini-3.5-flash-lite",
    "gemini-2.5-flash",
  ];

  for (const model of models) {
    try {
      console.log(`Trying Gemini model: ${model}`);

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });

      const cleanedText = response.text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const result = JSON.parse(cleanedText);

      console.log(`Gemini resume analysis successful using: ${model}`);

      return result;
    } catch (error) {
      const status = error.status || error.code;

      console.error(`Gemini model ${model} failed with status: ${status}`);

      // Try the next model for temporary availability errors
      if (status === 503 || status === 429 || status === 500) {
        console.log(`Trying fallback Gemini model...`);

        await sleep(1000);
        continue;
      }

      // Don't hide other errors
      throw error;
    }
  }

  throw new Error(
    "All Gemini models are temporarily unavailable. Please try again later.",
  );
};

module.exports = {
  analyzeResume,
};
  