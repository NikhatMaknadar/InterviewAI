const { GoogleGenAI } = require("@google/genai");

const analyzeResume = async (resumeText) => {
  try {
    // Create AI client AFTER env variables are loaded
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

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const cleanedText = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

module.exports = {
  analyzeResume,
};
