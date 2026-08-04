const { GoogleGenAI } = require("@google/genai");

const evaluateAnswer = async (question, answer) => {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const prompt = `
You are an experienced software interviewer.

Interview Question:

${question}

Candidate Answer:

${answer}

Evaluate the answer.

Return ONLY valid JSON.

{
  "score": 8,
  "strengths": [
    "...",
    "..."
  ],
  "weaknesses": [
    "...",
    "..."
  ],
  "correctAnswer": "...",
  "tips": [
    "...",
    "..."
  ]
}

Rules:

- Score must be between 1 and 10.
- Be fair.
- Give constructive feedback.
- Explain the ideal answer simply.
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
  evaluateAnswer,
};
